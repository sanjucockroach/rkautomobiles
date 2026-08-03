import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowLeft,
  CarFront,
  Check,
  ChevronRight,
  CircleAlert,
  Download,
  Eye,
  FileUp,
  ImagePlus,
  IndianRupee,
  LayoutDashboard,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  Menu,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/sonner";
import { type Car } from "@/lib/data";
import {
  createCarId,
  deleteCar,
  isCar,
  replaceCars,
  resetCars,
  saveCar,
  refreshCars,
  useCars,
} from "@/lib/car-store";

type View = "dashboard" | "inventory";
type CarDraft = Omit<Car, "features"> & { featuresText: string };
type DraftErrors = Partial<Record<"name" | "brand" | "model" | "year" | "price" | "image", string>>;

const currentYear = new Date().getFullYear();
const fuelOptions: Car["fuel"][] = ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const transmissionOptions: Car["transmission"][] = ["Manual", "Automatic"];
const bodyOptions: Car["bodyType"][] = ["Hatchback", "Sedan", "SUV", "Luxury", "MUV"];
const stockOptions: NonNullable<Car["stockStatus"]>[] = ["Available", "Reserved", "Sold"];

const emptyDraft = (): CarDraft => ({
  id: createCarId(),
  name: "",
  brand: "",
  model: "",
  year: currentYear,
  price: 0,
  originalPrice: undefined,
  emi: 0,
  fuel: "Petrol",
  transmission: "Manual",
  bodyType: "Hatchback",
  kmDriven: 0,
  owner: "1st Owner",
  rto: "DL",
  image: "",
  images: [],
  featured: false,
  badge: "",
  featuresText: "",
  rating: 4.5,
  inspections: 200,
  published: true,
  stockStatus: "Available",
  color: "",
  location: "Delhi showroom",
  description: "",
});

const toDraft = (car: Car): CarDraft => ({
  ...car,
  images: car.images?.length ? car.images : [car.image],
  featuresText: car.features.join(", "),
});

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

type AuthState = "checking" | "signed-out" | "signed-in";

export function AdminApp() {
  const [authState, setAuthState] = useState<AuthState>("checking");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const previousTitle = document.title;
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const previousRobots = robots?.content;
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    document.title = "Inventory Admin | R.K. Automobile";
    robots.content = "noindex, nofollow";

    return () => {
      document.title = previousTitle;
      if (robots && previousRobots !== undefined) robots.content = previousRobots;
    };
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/session", { credentials: "same-origin", cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Signed out");
        const payload = (await response.json()) as { username?: string };
        if (!active) return;
        setUsername(payload.username || "Administrator");
        await refreshCars().catch(() => undefined);
        if (active) setAuthState("signed-in");
      })
      .catch(() => active && setAuthState("signed-out"));
    return () => { active = false; };
  }, []);

  if (authState === "checking") return <AdminLoading />;
  if (authState === "signed-out") {
    return (
      <AdminLogin
        onAuthenticated={async (nextUsername) => {
          setUsername(nextUsername);
          await refreshCars().catch(() => undefined);
          setAuthState("signed-in");
        }}
      />
    );
  }

  return (
    <AdminWorkspace
      username={username}
      onLogout={async () => {
        await fetch("/api/admin/logout", { method: "POST", credentials: "same-origin" });
        setAuthState("signed-out");
        setUsername("");
      }}
    />
  );
}

