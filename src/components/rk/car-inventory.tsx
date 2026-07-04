"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Fuel, Gauge, Settings2, Calendar, Users, Star, BadgeCheck, ChevronRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cars, brandInfo, type Car } from "@/lib/data";
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
  const [body, setBody] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [budget, setBudget] = useState(0);
  const [sort, setSort] = useState<typeof sortOptions[number]>("Relevance");
  const [selected, setSelected] = useState<Car | null>(null);

  const filtered = useMemo(() => {
    let list = cars.filter((c) => {
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
  }, [body, fuel, budget, sort]);

  return (
    <section id="inventory" className="relative py-16 lg:py-24">
      <div className="absolute inset-0 bg-grid-cyan opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4ff00]/30 bg-[#d4ff00]/5 text-xs font-medium text-brand-lime mb-3">
              <BadgeCheck className="h-3.5 w-3.5" /> Certified Inventory
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Explore <span className="gradient-text-lime-cyan">Featured Cars</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-2xl">
              Every car passes a 200+ point inspection. Transparent pricing, genuine deals, and best prices — guaranteed.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-400">Sort:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sortOptions[number])}
              className="bg-[#14181f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-lime/50"
            >
              {sortOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-[#0d0f14]/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 mb-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-gray-500 mr-1">Body:</span>
            {bodyTypes.map((t) => (
              <button
                key={t}
                onClick={() => setBody(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  body === t
                    ? "bg-brand-lime text-black glow-lime"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-gray-500 mr-1">Fuel:</span>
            {fuelTypes.map((t) => (
              <button
                key={t}
                onClick={() => setFuel(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  fuel === t
                    ? "bg-brand-cyan text-black"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-gray-500 mr-1">Budget:</span>
            {budgets.map((b, i) => (
              <button
                key={b.label}
                onClick={() => setBudget(i)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  budget === i
                    ? "border border-brand-red text-brand-red bg-brand-red/10"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <span>
            Showing <span className="text-white font-semibold">{filtered.length}</span> cars
          </span>
        </div>

        {/* Car grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <p className="text-gray-400">No cars match your filters. Try adjusting them.</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} onSelect={() => setSelected(car)} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 mb-3">Can&apos;t find what you&apos;re looking for? We have 200+ cars in stock.</p>
          <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#1ebe57] text-black font-bold">
            <a
              href={`https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent("Hi, I'm looking for a specific car. Please help me find it.")}`}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="h-4 w-4 mr-2" /> View Full Inventory on WhatsApp
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
    <div className="group relative bg-[#0d0f14] border border-white/10 rounded-2xl overflow-hidden card-hover">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0c10]">
        <img
          src={car.image}
          alt={car.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent" />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {car.badge && (
            <Badge className="bg-[#d4ff00] text-black font-bold border-0">{car.badge}</Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-[#ff3b30] text-white font-bold border-0">-{discount}%</Badge>
          )}
        </div>
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 fill-[#d4ff00] text-[#d4ff00]" />
          <span className="text-xs text-white font-semibold">{car.rating}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-white font-bold text-base leading-snug line-clamp-1">{car.name}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{car.year}</span>
            <span>·</span>
            <span>{car.owner}</span>
            <span>·</span>
            <span>{car.rto}</span>
          </div>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-1.5 text-[11px]">
          <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-md bg-white/[0.03]">
            <Gauge className="h-3.5 w-3.5 text-brand-cyan" />
            <span className="text-gray-300">{(car.kmDriven / 1000).toFixed(1)}k km</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-md bg-white/[0.03]">
            <Fuel className="h-3.5 w-3.5 text-brand-lime" />
            <span className="text-gray-300">{car.fuel}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-md bg-white/[0.03]">
            <Settings2 className="h-3.5 w-3.5 text-brand-red" />
            <span className="text-gray-300">{car.transmission === "Automatic" ? "Auto" : "Manual"}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-1 border-t border-white/5">
          <div>
            {car.originalPrice && (
              <div className="text-xs text-gray-500 line-through">{formatPrice(car.originalPrice)}</div>
            )}
            <div className="text-xl font-black text-brand-lime">{formatPrice(car.price)}</div>
            <div className="text-[11px] text-gray-400">EMI {formatPrice(car.emi)}/mo</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button
            onClick={onSelect}
            className="flex-1 bg-white/10 hover:bg-white/15 text-white border border-white/10"
            size="sm"
          >
            Details <ChevronRight className="h-3.5 w-3.5" />
          </Button>
          <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#1ebe57] text-black px-2.5">
            <a href={waLink} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <MessageCircle className="h-3.5 w-3.5" />
            </a>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-brand-lime/50 text-brand-lime px-2.5">
            <a href={`tel:${brandInfo.phone1}`} aria-label="Call">
              <Phone className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CarInventory;
