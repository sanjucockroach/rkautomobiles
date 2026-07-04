"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandInfo } from "@/lib/data";

export function ContactMap() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
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
        body: JSON.stringify({ type: "contact", ...form }),
      });
      setDone(true);
      setForm({ name: "", phone: "", email: "", message: "" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 lg:py-24">
      <div className="absolute inset-0 bg-grid-cyan opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00a8ff]/30 bg-[#00a8ff]/5 text-xs font-medium text-brand-cyan mb-3">
            <MapPin className="h-3.5 w-3.5" /> Visit Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Get in <span className="gradient-text-lime-cyan">Touch</span>
          </h2>
          <p className="text-gray-400 mt-3">
            Visit our showroom in Nehru Vihar, Delhi or reach out on WhatsApp/Phone. We&apos;re here to help you 7 days a week.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: contact info + map */}
          <div className="space-y-5">
            {/* Map */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0f14] h-64">
              <iframe
                title="R.K. Automobile Location"
                src={brandInfo.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) contrast(0.85)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-[#0d0f14]/90 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <MapPin className="h-4 w-4 text-brand-lime shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">R.K. AUTOMOBILE</div>
                    <div className="text-[11px] text-gray-400 truncate">{brandInfo.address}</div>
                  </div>
                </div>
                <a
                  href={brandInfo.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold text-brand-lime hover:underline"
                >
                  <Navigation className="h-3 w-3" /> Directions
                </a>
              </div>
            </div>

            {/* Contact cards */}
            <div className="grid sm:grid-cols-2 gap-3">
              <a href={`tel:${brandInfo.phone1}`} className="p-4 rounded-xl bg-[#0d0f14] border border-white/10 card-hover flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#d4ff00]/10 text-brand-lime">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider">Call Us</div>
                  <div className="text-sm font-bold text-white">{brandInfo.phone1}</div>
                </div>
              </a>
              <a href={`https://wa.me/${brandInfo.whatsapp}`} target="_blank" rel="noreferrer" className="p-4 rounded-xl bg-[#0d0f14] border border-white/10 card-hover flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#25D366]/10 text-[#25D366]">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider">WhatsApp</div>
                  <div className="text-sm font-bold text-white">{brandInfo.phone2}</div>
                </div>
              </a>
              <a href={`tel:${brandInfo.phone3}`} className="p-4 rounded-xl bg-[#0d0f14] border border-white/10 card-hover flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#00a8ff]/10 text-brand-cyan">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider">Alt. Number</div>
                  <div className="text-sm font-bold text-white">{brandInfo.phone3}</div>
                </div>
              </a>
              <div className="p-4 rounded-xl bg-[#0d0f14] border border-white/10 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#ff3b30]/10 text-brand-red">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider">Open Hours</div>
                  <div className="text-sm font-bold text-white">Mon-Sun · 9am-8pm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="bg-[#0d0f14] border border-white/10 rounded-2xl p-6 lg:p-8 shadow-2xl shadow-black/40">
            {done ? (
              <div className="text-center py-10">
                <div className="h-16 w-16 mx-auto rounded-full bg-[#d4ff00]/15 flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-brand-lime" />
                </div>
                <h3 className="text-2xl font-black text-white">Message Sent!</h3>
                <p className="text-gray-400 mt-2">We&apos;ll get back to you within 30 minutes during business hours.</p>
                <Button variant="outline" className="mt-5 border-brand-lime text-brand-lime" onClick={() => setDone(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white">Send a Message</h3>
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
                    placeholder="Phone *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime/50"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan/50"
                />
                <textarea
                  placeholder="Your message..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#0a0c10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-cyan/50 resize-none"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#d4ff00] hover:bg-[#b8e000] text-black font-bold glow-lime h-11"
                >
                  {submitting ? "Sending..." : (<><Send className="h-4 w-4 mr-2" /> Send Message</>)}
                </Button>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <Button asChild variant="outline" className="border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10">
                    <a href={`https://wa.me/${brandInfo.whatsapp}`} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-brand-lime/40 text-brand-lime hover:bg-brand-lime/10">
                    <a href={`tel:${brandInfo.phone1}`}><Phone className="h-4 w-4" /></a>
                  </Button>
                  <Button asChild variant="outline" className="border-brand-cyan/40 text-brand-cyan hover:bg-brand-cyan/10">
                    <a href={brandInfo.mapUrl} target="_blank" rel="noreferrer"><MapPin className="h-4 w-4" /></a>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMap;
