"use client";

import { useState, useMemo } from "react";
import { TrendingDown, Percent, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { brandInfo } from "@/lib/data";

const formatPrice = (n: number) => "₹" + new Intl.NumberFormat("en-IN").format(Math.round(n));

export function EmiCalculator() {
  const [price, setPrice] = useState(800000);
  const [down, setDown] = useState(20); // percent
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(60); // months

  const { emi, principal, totalInterest, totalPayable, loanAmount } = useMemo(() => {
    const loanAmount = price - (price * down) / 100;
    const monthlyRate = rate / 12 / 100;
    const n = tenure;
    const emi =
      monthlyRate === 0
        ? loanAmount / n
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, n)) /
          (Math.pow(1 + monthlyRate, n) - 1);
    const totalPayable = emi * n;
    const totalInterest = totalPayable - loanAmount;
    return { emi, principal: loanAmount, totalInterest, totalPayable, loanAmount };
  }, [price, down, rate, tenure]);

  const waLink = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(
    `Hi R.K. Automobile, I used your EMI calculator: Car price ${formatPrice(price)}, Down payment ${down}%, Rate ${rate}%, Tenure ${tenure} months. EMI ${formatPrice(emi)}/mo. Please help me with finance for my car.`
  )}`;

  const principalPct = (principal / totalPayable) * 100;

  return (
    <section id="finance" className="content-auto relative py-16 lg:py-24">
      <div className="absolute inset-0 section-depth opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: copy */}
          <div>
            <p className="text-sm font-semibold text-brand-lime mb-3">Finance desk, before you visit the showroom</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              Plan Your <span className="text-brand-lime">Car Loan</span> in Seconds
            </h2>
            <p className="text-gray-400 mt-3 max-w-lg">
              Calculate your monthly EMI instantly. Get up to <span className="text-brand-lime font-semibold">90% funding</span> with quick approval and minimal documentation.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-gray-400">Interest Rates</div>
                <div className="text-2xl font-black text-brand-lime">8.5%*</div>
                <div className="text-[11px] text-gray-500">Starting p.a.</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-gray-400">Max Funding</div>
                <div className="text-2xl font-black text-brand-lime">90%</div>
                <div className="text-[11px] text-gray-500">On-road price</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-gray-400">Approval Time</div>
                <div className="text-2xl font-black text-brand-lime">24 hrs</div>
                <div className="text-[11px] text-gray-500">Quick sanction</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-xs text-gray-400">Tenure</div>
                <div className="text-2xl font-black text-brand-lime">7 yrs</div>
                <div className="text-[11px] text-gray-500">Max tenure</div>
              </div>
            </div>
          </div>

          {/* Right: calculator */}
          <div className="bg-[#0d0f14] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl shadow-black/40">
            <div className="space-y-5">
              {/* Price */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-300 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-brand-lime" /> Car Price
                  </label>
                  <span className="text-lg font-bold text-white">{formatPrice(price)}</span>
                </div>
                <Slider
                  value={[price]}
                  onValueChange={(v) => setPrice(v[0])}
                  min={200000}
                  max={3000000}
                  step={50000}
                  className="[&_[role=slider]]:bg-[#d4ff00] [&_[role=slider]]:border-[#d4ff00] [&_.bg-primary]:bg-[#d4ff00]"
                />
                <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                  <span>₹2L</span>
                  <span>₹30L</span>
                </div>
              </div>

              {/* Down payment */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-300 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-brand-lime" /> Down Payment
                  </label>
                  <span className="text-lg font-bold text-white">{down}% ({formatPrice((price * down) / 100)})</span>
                </div>
                <Slider
                  value={[down]}
                  onValueChange={(v) => setDown(v[0])}
                  min={0}
                  max={50}
                  step={5}
                  className="[&_[role=slider]]:bg-[#d4ff00] [&_[role=slider]]:border-[#d4ff00] [&_.bg-primary]:bg-[#d4ff00]"
                />
                <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-300 flex items-center gap-1.5">
                    <Percent className="h-3.5 w-3.5 text-brand-lime" /> Interest Rate
                  </label>
                  <span className="text-lg font-bold text-white">{rate}% p.a.</span>
                </div>
                <Slider
                  value={[rate]}
                  onValueChange={(v) => setRate(v[0])}
                  min={7}
                  max={16}
                  step={0.5}
                  className="[&_[role=slider]]:bg-[#d4ff00] [&_[role=slider]]:border-[#d4ff00] [&_.bg-primary]:bg-[#d4ff00]"
                />
                <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                  <span>7%</span>
                  <span>16%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-300 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-brand-lime" /> Loan Tenure
                  </label>
                  <span className="text-lg font-bold text-white">{tenure} mo ({(tenure / 12).toFixed(1)} yr)</span>
                </div>
                <Slider
                  value={[tenure]}
                  onValueChange={(v) => setTenure(v[0])}
                  min={12}
                  max={84}
                  step={12}
                  className="[&_[role=slider]]:bg-[#d4ff00] [&_[role=slider]]:border-[#d4ff00] [&_.bg-primary]:bg-[#d4ff00]"
                />
                <div className="flex justify-between text-[11px] text-gray-500 mt-1">
                  <span>1 yr</span>
                  <span>7 yrs</span>
                </div>
              </div>

              {/* Result */}
              <div className="bg-gradient-to-br from-[#d4ff00]/10 to-[#d4ff00]/5 border border-[#d4ff00]/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs font-semibold text-gray-400">Your monthly EMI</div>
                    <div className="text-3xl lg:text-4xl font-black text-brand-lime">
                      {formatPrice(emi)}
                      <span className="text-base text-gray-400 font-normal">/mo</span>
                    </div>
                  </div>
                  <TrendingDown className="h-8 w-8 text-brand-lime" />
                </div>

                {/* Breakdown bar */}
                <div className="flex h-2.5 rounded-full overflow-hidden mb-2">
                  <div className="bg-[#d4ff00]" style={{ width: `${principalPct}%` }} />
                  <div className="bg-[#d4ff00]" style={{ width: `${100 - principalPct}%` }} />
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-brand-lime">Principal {formatPrice(principal)}</span>
                  <span className="text-brand-lime">Interest {formatPrice(totalInterest)}</span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/10 flex justify-between text-xs">
                  <span className="text-gray-400">Total Payable</span>
                  <span className="text-white font-bold">{formatPrice(totalPayable)}</span>
                </div>
              </div>

              <Button asChild className="w-full bg-[#d4ff00] hover:bg-[#b8e000] text-black font-bold">
                <a href={waLink} target="_blank" rel="noreferrer">
                  Apply for Loan on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmiCalculator;
