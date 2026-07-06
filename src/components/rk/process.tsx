"use client";

import { useState } from "react";
import { Search, Car, FileText, KeyRound, Phone, Check, Wallet } from "lucide-react";
import { buyProcess, sellProcess } from "@/lib/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search,
  car: Car,
  file: FileText,
  key: KeyRound,
  phone: Phone,
  check: Check,
  wallet: Wallet,
};

export function Process() {
  const [tab, setTab] = useState<"buy" | "sell">("buy");
  const steps = tab === "buy" ? buyProcess : sellProcess;

  return (
    <section id="process" className="content-auto relative py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-sm font-semibold text-brand-lime mb-3">Buying and selling, made traceable</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            How It <span className="text-brand-lime">Works</span>
          </h2>
          <p className="text-gray-400 mt-3">
            Whether you&apos;re buying or selling, our process is fast, transparent and hassle-free.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-xl bg-[#0d0f14] border border-white/10">
            <button
              onClick={() => setTab("buy")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                tab === "buy" ? "bg-brand-lime text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Buy a Car
            </button>
            <button
              onClick={() => setTab("sell")}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                tab === "sell" ? "bg-brand-lime text-black" : "text-gray-400 hover:text-white"
              }`}
            >
              Sell Your Car
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => {
              const Icon = iconMap[s.icon] ?? Search;
              return (
                <div key={s.id} className="relative text-center">
                  <div className="relative inline-flex">
                    <div className="h-20 w-20 rounded-2xl border border-[#d4ff00]/30 bg-[#d4ff00]/5 text-brand-lime flex items-center justify-center mx-auto mb-4 relative z-10">
                      <Icon className="h-8 w-8" />
                    </div>
                    <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-[#0d0f14] border-2 border-[#d4ff00] flex items-center justify-center text-xs font-black text-brand-lime z-20">
                      {s.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1.5">{s.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Process;
