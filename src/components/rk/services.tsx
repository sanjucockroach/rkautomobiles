"use client";

import { Car, Wallet, Truck, Shield, Wrench, Sparkles, ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  car: Car,
  wallet: Wallet,
  truck: Truck,
  shield: Shield,
  wrench: Wrench,
  sparkles: Sparkles,
};

const colorMap = {
  lime: { text: "text-brand-lime", bg: "bg-[#d4ff00]/10", border: "border-[#d4ff00]/30", glow: "group-hover:glow-lime" },
  cyan: { text: "text-brand-cyan", bg: "bg-[#00a8ff]/10", border: "border-[#00a8ff]/30", glow: "group-hover:glow-cyan" },
  red: { text: "text-brand-red", bg: "bg-[#ff3b30]/10", border: "border-[#ff3b30]/30", glow: "group-hover:glow-red" },
  blue: { text: "text-brand-blue", bg: "bg-[#007aff]/10", border: "border-[#007aff]/30", glow: "" },
};

export function Services() {
  return (
    <section id="services" className="relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00a8ff]/30 bg-[#00a8ff]/5 text-xs font-medium text-brand-cyan mb-3">
            <Sparkles className="h-3.5 w-3.5" /> What We Offer
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            One Stop <span className="gradient-text-lime-cyan">Automobile Hub</span>
          </h2>
          <p className="text-gray-400 mt-3">
            From buying your dream car to selling, financing, insuring, and servicing it — R.K. Automobile does it all under one roof.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? Car;
            const c = colorMap[s.color];
            return (
              <div
                key={s.id}
                className={`group relative bg-[#0d0f14] border border-white/10 rounded-2xl p-6 card-hover overflow-hidden`}
              >
                {/* corner glow */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 ${c.bg} rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`} />

                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl ${c.bg} ${c.border} border ${c.text} mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">{s.description}</p>

                  <ul className="space-y-1.5 mb-4">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className={`h-1.5 w-1.5 rounded-full ${c.bg.replace("/10","")} ${c.text} shrink-0`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className={`flex items-center gap-1 text-sm font-semibold ${c.text} group-hover:gap-2 transition-all`}>
                    Learn more <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
