"use client";

import { useState } from "react";
import { Car, IndianRupee, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandInfo } from "@/lib/data";

export function SellCarForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    brand: "",
    model: "",
    year: "",
    km: "",
    expectedPrice: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "sell",
          name: form.name,
          phone: form.phone,
          message: `Sell car: ${form.brand} ${form.model} (${form.year}), ${form.km} km, Expected: ${form.expectedPrice}`,
        }),
      });
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  const waLink = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(
    `Hi R.K. Automobile, I want to sell my car. Details: ${form.brand} ${form.model} (${form.year}), ${form.km} km, Expected: ${form.expectedPrice}. Please give me the best price.`
  )}`;

  return (
    <section id="sell" className="relative py-16 lg:py-24">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#d4ff00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: copy + benefits */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d4ff00]/30 bg-[#d4ff00]/5 text-xs font-medium text-brand-lime mb-3">
              <Car className="h-3.5 w-3.5" /> Sell Your Car
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Get the <span className="gradient-text-lime-cyan">Best Price</span> for Your Car
            </h2>
            <p className="text-gray-400 mt-3 max-w-lg">
              Sell your car in 3 easy steps. Free home inspection, instant payment, and free RC transfer. No haggling, no hidden charges.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {[
                "Free doorstep inspection",
                "Instant payment transfer",
                "Free RC transfer",
                "Best market price",
                "No hidden charges",
                "All brands accepted",
              ].map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 className="h-4 w-4 text-brand-lime shrink-0" />
                  {b}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#d4ff00]/10 to-transparent border border-[#d4ff00]/20">
              <div className="flex items-center gap-3">
                <IndianRupee className="h-6 w-6 text-brand-lime" />
                <div>
                  <div className="text-sm font-bold text-white">Average payout in 24 hours</div>
                  <div className="text-xs text-gray-400">From inspection to payment — done in a day.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-[#0d0f14] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl shadow-black/40">
            {done ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 mx-auto rounded-full bg-[#d4ff00]/15 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-brand-lime" />
                </div>
                <h3 className="text-2xl font-black text-white">Request Received!</h3>
                <p className="text-gray-400 mt-2 max-w-sm mx-auto">
                  Thank you, {form.name}. Our team will call you on {form.phone} within 30 minutes to schedule a free inspection.
                </p>
                <Button asChild className="mt-5 bg-[#25D366] hover:bg-[#1ebe57] text-black">
                  <a href={waLink} target="_blank" rel="noreferrer">
                    Share details on WhatsApp
                  </a>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white mb-1">Get Free Valuation</h3>
                <p className="text-sm text-gray-400 mb-4">Fill the form and get a call back in 30 minutes.</p>

                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    required
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime/50"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime/50"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    placeholder="Brand (e.g. Hyundai)"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan/50"
                  />
                  <input
                    placeholder="Model (e.g. Verna)"
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    className="bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan/50"
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <input
                    type="number"
                    placeholder="Year"
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50"
                  />
                  <input
                    type="number"
                    placeholder="KM Driven"
                    value={form.km}
                    onChange={(e) => setForm({ ...form, km: e.target.value })}
                    className="bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50"
                  />
                  <input
                    type="number"
                    placeholder="Expected ₹"
                    value={form.expectedPrice}
                    onChange={(e) => setForm({ ...form, expectedPrice: e.target.value })}
                    className="bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-red/50"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#d4ff00] hover:bg-[#b8e000] text-black font-bold glow-lime h-11"
                >
                  {submitting ? "Submitting..." : (<><Send className="h-4 w-4 mr-2" /> Get Free Valuation</>)}
                </Button>
                <p className="text-[11px] text-gray-500 text-center">
                  By submitting, you agree to be contacted by R.K. Automobile regarding your car sale.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SellCarForm;