function AdminWorkspace({ username, onLogout }: { username: string; onLogout: () => Promise<void> }) {
  const cars = useCars();
  const [view, setView] = useState<View>("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [editor, setEditor] = useState<CarDraft | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);
  const [query, setQuery] = useState("");
  const importRef = useRef<HTMLInputElement>(null);

  const visibleCars = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return cars;
    return cars.filter((car) =>
      [car.name, car.brand, car.model, car.rto, car.stockStatus]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [cars, query]);

  const stats = useMemo(
    () => ({
      total: cars.length,
      live: cars.filter((car) => car.published !== false && car.stockStatus !== "Sold").length,
      featured: cars.filter((car) => car.featured).length,
      value: cars
        .filter((car) => car.stockStatus !== "Sold")
        .reduce((sum, car) => sum + car.price, 0),
    }),
    [cars],
  );

  const openInventory = () => {
    setView("inventory");
    setEditor(null);
    setMobileNavOpen(false);
  };

  const exportInventory = () => {
    const file = new Blob([JSON.stringify(cars, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rk-inventory-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Inventory backup downloaded");
  };

  const importInventory = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const parsed = JSON.parse(await file.text()) as unknown;
      if (!Array.isArray(parsed) || !parsed.every(isCar)) throw new Error("Invalid inventory");
      await replaceCars(parsed);
      toast.success(`${parsed.length} cars restored from backup`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The backup could not be restored");
    }
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-[#f6f7f2]">
      <a href="#admin-main" className="skip-link">Skip to admin content</a>
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/8 bg-[#0d0f13] lg:flex lg:flex-col">
          <AdminBrand />
          <AdminNav view={view} onDashboard={() => setView("dashboard")} onInventory={openInventory} />
          <div className="mt-auto border-t border-white/8 p-4">
            <a
              href="/"
              className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/6 hover:text-white"
            >
              <Eye className="size-4" />
              View public website
            </a>
            <p className="mt-3 px-3 text-xs leading-5 text-gray-500">Signed in as {username}. Changes sync to the live website.</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/8 bg-[#08090c]/95 px-4 backdrop-blur-lg sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation"
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen((open) => !open)}
              >
                {mobileNavOpen ? <X /> : <Menu />}
              </Button>
              <div>
                <p className="text-sm font-bold">{editor ? (editor.name || "New car") : view === "dashboard" ? "Overview" : "Inventory"}</p>
                <p className="hidden text-xs text-gray-500 sm:block">R.K. Automobile operations</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" className="hidden border-white/12 bg-transparent text-gray-200 hover:bg-white/6 hover:text-white sm:inline-flex">
                <a href="/" target="_blank" rel="noreferrer"><Eye /> Preview site</a>
              </Button>
              <Button type="button" variant="ghost" size="icon" onClick={() => void onLogout()} aria-label="Sign out" title="Sign out">
                <LogOut />
              </Button>
              <Button onClick={() => { setView("inventory"); setEditor(emptyDraft()); }}>
                <Plus /> <span className="hidden sm:inline">Add car</span>
              </Button>
            </div>
          </header>

          {mobileNavOpen && (
            <div className="fixed inset-x-0 top-16 z-40 border-b border-white/10 bg-[#0d0f13] p-4 lg:hidden">
              <AdminNav
                view={view}
                onDashboard={() => { setView("dashboard"); setEditor(null); setMobileNavOpen(false); }}
                onInventory={openInventory}
              />
            </div>
          )}

          <main id="admin-main" className="p-4 sm:p-6 lg:p-8">
            {editor ? (
              <CarEditor
                draft={editor}
                onCancel={() => setEditor(null)}
                onSaved={() => {
                  setEditor(null);
                  setView("inventory");
                }}
              />
            ) : view === "dashboard" ? (
              <Dashboard
                cars={cars}
                stats={stats}
                onOpenInventory={openInventory}
                onAdd={() => { setView("inventory"); setEditor(emptyDraft()); }}
                onEdit={(car) => { setView("inventory"); setEditor(toDraft(car)); }}
              />
            ) : (
              <InventoryManager
                cars={visibleCars}
                total={cars.length}
                query={query}
                onQuery={setQuery}
                onAdd={() => setEditor(emptyDraft())}
                onEdit={(car) => setEditor(toDraft(car))}
                onDelete={setDeleteTarget}
                onExport={exportInventory}
                onImport={() => importRef.current?.click()}
                onReset={async () => {
                  try {
                    await resetCars();
                    toast.success("Sample inventory restored");
                  } catch (error) {
                    toast.error(error instanceof Error ? error.message : "Inventory could not be restored");
                  }
                }}
              />
            )}
          </main>
        </div>
      </div>

      <input ref={importRef} type="file" accept="application/json,.json" className="sr-only" onChange={importInventory} />

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent className="border-white/12 bg-[#111318]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes the car from the shared live inventory for every visitor. Export a backup first if you may need it later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep car</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-500"
              onClick={async () => {
                try {
                  if (deleteTarget) await deleteCar(deleteTarget.id);
                  setDeleteTarget(null);
                  toast.success("Car deleted from the live inventory");
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "The car could not be deleted");
                }
              }}
            >
              Delete car
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster richColors position="top-right" />
    </div>
  );
}

function AdminBrand() {
  return (
    <div className="flex h-20 items-center gap-3 border-b border-white/8 px-5">
      <img src="/rk-logo-transparent.png" alt="R.K. Automobile" className="size-12 object-contain" />
      <div>
        <p className="text-sm font-black leading-tight">R.K. AUTOMOBILE</p>
        <p className="text-xs text-gray-500">Inventory admin</p>
      </div>
    </div>
  );
}

function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08090c] text-[#f6f7f2]">
      <div className="text-center">
        <LoaderCircle className="mx-auto size-6 animate-spin text-brand-lime" />
        <p className="mt-4 text-sm font-semibold text-gray-300">Checking secure access</p>
      </div>
    </div>
  );
}

function AdminLogin({ onAuthenticated }: { onAuthenticated: (username: string) => Promise<void> }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const payload = (await response.json()) as { username?: string; error?: string };
      if (!response.ok) throw new Error(payload.error || "Sign in failed.");
      await onAuthenticated(payload.username || username.trim());
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Sign in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08090c] px-4 py-10 text-[#f6f7f2]">
      <section className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-3">
          <img src="/rk-logo-transparent.png" alt="R.K. Automobile" className="size-20 object-contain" />
          <div>
            <p className="text-lg font-black leading-tight">R.K. Automobiles</p>
            <p className="mt-1 text-xs text-gray-500">Secure inventory access</p>
          </div>
        </div>

        <form onSubmit={submit} className="rounded-xl border border-white/10 bg-[#0d0f13] p-6" noValidate>
          <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-brand-lime/10 text-brand-lime">
            <LockKeyhole className="size-5" />
          </div>
          <h1 className="text-xl font-black">Admin sign in</h1>
          <p className="mt-2 text-sm leading-6 text-gray-400">Use the private credentials configured for the inventory administrator.</p>

          <label className="mt-6 block text-sm font-semibold text-gray-200" htmlFor="admin-username">
            Username
            <input
              id="admin-username"
              name="username"
              autoComplete="username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={`${controlClass} mt-2`}
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-gray-200" htmlFor="admin-password">
            Password
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={`${controlClass} mt-2`}
            />
          </label>

          {error && (
            <div role="alert" className="mt-4 rounded-lg border border-red-400/25 bg-red-500/8 px-3 py-2.5 text-sm font-semibold text-red-200">
              {error}
            </div>
          )}

          <Button type="submit" disabled={submitting || !username.trim() || !password} className="mt-6 h-11 w-full font-bold">
            {submitting ? <LoaderCircle className="animate-spin" /> : <LockKeyhole />}
            {submitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <a href="/" className="mx-auto mt-5 flex w-fit min-h-11 items-center text-sm font-semibold text-gray-500 transition-colors hover:text-white">
          <ArrowLeft className="mr-2 size-4" /> Return to website
        </a>
      </section>
      <Toaster richColors position="top-right" />
    </main>
  );
}

function AdminNav({
  view,
  onDashboard,
  onInventory,
}: {
  view: View;
  onDashboard: () => void;
  onInventory: () => void;
}) {
  const itemClass = (active: boolean) =>
    `flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-semibold transition-colors ${
      active ? "bg-brand-lime text-black" : "text-gray-400 hover:bg-white/6 hover:text-white"
    }`;

  return (
    <nav aria-label="Admin navigation" className="space-y-1 p-2 lg:p-4">
      <button type="button" className={itemClass(view === "dashboard")} onClick={onDashboard}>
        <LayoutDashboard className="size-4" /> Overview
      </button>
      <button type="button" className={itemClass(view === "inventory")} onClick={onInventory}>
        <CarFront className="size-4" /> Inventory
      </button>
    </nav>
  );
}

function Dashboard({
  cars,
  stats,
  onOpenInventory,
  onAdd,
  onEdit,
}: {
  cars: Car[];
  stats: { total: number; live: number; featured: number; value: number };
  onOpenInventory: () => void;
  onAdd: () => void;
  onEdit: (car: Car) => void;
}) {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="flex flex-col justify-between gap-5 border-b border-white/8 pb-7 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-black sm:text-3xl">Your showroom at a glance</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
            Keep listings accurate, publish ready cars, and move sold stock out of the public inventory.
          </p>
        </div>
        <Button onClick={onAdd}><Plus /> Add a car</Button>
      </section>

      <section aria-label="Inventory summary" className="grid gap-px overflow-hidden rounded-xl border border-white/8 bg-white/8 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon={CarFront} label="All cars" value={stats.total.toString()} />
        <Metric icon={Eye} label="Live on site" value={stats.live.toString()} />
        <Metric icon={Star} label="Featured" value={stats.featured.toString()} />
        <Metric icon={IndianRupee} label="Available value" value={formatPrice(stats.value)} compact />
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Recently added</h2>
            <p className="mt-1 text-sm text-gray-500">Your latest inventory records</p>
          </div>
          <Button variant="ghost" onClick={onOpenInventory} className="text-brand-lime hover:bg-brand-lime/10 hover:text-brand-lime">
            Manage all <ChevronRight />
          </Button>
        </div>
        {cars.length ? (
          <div className="overflow-hidden rounded-xl border border-white/8">
            {cars.slice(0, 5).map((car, index) => (
              <button
                key={car.id}
                type="button"
                onClick={() => onEdit(car)}
                className={`flex w-full items-center gap-4 bg-[#0d0f13] p-3 text-left transition-colors hover:bg-[#14171d] ${
                  index ? "border-t border-white/8" : ""
                }`}
              >
                <img src={car.image} alt="" className="h-14 w-20 rounded-md bg-black object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{car.name}</p>
                  <p className="mt-1 text-xs text-gray-500">{car.year} · {car.fuel} · {car.kmDriven.toLocaleString("en-IN")} km</p>
                </div>
                <p className="hidden text-sm font-bold sm:block">{formatPrice(car.price)}</p>
                <StatusBadge car={car} />
                <ChevronRight className="size-4 text-gray-600" />
              </button>
            ))}
          </div>
        ) : (
          <EmptyInventory onAdd={onAdd} />
        )}
      </section>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  compact = false,
}: {
  icon: typeof CarFront;
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div className="bg-[#0d0f13] p-5">
      <div className="mb-5 flex size-9 items-center justify-center rounded-lg bg-brand-lime/10 text-brand-lime">
        <Icon className="size-4" />
      </div>
      <p className={`${compact ? "text-xl" : "text-3xl"} font-black`}>{value}</p>
      <p className="mt-1 text-xs font-semibold text-gray-500">{label}</p>
    </div>
  );
}

function InventoryManager({
  cars,
  total,
  query,
  onQuery,
  onAdd,
  onEdit,
  onDelete,
  onExport,
  onImport,
  onReset,
}: {
  cars: Car[];
  total: number;
  query: string;
  onQuery: (value: string) => void;
  onAdd: () => void;
  onEdit: (car: Car) => void;
  onDelete: (car: Car) => void;
  onExport: () => void;
  onImport: () => void;
  onReset: () => void;
}) {
  return (
    <div className="mx-auto max-w-7xl">
      <section className="flex flex-col justify-between gap-5 border-b border-white/8 pb-7 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-black sm:text-3xl">Inventory</h1>
          <p className="mt-2 text-sm text-gray-400">{total} car{total === 1 ? "" : "s"} in the shared live inventory</p>
        </div>
        <Button onClick={onAdd}><Plus /> Add car</Button>
      </section>

      <div className="my-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <label className="relative block w-full max-w-md">
          <span className="sr-only">Search inventory</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Search car, brand, model or status"
            className="h-11 w-full rounded-lg border border-white/10 bg-[#0d0f13] pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-brand-lime"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onImport} className="border-white/12 bg-transparent hover:bg-white/6 hover:text-white"><FileUp /> Restore</Button>
          <Button variant="outline" onClick={onExport} disabled={!total} className="border-white/12 bg-transparent hover:bg-white/6 hover:text-white"><Download /> Backup</Button>
          {!total && (
            <Button variant="ghost" onClick={onReset} className="text-gray-400 hover:bg-white/6 hover:text-white">
              <RotateCcw /> Restore sample cars
            </Button>
          )}
        </div>
      </div>

      {cars.length ? (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-white/8 lg:block">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[#111318] text-xs font-semibold text-gray-500">
                <tr>
                  <th className="px-4 py-3">Car</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id} className="border-t border-white/8 bg-[#0d0f13] transition-colors hover:bg-[#12151a]">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={car.image} alt="" className="h-14 w-20 rounded-md bg-black object-cover" />
                        <div className="min-w-0">
                          <p className="max-w-60 truncate text-sm font-bold">{car.name}</p>
                          <p className="mt-1 text-xs text-gray-500">{car.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">
                      <p>{car.year} · {car.fuel} · {car.transmission}</p>
                      <p className="mt-1 text-xs text-gray-500">{car.kmDriven.toLocaleString("en-IN")} km · {car.owner}</p>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold">{formatPrice(car.price)}</td>
                    <td className="px-4 py-3"><StatusBadge car={car} /></td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Button type="button" variant="ghost" size="icon" onClick={() => onEdit(car)} aria-label={`Edit ${car.name}`}><Pencil /></Button>
                        <Button type="button" variant="ghost" size="icon" onClick={() => onDelete(car)} aria-label={`Delete ${car.name}`} className="text-gray-500 hover:bg-white/6 hover:text-red-300"><Trash2 /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 lg:hidden">
            {cars.map((car) => (
              <article key={car.id} className="rounded-xl border border-white/8 bg-[#0d0f13] p-3">
                <div className="flex gap-3">
                  <img src={car.image} alt="" className="h-20 w-28 rounded-lg bg-black object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold">{car.name}</p>
                    <p className="mt-1 text-xs text-gray-500">{car.year} · {car.fuel} · {car.kmDriven.toLocaleString("en-IN")} km</p>
                    <p className="mt-2 text-sm font-black">{formatPrice(car.price)}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-white/8 pt-3">
                  <StatusBadge car={car} />
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(car)}><Pencil /> Edit</Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(car)} aria-label={`Delete ${car.name}`} className="text-gray-500 hover:text-red-400"><Trash2 /></Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : query ? (
        <div className="rounded-xl border border-dashed border-white/12 py-16 text-center">
          <Search className="mx-auto size-6 text-gray-600" />
          <h2 className="mt-4 font-bold">No matching cars</h2>
          <p className="mt-1 text-sm text-gray-500">Try a different name, brand, model, or status.</p>
          <Button variant="outline" className="mt-5 border-white/12 bg-transparent" onClick={() => onQuery("")}>Clear search</Button>
        </div>
      ) : (
        <EmptyInventory onAdd={onAdd} />
      )}
    </div>
  );
}

function EmptyInventory({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-white/12 py-16 text-center">
      <CarFront className="mx-auto size-7 text-brand-lime" />
      <h2 className="mt-4 font-bold">Add your first car</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
        Enter its details and upload a photo. You can keep it unpublished until the listing is ready.
      </p>
      <Button className="mt-5" onClick={onAdd}><Plus /> Add car</Button>
    </div>
  );
}

function StatusBadge({ car }: { car: Car }) {
  if (car.published === false) {
    return <span className="inline-flex rounded-full bg-white/7 px-2.5 py-1 text-xs font-bold text-gray-400">Draft</span>;
  }
  if (car.stockStatus === "Sold") {
    return <span className="inline-flex rounded-full bg-red-500/12 px-2.5 py-1 text-xs font-bold text-red-300">Sold</span>;
  }
  if (car.stockStatus === "Reserved") {
    return <span className="inline-flex rounded-full bg-amber-500/12 px-2.5 py-1 text-xs font-bold text-amber-300">Reserved</span>;
  }
  return <span className="inline-flex rounded-full bg-brand-lime/12 px-2.5 py-1 text-xs font-bold text-brand-lime">Live</span>;
}

function CarEditor({
  draft: initialDraft,
  onCancel,
  onSaved,
}: {
  draft: CarDraft;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [draft, setDraft] = useState(initialDraft);
  const [errors, setErrors] = useState<DraftErrors>({});
  const [processingImage, setProcessingImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const photos = draft.images?.length
    ? draft.images
    : draft.image
      ? [draft.image]
      : [];

  const update = <K extends keyof CarDraft>(key: K, value: CarDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    if (key in errors) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const setPhotos = (images: string[]) => {
    const next = images.filter(Boolean).slice(0, 5);
    setDraft((current) => ({
      ...current,
      image: next[0] ?? "",
      images: next,
    }));
    if (errors.image) setErrors((current) => ({ ...current, image: undefined }));
  };

  const makePrimary = (index: number) => {
    if (index === 0) return;
    const next = [...photos];
    const [selected] = next.splice(index, 1);
    next.unshift(selected);
    setPhotos(next);
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, photoIndex) => photoIndex !== index));
  };

  const validate = () => {
    const next: DraftErrors = {};
    if (!draft.name.trim()) next.name = "Enter the full listing name.";
    if (!draft.brand.trim()) next.brand = "Enter the manufacturer.";
    if (!draft.model.trim()) next.model = "Enter the model.";
    if (draft.year < 1980 || draft.year > currentYear + 1) next.year = `Use a year between 1980 and ${currentYear + 1}.`;
    if (draft.price <= 0) next.price = "Enter the selling price.";
    if (!draft.image) next.image = "Add at least one car photo.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) {
      toast.error("Please check the highlighted fields");
      return;
    }

    const { featuresText, ...carDetails } = draft;
    const car: Car = {
      ...carDetails,
      name: draft.name.trim(),
      brand: draft.brand.trim(),
      model: draft.model.trim(),
      owner: draft.owner.trim(),
      rto: draft.rto.trim().toUpperCase(),
      badge: draft.badge?.trim(),
      color: draft.color?.trim(),
      location: draft.location?.trim(),
      description: draft.description?.trim(),
      features: featuresText
        .split(",")
        .map((feature) => feature.trim())
        .filter(Boolean),
    };
    try {
      await saveCar(car);
      toast.success("Car details published to the shared inventory");
      onSaved();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Car details could not be saved");
    }
  };

  const uploadImages = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (!selectedFiles.length) return;

    const remainingSlots = 5 - photos.length;
    if (remainingSlots <= 0) {
      toast.error("A listing can have up to 5 photos");
      return;
    }

    const files = selectedFiles.slice(0, remainingSlots);
    if (selectedFiles.length > remainingSlots) {
      toast.info(`Only ${remainingSlots} more photo${remainingSlots === 1 ? "" : "s"} can be added`);
    }
    if (files.some((file) => !file.type.startsWith("image/"))) {
      toast.error("Choose a JPG, PNG, or WebP image");
      return;
    }
    if (files.some((file) => file.size > 8 * 1024 * 1024)) {
      toast.error("Each image must be smaller than 8 MB");
      return;
    }

    setProcessingImage(true);
    try {
      const compressed = await Promise.all(files.map(compressImage));
      const uploaded = await Promise.all(
        compressed.map((blob, index) => uploadCarPhoto(blob, files[index].name)),
      );
      setPhotos([...photos, ...uploaded]);
      toast.success(`${uploaded.length} photo${uploaded.length === 1 ? "" : "s"} uploaded`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We could not upload one or more images");
    } finally {
      setProcessingImage(false);
    }
  };

  const addImageUrl = () => {
    if (photos.length >= 5) {
      toast.error("A listing can have up to 5 photos");
      return;
    }

    try {
      const url = new URL(imageUrl.trim());
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("Invalid protocol");
      setPhotos([...photos, url.toString()]);
      setImageUrl("");
    } catch {
      toast.error("Enter a complete http or https image URL");
    }
  };

  return (
    <form onSubmit={submit} noValidate className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col justify-between gap-4 border-b border-white/8 pb-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Button type="button" variant="ghost" size="icon" onClick={onCancel} aria-label="Back to inventory"><ArrowLeft /></Button>
          <div>
            <h1 className="text-xl font-black sm:text-2xl">{initialDraft.name ? "Edit car" : "Add a new car"}</h1>
            <p className="mt-1 text-xs text-gray-500">Required fields are marked with *</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 border-white/12 bg-transparent hover:bg-white/6 hover:text-white sm:flex-none">Cancel</Button>
          <Button type="submit" className="flex-1 sm:flex-none"><Check /> Save car</Button>
        </div>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <FormSection title="Listing details" description="What customers see first in the inventory.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Listing name" required error={errors.name} className="sm:col-span-2">
                <TextInput value={draft.name} onChange={(value) => update("name", value)} placeholder="Hyundai Verna SX (O)" invalid={Boolean(errors.name)} />
              </Field>
              <Field label="Brand" required error={errors.brand}>
                <TextInput value={draft.brand} onChange={(value) => update("brand", value)} placeholder="Hyundai" invalid={Boolean(errors.brand)} />
              </Field>
              <Field label="Model" required error={errors.model}>
                <TextInput value={draft.model} onChange={(value) => update("model", value)} placeholder="Verna" invalid={Boolean(errors.model)} />
              </Field>
              <Field label="Year" required error={errors.year}>
                <NumberInput value={draft.year} onChange={(value) => update("year", value)} min={1980} max={currentYear + 1} invalid={Boolean(errors.year)} />
              </Field>
              <Field label="Body type">
                <NativeSelect value={draft.bodyType} options={bodyOptions} onChange={(value) => update("bodyType", value as Car["bodyType"])} />
              </Field>
              <Field label="Description" hint="Optional customer-facing summary" className="sm:col-span-2">
                <textarea
                  value={draft.description}
                  onChange={(event) => update("description", event.target.value)}
                  rows={4}
                  maxLength={500}
                  placeholder="A clean, carefully inspected sedan with complete service history..."
                  className={controlClass}
                />
              </Field>
            </div>
          </FormSection>

          <FormSection title="Price and availability" description="Control pricing, badges, and website visibility.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Selling price" required error={errors.price}>
                <NumberInput value={draft.price} onChange={(value) => update("price", value)} min={0} prefix="₹" invalid={Boolean(errors.price)} />
              </Field>
              <Field label="Original price" hint="Optional">
                <NumberInput value={draft.originalPrice ?? 0} onChange={(value) => update("originalPrice", value || undefined)} min={0} prefix="₹" />
              </Field>
              <Field label="Monthly EMI">
                <NumberInput value={draft.emi} onChange={(value) => update("emi", value)} min={0} prefix="₹" />
              </Field>
              <Field label="Badge" hint="Optional short label">
                <TextInput value={draft.badge ?? ""} onChange={(value) => update("badge", value)} placeholder="Hot Deal" />
              </Field>
              <Field label="Stock status">
                <NativeSelect value={draft.stockStatus ?? "Available"} options={stockOptions} onChange={(value) => update("stockStatus", value as Car["stockStatus"])} />
              </Field>
              <div className="space-y-3">
                <ToggleRow label="Visible on website" checked={draft.published !== false} onChange={(checked) => update("published", checked)} />
                <ToggleRow label="Featured car" checked={Boolean(draft.featured)} onChange={(checked) => update("featured", checked)} />
              </div>
            </div>
          </FormSection>

          <FormSection title="Vehicle specifications" description="Add the details customers compare before contacting you.">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Field label="Fuel">
                <NativeSelect value={draft.fuel} options={fuelOptions} onChange={(value) => update("fuel", value as Car["fuel"])} />
              </Field>
              <Field label="Transmission">
                <NativeSelect value={draft.transmission} options={transmissionOptions} onChange={(value) => update("transmission", value as Car["transmission"])} />
              </Field>
              <Field label="Kilometres driven">
                <NumberInput value={draft.kmDriven} onChange={(value) => update("kmDriven", value)} min={0} suffix="km" />
              </Field>
              <Field label="Ownership">
                <TextInput value={draft.owner} onChange={(value) => update("owner", value)} placeholder="1st Owner" />
              </Field>
              <Field label="RTO">
                <TextInput value={draft.rto} onChange={(value) => update("rto", value)} placeholder="DL" />
              </Field>
              <Field label="Colour">
                <TextInput value={draft.color ?? ""} onChange={(value) => update("color", value)} placeholder="Pearl White" />
              </Field>
              <Field label="Location">
                <TextInput value={draft.location ?? ""} onChange={(value) => update("location", value)} placeholder="Delhi showroom" />
              </Field>
              <Field label="Inspection points">
                <NumberInput value={draft.inspections} onChange={(value) => update("inspections", value)} min={0} />
              </Field>
              <Field label="Condition rating">
                <NumberInput value={draft.rating} onChange={(value) => update("rating", value)} min={0} max={5} step={0.1} suffix="/ 5" />
              </Field>
              <Field label="Features" hint="Separate each feature with a comma" className="sm:col-span-2 lg:col-span-3">
                <textarea
                  value={draft.featuresText}
                  onChange={(event) => update("featuresText", event.target.value)}
                  rows={3}
                  placeholder="Sunroof, Reverse camera, Cruise control, 6 airbags"
                  className={controlClass}
                />
              </Field>
            </div>
          </FormSection>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24">
          <section className="rounded-xl border border-white/8 bg-[#0d0f13] p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold">Car photos *</h2>
                <p className="mt-1 text-xs text-gray-500">Up to 5 photos · first photo is primary</p>
              </div>
              <span className="text-xs font-bold text-brand-lime">{photos.length}/5</span>
            </div>

            {photos.length > 0 && (
              <div className="space-y-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black">
                  <img src={photos[0]} alt="Primary car listing preview" className="h-full w-full object-cover" />
                  <span className="absolute left-2 top-2 rounded-full bg-brand-lime px-2 py-1 text-[11px] font-black text-black">
                    Primary
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <div key={`${photo}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-black">
                      <button
                        type="button"
                        onClick={() => makePrimary(index)}
                        aria-label={index === 0 ? "Primary photo" : `Make photo ${index + 1} primary`}
                        className={`block h-full w-full outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-brand-lime ${
                          index === 0 ? "opacity-100" : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img src={photo} alt="" className="h-full w-full object-cover" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        aria-label={`Remove photo ${index + 1}`}
                        className="absolute right-1 top-1 flex size-7 items-center justify-center rounded-full bg-black/80 text-white transition-colors hover:bg-red-600 focus-visible:ring-2 focus-visible:ring-brand-lime"
                      >
                        <X className="size-3.5" />
                      </button>
                      <span className="pointer-events-none absolute bottom-1 left-1 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-white">
                        {index === 0 ? "Primary" : index + 1}
                      </span>
                    </div>
                  ))}
                </div>
                {photos.length > 1 && (
                  <p className="text-xs leading-5 text-gray-500">
                    Select any thumbnail to make it the primary website photo.
                  </p>
                )}
              </div>
            )}

            {photos.length < 5 && (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={processingImage}
                className={`mt-3 flex min-h-28 w-full flex-col items-center justify-center rounded-lg border border-dashed bg-black/30 text-center transition-colors ${
                  errors.image ? "border-red-400 text-red-300" : "border-white/15 text-gray-400 hover:border-brand-lime hover:text-brand-lime"
                }`}
              >
                <ImagePlus className="size-5" />
                <span className="mt-2 text-sm font-bold">{processingImage ? "Preparing photos..." : "Add photos"}</span>
                <span className="mt-1 text-xs text-gray-600">JPG, PNG or WebP · 8 MB each</span>
              </button>
            )}
            {errors.image && <p role="alert" className="mt-2 text-xs font-semibold text-red-300">{errors.image}</p>}
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={uploadImages}
            />
            {photos.length < 5 && (
              <div className="mt-4">
                <label htmlFor="car-image-url" className="text-xs font-semibold text-gray-400">Or add an image URL</label>
                <div className="mt-2 flex gap-2">
                  <input
                    id="car-image-url"
                    type="url"
                    value={imageUrl}
                    onChange={(event) => setImageUrl(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addImageUrl();
                      }
                    }}
                    placeholder="https://..."
                    className={controlClass}
                  />
                  <Button type="button" variant="outline" size="icon" onClick={addImageUrl} aria-label="Add image URL" className="size-11 shrink-0 border-white/12 bg-transparent">
                    <Plus />
                  </Button>
                </div>
              </div>
            )}
          </section>

          <div className="flex gap-3 rounded-xl border border-brand-lime/20 bg-brand-lime/6 p-4">
            <CircleAlert className="mt-0.5 size-4 shrink-0 text-brand-lime" />
            <p className="text-xs leading-5 text-gray-300">
              Saving updates the shared live inventory. Uploaded photos are stored permanently in Vercel Blob.
            </p>
          </div>
        </aside>
      </div>
    </form>
  );
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/8 bg-[#0d0f13]">
      <div className="border-b border-white/8 px-5 py-4">
        <h2 className="text-sm font-bold">{title}</h2>
        <p className="mt-1 text-xs text-gray-500">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  required,
  hint,
  error,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 flex items-center gap-1 text-xs font-semibold text-gray-300">
        {label} {required && <span className="text-brand-lime">*</span>}
        {hint && <span className="ml-auto font-normal text-gray-600">{hint}</span>}
      </span>
      {children}
      {error && <span role="alert" className="mt-1.5 block text-xs font-semibold text-red-300">{error}</span>}
    </label>
  );
}

