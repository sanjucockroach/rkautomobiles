import { useSyncExternalStore } from "react";
import { initialCars, type Car } from "@/lib/data";

const STORAGE_KEY = "rk-automobile-inventory-v1";
const listeners = new Set<() => void>();

function normalizeCar(car: Car): Car {
  const images = (car.images?.length ? car.images : [car.image])
    .filter(Boolean)
    .slice(0, 5);

  return {
    ...car,
    image: images[0] ?? car.image,
    images,
    published: car.published ?? true,
    stockStatus: car.stockStatus ?? "Available",
    color: car.color ?? "",
    location: car.location ?? "Delhi showroom",
    description: car.description ?? "",
  };
}

let inventory: Car[] = initialCars.map(normalizeCar);
let remoteLoad: Promise<void> | null = null;
let refreshListenersAttached = false;

function readLocalCache() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved) as unknown;
    return Array.isArray(parsed) && parsed.every(isCar)
      ? parsed.map(normalizeCar)
      : null;
  } catch {
    return null;
  }
}

function cache(next: Car[]) {
  inventory = next.map(normalizeCar);
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
  } catch {
    // The shared API remains the source of truth if the local cache is full.
  }
  listeners.forEach((listener) => listener());
}

async function responseError(response: Response) {
  try {
    const payload = (await response.json()) as { error?: string };
    return payload.error || "The inventory request failed.";
  } catch {
    return "The inventory request failed.";
  }
}

export async function refreshCars() {
  if (typeof window === "undefined") return;
  if (remoteLoad) return remoteLoad;

  remoteLoad = (async () => {
    try {
      const response = await fetch(`/api/inventory?t=${Date.now()}`, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      if (response.status === 204) {
        const local = readLocalCache();
        if (local) cache(local);
        return;
      }
      if (!response.ok) throw new Error(await responseError(response));
      const payload = (await response.json()) as { cars?: unknown };
      if (!Array.isArray(payload.cars) || !payload.cars.every(isCar)) {
        throw new Error("The shared inventory response is invalid.");
      }
      cache(payload.cars);
    } finally {
      remoteLoad = null;
    }
  })();

  return remoteLoad;
}

async function writeInventory(next: Car[]) {
  const normalized = next.map(normalizeCar);
  const response = await fetch("/api/inventory", {
    method: "PUT",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cars: normalized }),
  });
  if (!response.ok) throw new Error(await responseError(response));
  cache(normalized);
}

export function subscribeToCars(listener: () => void) {
  listeners.add(listener);
  void refreshCars().catch(() => {
    const local = readLocalCache();
    if (local) cache(local);
  });

  if (!refreshListenersAttached && typeof window !== "undefined") {
    refreshListenersAttached = true;
    window.addEventListener("focus", () => void refreshCars().catch(() => undefined));
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") void refreshCars().catch(() => undefined);
    });
  }

  return () => listeners.delete(listener);
}

export function getCarsSnapshot() {
  return inventory;
}

export function getCarsServerSnapshot() {
  return inventory;
}

export function useCars() {
  return useSyncExternalStore(subscribeToCars, getCarsSnapshot, getCarsServerSnapshot);
}

export async function saveCar(car: Car) {
  const normalized = normalizeCar(car);
  const exists = inventory.some((item) => item.id === normalized.id);
  const next = exists
    ? inventory.map((item) => (item.id === normalized.id ? normalized : item))
    : [normalized, ...inventory];
  await writeInventory(next);
}

export async function deleteCar(id: string) {
  await writeInventory(inventory.filter((car) => car.id !== id));
}

export async function replaceCars(cars: Car[]) {
  await writeInventory(cars);
}

export async function resetCars() {
  await writeInventory(initialCars.map(normalizeCar));
}

export function createCarId() {
  return `rk-${Date.now().toString(36)}`;
}

export function isCar(value: unknown): value is Car {
  if (!value || typeof value !== "object") return false;
  const car = value as Partial<Car>;
  return (
    typeof car.id === "string" &&
    typeof car.name === "string" &&
    typeof car.brand === "string" &&
    typeof car.model === "string" &&
    typeof car.year === "number" &&
    typeof car.price === "number" &&
    typeof car.image === "string" &&
    (car.images === undefined ||
      (Array.isArray(car.images) &&
        car.images.length <= 5 &&
        car.images.every((image) => typeof image === "string"))) &&
    Array.isArray(car.features)
  );
}
