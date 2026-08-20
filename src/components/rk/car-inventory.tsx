"use client";

import { useMemo, useState } from "react";
import { Fuel, Gauge, Settings2, Calendar, Star, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { brandInfo, type Car } from "@/lib/data";
import { useCars } from "@/lib/car-store";
import { CarDialog } from "./car-dialog";

const formatPrice = (n: number) =>
  "₹" + new Intl.NumberFormat("en-IN").format(n);

const bodyTypes = ["All", "Hatchback", "Sedan", "SUV", "Luxury", "MUV"];
const fuelTypes = ["All", "Petrol", "Diesel", "CNG", "Electric", "Hybrid"];
const budgets = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under ₹5L", min: 0, max: 500000 },
  { label: "₹5L - ₹10L", min: 500000, max: 1000000 },
  { label: "₹10L - ₹15L", min: 1000000, max: 1500000 },
  { label: "₹15L+", min: 1500000, max: Infinity },
];
const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Newest", "Lowest KM"] as const;

export function CarInventory() {
  const inventory = useCars();
  const [body, setBody] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [budget, setBudget] = useState(0);
  const [sort, setSort] = useState<typeof sortOptions[number]>("Relevance");
  const [selected, setSelected] = useState<Car | null>(null);

  const filtered = useMemo(() => {
    let list = inventory.filter((c) => {
      if (c.published === false || c.stockStatus === "Sold") return false;
      if (body !== "All" && c.bodyType !== body) return false;
      if (fuel !== "All" && c.fuel !== fuel) return false;
      const b = budgets[budget];
      if (c.price < b.min || c.price > b.max) return false;
      return true;
    });
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Lowest KM") list = [...list].sort((a, b) => a.kmDriven - b.kmDriven);
    if (sort === "Newest") list = [...list].sort((a, b) => b.year - a.year);
    return list;
  }, [inventory, body, fuel, budget, sort]);

  return (
    <section id="inventory" className="content-auto relative py-16 lg:py-24">
      <div className="absolute inset-0 section-depth opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-semibold text-brand-lime mb-3">Certified inventory, ready for India-wide delivery</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950">
              Explore <span className="text-brand-lime">Featured Cars</span>
            </h2>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Clear specifications, straightforward pricing and support from first question to final handover.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600" htmlFor="inventory-sort">Sort:</label>
            <select
              id="inventory-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sortOptions[number])}
              className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-950 focus:outline-none focus:border-brand-lime/50"
            >
              {sortOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-lg p-4 mb-8 space-y-3">
          <fieldset className="flex flex-wrap items-center gap-2">
            <legend className="text-xs font-semibold text-slate-600 mr-1">Body</legend>
            {bodyTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setBody(t)}
                aria-pressed={body === t}
                className={`min-h-10 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  body === t
                    ? "bg-brand-lime text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {t}
              </button>
            ))}
          </fieldset>
          <fieldset className="flex flex-wrap items-center gap-2">
            <legend className="text-xs font-semibold text-slate-600 mr-1">Fuel</legend>
            {fuelTypes.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFuel(t)}
                aria-pressed={fuel === t}
                className={`min-h-10 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  fuel === t
                    ? "bg-brand-lime text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {t}
              </button>
            ))}
          </fieldset>
          <fieldset className="flex flex-wrap items-center gap-2">
            <legend className="text-xs font-semibold text-slate-600 mr-1">Budget</legend>
            {budgets.map((b, i) => (
              <button
                key={b.label}
                type="button"
                onClick={() => setBudget(i)}
                aria-pressed={budget === i}
                className={`min-h-10 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  budget === i
                    ? "border border-brand-lime text-brand-lime bg-brand-lime/10"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {b.label}
              </button>
            ))}
          </fieldset>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4 text-sm text-slate-600">
          <span>
            Showing <span className="text-slate-950 font-semibold">{filtered.length}</span> cars
          </span>
        </div>

        {/* Car grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-200 rounded-lg">
            <p className="text-slate-600">No cars match your filters. Try adjusting them.</p>
            <Button
              variant="outline"
              className="mt-4 border-brand-lime text-brand-lime"
              onClick={() => {
                setBody("All");
                setFuel("All");
                setBudget(0);
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} onSelect={() => setSelected(car)} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-slate-600 mb-3">The car you have in mind may already be on its way to us.</p>
          <Button asChild size="lg" className="bg-[#25d366] hover:bg-[#1ebe57] text-black font-bold">
            <a
              href={`https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent("Hi, I'm looking for a specific car. Please help me find it.")}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4 mr-2" /> Tell us what you are looking for
            </a>
          </Button>
        </div>
      </div>

      {selected && <CarDialog car={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function CarCard({ car, onSelect }: { car: Car; onSelect: () => void }) {
  const waLink = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(
    `Hi R.K. Automobile, I'm interested in the ${car.name} (${car.year}) listed at ${formatPrice(car.price)}. Please share more details.`
  )}`;
  const discount = car.originalPrice
    ? Math.round(((car.originalPrice - car.price) / car.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white border border-slate-200 rounded-lg overflow-hidden card-hover">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        <img
          src={car.image}
          alt={car.name}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80";
          }}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {car.stockStatus === "Reserved" && (
            <Badge className="border border-white/20 bg-black/75 font-bold text-white">Reserved</Badge>
          )}
          {car.badge && (
            <Badge className="bg-[#00a8ee] text-white font-bold border-0">{car.badge}</Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-[#e83840] text-white font-bold border-0">Save {discount}%</Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-[#00a8ee] text-[#00a8ee]" />
          <span className="text-xs text-white font-semibold">{car.rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-slate-950 font-bold text-base leading-snug line-clamp-1">{car.name}</h3>
          <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{car.year}</span>
            <span>·</span>
            <span>{car.owner}</span>
            <span>·</span>
            <span>{car.rto}</span>
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-1.5 text-[11px]">
          <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-md bg-slate-50">
            <Gauge className="h-3.5 w-3.5 text-brand-lime" />
            <span className="text-slate-700">{(car.kmDriven / 1000).toFixed(1)}k km</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-md bg-slate-50">
            <Fuel className="h-3.5 w-3.5 text-brand-lime" />
            <span className="text-slate-700">{car.fuel}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-md bg-slate-50">
            <Settings2 className="h-3.5 w-3.5 text-brand-lime" />
            <span className="text-slate-700">{car.transmission === "Automatic" ? "Auto" : "Manual"}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-1 border-t border-slate-100">
          <div>
            {car.originalPrice && (
              <div className="text-xs text-slate-500 line-through">{formatPrice(car.originalPrice)}</div>
            )}
            <div className="text-xl font-black text-brand-lime">{formatPrice(car.price)}</div>
            <div className="text-[11px] text-slate-600">EMI {formatPrice(car.emi)}/mo</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            onClick={onSelect}
            aria-label={`View details for ${car.name}`}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-950 border border-slate-200"
            size="sm"
          >
            Own this car <ChevronRight className="h-3.5 w-3.5" />
          </Button>
          <Button asChild size="sm" className="bg-[#25d366] hover:bg-[#1ebe57] text-black px-2.5">
            <a href={waLink} target="_blank" rel="noreferrer" aria-label={`WhatsApp about ${car.name}`}>
              <MessageCircle className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-brand-lime/50 text-brand-lime px-2.5">
            <a href={`tel:${brandInfo.phone1}`} aria-label={`Call R.K. Automobile about ${car.name}`}>
              <Phone className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CarInventory;
