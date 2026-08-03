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
  accent: { text: "text-brand-red", bg: "bg-red-50", border: "border-red-200" },
  quiet: { text: "text-brand-blue", bg: "bg-sky-50", border: "border-sky-200" },
};

export function Services() {
  return (
    <section id="services" className="content-auto relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-brand-lime mb-3">Everything around the car, handled by one desk</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950">
              One Stop <span className="text-brand-lime">Automobile Hub</span>
            </h2>
            <p className="text-slate-600 mt-3 max-w-2xl">
              From buying your dream car to selling, financing, insuring, and servicing it — R.K. Automobile does it all under one roof.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <div className="mb-2 flex items-center gap-2 font-bold text-slate-950">
              <Sparkles className="h-4 w-4 text-brand-lime" /> Showroom-grade support
            </div>
            <p className="leading-relaxed">A buyer, seller, or owner should never need five separate vendors to complete one car decision.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? Car;
            const c = colorMap[s.color];
            return (
              <div
                key={s.id}
                className={`group relative bg-white border border-slate-200 rounded-lg p-6 card-hover overflow-hidden`}
              >
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl ${c.bg} ${c.border} border ${c.text} mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{s.description}</p>

                  <ul className="space-y-1.5 mb-4">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
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
