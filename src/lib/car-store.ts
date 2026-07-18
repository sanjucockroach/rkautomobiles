import { useSyncExternalStore } from "react";
import { initialCars, type Car } from "@/lib/data";

const STORAGE_KEY = "rk-automobile-inventory-v1";
const listeners = new Set<() => void>();

let inventory: Car[] = initialCars.map((car) => ({
  ...car,
  published: car.published ?? true,
  stockStatus: car.stockStatus ?? "Available",
  color: car.color ?? "",
  location: car.location ?? "Delhi showroom",
  description: car.description ?? "",
}));
let hydrated = false;
let storageListenerAttached = false;

function readSavedInventory() {
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  const parsed = JSON.parse(saved) as unknown;
  return Array.isArray(parsed) && parsed.every(isCar) ? parsed : null;
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;

  try {
    const saved = readSavedInventory();
    if (saved) inventory = saved;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function persist(next: Car[]) {
  inventory = next;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emit();
}

export function subscribeToCars(listener: () => void) {
  hydrate();
  if (!storageListenerAttached && typeof window !== "undefined") {
    storageListenerAttached = true;
    window.addEventListener("storage", (event) => {
      if (event.key !== STORAGE_KEY) return;
      try {
        const saved = readSavedInventory();
        inventory = saved ?? inventory;
        emit();
      } catch {
        // Keep the last valid inventory if another tab writes malformed data.
      }
    });
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCarsSnapshot() {
  hydrate();
  return inventory;
}

export function getCarsServerSnapshot() {
  return inventory;
}

export function useCars() {
  return useSyncExternalStore(subscribeToCars, getCarsSnapshot, getCarsServerSnapshot);
}

export function saveCar(car: Car) {
  hydrate();
  const exists = inventory.some((item) => item.id === car.id);
  const next = exists
    ? inventory.map((item) => (item.id === car.id ? car : item))
    : [car, ...inventory];
  persist(next);
}

export function deleteCar(id: string) {
  hydrate();
  persist(inventory.filter((car) => car.id !== id));
}

export function replaceCars(cars: Car[]) {
  persist(cars);
}

export function resetCars() {
  persist(
    initialCars.map((car) => ({
      ...car,
      published: true,
      stockStatus: "Available",
      color: "",
      location: "Delhi showroom",
      description: "",
    })),
  );
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
    Array.isArray(car.features)
  );
}
