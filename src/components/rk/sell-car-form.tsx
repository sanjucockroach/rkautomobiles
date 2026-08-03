"use client";

import { useState } from "react";
import { IndianRupee, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandInfo } from "@/lib/data";
import { hasLeadErrors, validateLeadDetails, type LeadErrors } from "@/lib/forms";

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
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<LeadErrors>({});
  const inputClass =
    "mt-1.5 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-950 placeholder:text-[#7f8790] focus:outline-none focus:border-brand-lime/70 focus:ring-2 focus:ring-brand-lime/20";

  const waLink = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(
    `Hi R.K. Automobile, I want to sell my car. My name is ${form.name}, phone: ${form.phone}. Details: ${form.brand} ${form.model} (${form.year}), ${form.km} km, Expected: ${form.expectedPrice}. Please give me the best price.`
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateLeadDetails(form.name, form.phone);
    setErrors(nextErrors);
    if (hasLeadErrors(nextErrors)) return;
    setDone(true);
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="sell" className="content-auto relative py-16 lg:py-24">
      <div className="absolute inset-0 section-depth opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-[#00a8ee]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: copy + benefits */}
          <div>
            <p className="text-sm font-semibold text-brand-lime mb-3">Sell with paperwork, payment, and pickup aligned</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950">
              Get the <span className="text-brand-lime">Best Price</span> for Your Car
            </h2>
            <p className="text-slate-600 mt-3 max-w-lg">
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
                <div key={b} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-brand-lime shrink-0" />
                  {b}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#00a8ee]/10 to-transparent border border-[#00a8ee]/20">
              <div className="flex items-center gap-3">
                <IndianRupee className="h-6 w-6 text-brand-lime" />
                <div>
                  <div className="text-sm font-bold text-slate-950">Average payout in 24 hours</div>
                  <div className="text-xs text-slate-600">From inspection to payment — done in a day.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 lg:p-8 shadow-2xl shadow-slate-900/10">
            {done ? (
              <div className="text-center py-8">
                <div className="h-16 w-16 mx-auto rounded-full bg-[#00a8ee]/15 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-brand-lime" />
                </div>
                <h3 className="text-2xl font-black text-slate-950">Request Received!</h3>
                <p className="text-slate-600 mt-2 max-w-sm mx-auto">
                  Thank you, {form.name}. Our team will call you on {form.phone} within 30 minutes to schedule a free inspection.
                </p>
                <Button asChild className="mt-5 bg-[#25d366] hover:bg-[#1ebe57] text-black">
                  <a href={waLink} target="_blank" rel="noreferrer">
                    Share details on WhatsApp
                  </a>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h3 className="text-xl font-bold text-slate-950 mb-1">Get Free Valuation</h3>
                <p className="text-sm text-slate-600 mb-4">Fill the form and get a call back in 30 minutes.</p>

                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="block text-sm font-medium text-slate-700" htmlFor="sell-name">
                    Your name <span className="text-brand-lime">*</span>
                    <input
                      id="sell-name"
                      name="name"
                      required
                      autoComplete="name"
                      maxLength={80}
                      placeholder="Amit Sharma"
                      value={form.name}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "sell-name-error" : undefined}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={inputClass}
                    />
                    {errors.name && (
                      <span id="sell-name-error" role="alert" className="mt-1.5 block text-xs font-medium text-brand-lime">
                        {errors.name}
                      </span>
                    )}
                  </label>
                  <label className="block text-sm font-medium text-slate-700" htmlFor="sell-phone">
                    Phone number <span className="text-brand-lime">*</span>
                    <input
                      id="sell-phone"
                      name="phone"
                      required
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      pattern="[0-9+\\-\\s]{8,16}"
                      maxLength={16}
                      placeholder="99999 95121"
                      value={form.phone}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "sell-phone-error" : undefined}
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={inputClass}
                    />
                    {errors.phone && (
                      <span id="sell-phone-error" role="alert" className="mt-1.5 block text-xs font-medium text-brand-lime">
                        {errors.phone}
                      </span>
                    )}
                  </label>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="block text-sm font-medium text-slate-700" htmlFor="sell-brand">
                    Car brand
                    <input
                      id="sell-brand"
                      name="brand"
                      autoComplete="organization"
                      maxLength={60}
                      placeholder="Hyundai"
                      value={form.brand}
                      onChange={(e) => setForm({ ...form, brand: e.target.value })}
                      className={inputClass}
                    />
                  </label>
                  <label className="block text-sm font-medium text-slate-700" htmlFor="sell-model">
                    Model
                    <input
                      id="sell-model"
                      name="model"
                      maxLength={60}
                      placeholder="Verna SX(O)"
                      value={form.model}
                      onChange={(e) => setForm({ ...form, model: e.target.value })}
                      className={inputClass}
                    />
                  </label>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <label className="block text-sm font-medium text-slate-700" htmlFor="sell-year">
                    Year
                    <input
                      id="sell-year"
                      name="year"
                      type="number"
                      inputMode="numeric"
                      min={1995}
                      max={2026}
                      placeholder="2021"
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: e.target.value })}
                      className={inputClass}
                    />
                  </label>
                  <label className="block text-sm font-medium text-slate-700" htmlFor="sell-km">
                    KM driven
                    <input
                      id="sell-km"
                      name="km"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      placeholder="35000"
                      value={form.km}
                      onChange={(e) => setForm({ ...form, km: e.target.value })}
                      className={inputClass}
                    />
                  </label>
                  <label className="block text-sm font-medium text-slate-700" htmlFor="sell-price">
                    Expected price
                    <input
                      id="sell-price"
                      name="expectedPrice"
                      type="number"
                      inputMode="numeric"
                      min={0}
                      placeholder="650000"
                      value={form.expectedPrice}
                      onChange={(e) => setForm({ ...form, expectedPrice: e.target.value })}
                      className={inputClass}
                    />
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#00a8ee] hover:bg-[#007fba] text-white font-bold h-11"
                >
                  <Send className="h-4 w-4 mr-2" /> Get Free Valuation
                </Button>
                <p className="text-[11px] text-slate-500 text-center">
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
