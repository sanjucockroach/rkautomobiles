"use client";

import dynamic from "next/dynamic";
import { Search, MapPin, Shield, Star, TrendingUp, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandInfo } from "@/lib/data";

const ThreeScene = dynamic(() => import("./three-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-16 w-16 rounded-full border-4 border-[#d4ff00]/30 border-t-[#d4ff00] animate-spin" />
    </div>
  ),
});

const trustChips = [
  { icon: Shield, label: "200+ Point Inspection" },
  { icon: Star, label: "4.8★ Rated" },
  { icon: TrendingUp, label: "5000+ Happy Customers" },
  { icon: MapPin, label: "Pan India Delivery" },
];

export function Hero() {
  const waLink = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(
    "Hi R.K. Automobile, I want to explore your car inventory. Please share details."
  )}`;

  return (
    <section className="relative overflow-hidden pt-6 pb-0 lg:pt-10">
      {/* Background grid + glows */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#d4ff00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-[#00a8ff]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center min-h-[560px]">
          {/* Left: copy + search */}
          <div className="flex flex-col gap-6 z-10 pt-6 lg:pt-0">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-[#d4ff00]/30 bg-[#d4ff00]/5 text-xs font-medium">
              <Sparkles className="h-3.5 w-3.5 text-brand-lime" />
              <span className="text-brand-lime">Delhi&apos;s Trusted Used Car Dealer</span>
              <span className="text-gray-500">·</span>
              <span className="text-gray-400">Since 2012</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
              <span className="text-white">Drive Home a</span>
              <br />
              <span className="gradient-text-lime-cyan">Genuine Deal</span>
              <span className="text-white"> Today</span>
            </h1>

            <p className="text-base lg:text-lg text-gray-300 max-w-xl leading-relaxed">
              Buy & sell certified pre-owned cars with{" "}
              <span className="text-brand-lime font-semibold">finance</span>,{" "}
              <span className="text-brand-cyan font-semibold">insurance</span>, and{" "}
              <span className="text-white font-semibold">Pan India delivery</span>. 200+ inspected cars.
              Best prices guaranteed.
            </p>

            {/* Search bar (Cars24-style) */}
            <div className="bg-[#0d0f14]/80 backdrop-blur-md border border-white/10 rounded-2xl p-3 shadow-2xl shadow-black/40">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <div className="sm:col-span-5 relative">
                  <label className="absolute -top-2 left-3 px-1 bg-[#0d0f14] text-[10px] uppercase tracking-wider text-brand-lime">
                    Budget
                  </label>
                  <select className="w-full bg-[#14181f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-lime/50">
                    <option>Any Budget</option>
                    <option>Under ₹5 Lakh</option>
                    <option>₹5 - ₹10 Lakh</option>
                    <option>₹10 - ₹15 Lakh</option>
                    <option>₹15 - ₹20 Lakh</option>
                    <option>Above ₹20 Lakh</option>
                  </select>
                </div>
                <div className="sm:col-span-4 relative">
                  <label className="absolute -top-2 left-3 px-1 bg-[#0d0f14] text-[10px] uppercase tracking-wider text-brand-cyan">
                    Body Type
                  </label>
                  <select className="w-full bg-[#14181f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-cyan/50">
                    <option>All Types</option>
                    <option>Hatchback</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Luxury</option>
                    <option>MUV</option>
                  </select>
                </div>
                <div className="sm:col-span-3">
                  <Button asChild className="w-full bg-[#d4ff00] hover:bg-[#b8e000] text-black font-bold h-[42px] glow-lime">
                    <a href="#inventory">
                      <Search className="h-4 w-4 mr-1" /> Search
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-[#d4ff00] hover:bg-[#b8e000] text-black font-bold glow-lime">
                <a href="#inventory">
                  Browse Cars <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10">
                <a href={waLink} target="_blank" rel="noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>

            {/* Trust chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {trustChips.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/5"
                >
                  <c.icon className="h-3.5 w-3.5 text-brand-lime shrink-0" />
                  <span className="text-[11px] text-gray-300 leading-tight">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D scene */}
          <div className="relative h-[400px] sm:h-[480px] lg:h-[560px]">
            <div className="absolute inset-0">
              <ThreeScene />
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-4 left-4 z-10 bg-[#0d0f14]/90 backdrop-blur-md border border-[#d4ff00]/30 rounded-xl px-4 py-3 animate-float">
              <div className="text-[10px] uppercase tracking-wider text-[#aaaaaa]">Starting from</div>
              <div className="text-2xl font-black text-brand-lime">₹2.49 Lakh*</div>
              <div className="text-[10px] text-gray-400">EMI from ₹4,999/mo</div>
            </div>
            <div className="absolute top-4 right-4 z-10 bg-[#0d0f14]/90 backdrop-blur-md border border-[#00a8ff]/30 rounded-xl px-3 py-2">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#d4ff00] animate-pulse" />
                <span className="text-xs text-white font-medium">200+ Cars Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brand marquee */}
      <div className="relative mt-8 border-y border-white/10 bg-[#0a0c10]/60 py-4 overflow-hidden">
        <div className="flex animate-marquee gap-12 whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex gap-12 shrink-0">
              {["Maruti Suzuki", "Hyundai", "Honda", "Tata", "Mahindra", "Kia", "Toyota", "Skoda", "Volkswagen", "Nissan", "Renault", "Ford"].map((b) => (
                <span key={b + k} className="text-xl lg:text-2xl font-bold text-gray-600 hover:text-brand-lime transition-colors">
                  {b}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
