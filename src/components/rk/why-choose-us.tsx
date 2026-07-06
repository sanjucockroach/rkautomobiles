"use client";

import { ShieldCheck, BadgeIndianRupee, MapPin, FileCheck, HeartHandshake, Award, Wrench } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "200+ Point Inspection",
    desc: "Every car undergoes a rigorous 200+ point inspection by certified mechanics before listing. Buy with complete confidence.",
    color: "accent",
  },
  {
    icon: BadgeIndianRupee,
    title: "Genuine Deals, Best Prices",
    desc: "Transparent pricing with no hidden charges. We offer the most competitive market prices for both buyers and sellers.",
    color: "quiet",
  },
  {
    icon: MapPin,
    title: "Pan India Delivery",
    desc: "Get your dream car delivered to your doorstep anywhere in India — safely, insured, and on time.",
    color: "quiet",
  },
  {
    icon: FileCheck,
    title: "Free RC Transfer",
    desc: "Hassle-free paperwork. We handle all RTO formalities and RC transfer at zero cost to you.",
    color: "quiet",
  },
  {
    icon: HeartHandshake,
    title: "Easy Finance Options",
    desc: "Up to 90% funding with quick approval and minimal documentation. Drive home your car today.",
    color: "quiet",
  },
  {
    icon: Award,
    title: "12+ Years of Trust",
    desc: "Serving buyers and sellers across India since 2012 with 5000+ happy customers and a 4.8★ rating.",
    color: "accent",
  },
];

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  accent: { text: "text-brand-lime", bg: "bg-[#d4ff00]/10", border: "border-[#d4ff00]/30" },
  quiet: { text: "text-white", bg: "bg-white/[0.04]", border: "border-white/10" },
};

export function WhyChooseUs() {
  return (
    <section id="why" className="content-auto relative py-16 lg:py-24">
      <div className="absolute inset-0 section-depth opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-brand-lime mb-3">Trust is the product before the car is</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Trusted by <span className="text-brand-lime">5000+ Customers</span>
          </h2>
          <p className="text-gray-400 mt-3">
            We don&apos;t just sell cars — we build trust for buyers and sellers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r) => {
            const c = colorMap[r.color];
            return (
              <div
                key={r.title}
                className="group relative bg-[#0d0f14] border border-white/10 rounded-2xl p-6 card-hover"
              >
                <div className={`inline-flex p-3 rounded-xl ${c.bg} ${c.border} border ${c.text} mb-4`}>
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{r.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Trust banner */}
        <div className="mt-10 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#d4ff00]/5 via-[#0d0f14] to-[#d4ff00]/5 p-6 lg:p-8">
          <div className="absolute top-0 right-0 h-40 w-40 bg-[#d4ff00]/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Wrench className="h-8 w-8 text-brand-lime" />
              <div>
                <div className="text-lg font-bold text-white">Free 7-Day Service Warranty</div>
                <div className="text-sm text-gray-400">On every car purchase. Plus 1-year free roadside assistance.</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-center">
              <div>
                <div className="text-2xl font-black text-brand-lime">100%</div>
                <div className="text-xs text-gray-400">Verified</div>
              </div>
              <div>
                <div className="text-2xl font-black text-brand-lime">5000+</div>
                <div className="text-xs text-gray-400">Customers</div>
              </div>
              <div>
                <div className="text-2xl font-black text-brand-lime">4.8★</div>
                <div className="text-xs text-gray-400">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