const controlClass =
  "min-h-11 w-full rounded-lg border border-white/10 bg-[#08090c] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/15 disabled:cursor-not-allowed disabled:opacity-50";

function TextInput({
  value,
  onChange,
  placeholder,
  invalid,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-invalid={invalid}
      className={`${controlClass} ${invalid ? "border-red-400" : ""}`}
    />
  );
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  invalid,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  invalid?: boolean;
}) {
  return (
    <div className="relative">
      {prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">{prefix}</span>}
      <input
        type="number"
        value={value || ""}
        onChange={(event) => onChange(Number(event.target.value))}
        min={min}
        max={max}
        step={step}
        aria-invalid={invalid}
        className={`${controlClass} ${prefix ? "pl-7" : ""} ${suffix ? "pr-12" : ""} ${invalid ? "border-red-400" : ""}`}
      />
      {suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{suffix}</span>}
    </div>
  );
}

function NativeSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className={controlClass}>
      {options.map((option) => <option key={option}>{option}</option>)}
    </select>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-lg border border-white/8 bg-[#08090c] px-3">
      <span className="text-xs font-semibold text-gray-300">{label}</span>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="peer sr-only" />
      <span className="relative h-6 w-11 rounded-full bg-white/12 transition-colors peer-checked:bg-brand-lime peer-focus-visible:ring-2 peer-focus-visible:ring-brand-lime peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#08090c]">
        <span className={`absolute left-1 top-1 size-4 rounded-full transition-transform ${checked ? "translate-x-5 bg-black" : "bg-white"}`} />
      </span>
    </label>
  );
}

async function compressImage(file: File): Promise<Blob> {
  const source = await createImageBitmap(file);
  const maxWidth = 1200;
  const scale = Math.min(1, maxWidth / source.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(source.width * scale);
  canvas.height = Math.round(source.height * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  source.close();
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error("Image compression failed.")),
      "image/jpeg",
      0.76,
    );
  });
}

async function uploadCarPhoto(blob: Blob, originalName: string) {
  const basename = originalName.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "-") || "car-photo";
  const response = await fetch(`/api/admin/upload?filename=${encodeURIComponent(`${basename}.jpg`)}`, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "image/jpeg" },
    body: blob,
  });
  const payload = (await response.json()) as { url?: string; error?: string };
  if (!response.ok || !payload.url) throw new Error(payload.error || "Photo upload failed.");
  return payload.url;
}

export default AdminApp;
