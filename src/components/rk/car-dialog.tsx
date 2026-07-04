"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fuel, Gauge, Settings2, Calendar, Users, Star, BadgeCheck, Shield, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { brandInfo, type Car } from "@/lib/data";

const formatPrice = (n: number) => "₹" + new Intl.NumberFormat("en-IN").format(n);

export function CarDialog({ car, onClose }: { car: Car; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const waLink = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(
    `Hi R.K. Automobile, I'm interested in the ${car.name} (${car.year}) at ${formatPrice(car.price)}. Please share more details & book a test drive.`
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitting(true);
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "buy",
          name: form.name,
          phone: form.phone,
          carId: car.id,
          carName: car.name,
          message: `Inquiry for ${car.name} (${car.year})`,
        }),
      });
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl bg-[#0d0f14] border-white/15 text-white max-h-[92vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-white">
            {car.name}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {car.year} · {car.owner} · {car.rto} RTO · {car.bodyType}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Left: image + specs */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#0a0c10] border border-white/10">
              <img src={car.image} alt={car.name} className="h-full w-full object-cover" />
              <div className="absolute top-3 left-3 flex gap-2">
                {car.badge && (
                  <Badge className="bg-[#d4ff00] text-black font-bold border-0">{car.badge}</Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Spec icon={Calendar} label="Year" value={String(car.year)} color="lime" />
              <Spec icon={Gauge} label="KM Driven" value={`${(car.kmDriven / 1000).toFixed(1)}k km`} color="cyan" />
              <Spec icon={Fuel} label="Fuel" value={car.fuel} color="lime" />
              <Spec icon={Settings2} label="Transmission" value={car.transmission} color="red" />
              <Spec icon={Users} label="Ownership" value={car.owner} color="blue" />
              <Spec icon={Star} label="Rating" value={`${car.rating} ★`} color="cyan" />
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-[#d4ff00]/10 to-[#00a8ff]/5 border border-[#d4ff00]/30 rounded-xl p-4">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-gray-400">Fixed Price</div>
                  {car.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">{formatPrice(car.originalPrice)}</div>
                  )}
                  <div className="text-3xl font-black text-brand-lime">{formatPrice(car.price)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">EMI from</div>
                  <div className="text-lg font-bold text-brand-cyan">{formatPrice(car.emi)}/mo</div>
                </div>
              </div>
            </div>

            {/* Trust */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <Shield className="h-3.5 w-3.5 text-brand-lime" /> 200+ Point Inspected
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <BadgeCheck className="h-3.5 w-3.5 text-brand-cyan" /> RC Transfer Free
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-300">
                <CheckCircle2 className="h-3.5 w-3.5 text-brand-red" /> {car.inspections}+ Inspected
              </div>
            </div>
          </div>

          {/* Right: features + form */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">Key Features</h4>
              <div className="flex flex-wrap gap-1.5">
                {car.features.map((f) => (
                  <Badge key={f} variant="outline" className="border-white/15 text-gray-200">
                    <CheckCircle2 className="h-3 w-3 mr-1 text-brand-lime" /> {f}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Inquiry form */}
            <div className="bg-[#14181f] border border-white/10 rounded-xl p-4">
              {done ? (
                <div className="text-center py-6">
                  <div className="h-12 w-12 mx-auto rounded-full bg-[#d4ff00]/15 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-6 w-6 text-brand-lime" />
                  </div>
                  <h4 className="text-white font-bold">Thank you, {form.name}!</h4>
                  <p className="text-sm text-gray-400 mt-1">Our team will call you shortly about the {car.name}.</p>
                  <Button asChild className="mt-4 bg-[#25D366] hover:bg-[#1ebe57] text-black">
                    <a href={waLink} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-4 w-4 mr-1" /> Continue on WhatsApp
                    </a>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Book Test Drive / Enquire</h4>
                  <input
                    required
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime/50"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime/50"
                  />
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#d4ff00] hover:bg-[#b8e000] text-black font-bold"
                  >
                    {submitting ? "Submitting..." : "Get a Call Back"}
                  </Button>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10">
                      <a href={waLink} target="_blank" rel="noreferrer">
                        <MessageCircle className="h-4 w-4 mr-1" /> WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 border-brand-lime text-brand-lime hover:bg-brand-lime/10">
                      <a href={`tel:${brandInfo.phone1}`}>
                        <Phone className="h-4 w-4 mr-1" /> Call
                      </a>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: "lime" | "cyan" | "red" | "blue";
}) {
  const colorMap = {
    lime: "text-brand-lime",
    cyan: "text-brand-cyan",
    red: "text-brand-red",
    blue: "text-brand-blue",
  };
  return (
    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
      <Icon className={`h-4 w-4 ${colorMap[color]} shrink-0`} />
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-gray-500">{label}</div>
        <div className="text-sm text-white font-medium truncate">{value}</div>
      </div>
    </div>
  );
}

export default CarDialog;
