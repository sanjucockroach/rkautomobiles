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
  accent: { text: "text-brand-red", bg: "bg-red-50", border: "border-red-200" },
  quiet: { text: "text-brand-blue", bg: "bg-sky-50", border: "border-sky-200" },
};

export function WhyChooseUs() {
  return (
    <section id="why" className="content-auto relative py-16 lg:py-24">
      <div className="absolute inset-0 section-depth opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-brand-lime mb-3">Trust is the product before the car is</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950">
            Trusted by <span className="text-brand-lime">5000+ Customers</span>
          </h2>
          <p className="text-slate-600 mt-3">
            We don&apos;t just sell cars — we build trust for buyers and sellers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r) => {
            const c = colorMap[r.color];
            return (
              <div
                key={r.title}
                className="group relative bg-white border border-slate-200 rounded-lg p-6 card-hover"
              >
                <div className={`inline-flex p-3 rounded-xl ${c.bg} ${c.border} border ${c.text} mb-4`}>
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-2">{r.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Trust banner */}
        <div className="mt-10 relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 lg:p-8">
          <div className="absolute top-0 right-0 h-40 w-40 bg-[#00a8ee]/10 rounded-full blur-3xl" />
          <div className="relative flex flex-col lg:flex-row items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="inline-flex p-3 rounded-xl bg-red-50 border border-red-200 text-brand-red shrink-0 mt-1">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-950">Free 7-Day Service Warranty</div>
                <div className="text-sm text-slate-600 mt-0.5 font-medium">On every car purchase. One month free roadside assistance around Delhi NCR.</div>
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Warranty Terms & Conditions:</div>
                  <ul className="list-disc pl-4 space-y-1 text-xs text-slate-500">
                    <li>Customer side issues will not be addressed.</li>
                    <li>Any issue in machinery and car will be addressed accordingly.</li>
                    <li>Includes one month of free roadside assistance around Delhi NCR.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-center self-center lg:self-start lg:pt-1 shrink-0">
              <div>
                <div className="text-2xl font-black text-brand-lime">100%</div>
                <div className="text-xs text-slate-600">Verified</div>
              </div>
              <div>
                <div className="text-2xl font-black text-brand-lime">5000+</div>
                <div className="text-xs text-slate-600">Customers</div>
              </div>
              <div>
                <div className="text-2xl font-black text-brand-lime">4.8★</div>
                <div className="text-xs text-slate-600">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
