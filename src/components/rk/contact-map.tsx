"use client";

import { useState } from "react";
import { MapPin, Phone, Clock, Send, MessageCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandInfo } from "@/lib/data";
import { hasLeadErrors, validateLeadDetails, type LeadErrors } from "@/lib/forms";

export function ContactMap() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<LeadErrors>({});
  const inputClass =
    "mt-1.5 w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-950 placeholder:text-[#7f8790] focus:outline-none focus:border-brand-lime/70 focus:ring-2 focus:ring-brand-lime/20";

  const contactWaLink = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(
    `Hi R.K. Automobile, my name is ${form.name}. Phone: ${form.phone}. Email: ${form.email || "Not shared"}. Message: ${form.message || "Please contact me."}`
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateLeadDetails(form.name, form.phone);
    setErrors(nextErrors);
    if (hasLeadErrors(nextErrors)) return;
    setDone(true);
    window.open(contactWaLink, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="content-auto relative py-16 lg:py-24">
      <div className="absolute inset-0 section-depth opacity-20 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-brand-lime mb-3">Delhi showroom, India-wide assistance</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950">
            Get in <span className="text-brand-lime">Touch</span>
          </h2>
          <p className="text-slate-600 mt-3">
            Visit our showroom in Nehru Vihar, Delhi or reach out on WhatsApp/Phone. We&apos;re here to help you 7 days a week.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: contact info + map */}
          <div className="space-y-5">
            {/* Map */}
            <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-white h-64">
              <iframe
                title="R.K. Automobile Location"
                src={brandInfo.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg) contrast(0.85)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-2">
                <div className="flex items-start gap-2 min-w-0">
                  <MapPin className="h-4 w-4 text-brand-lime shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-950 truncate">R.K. AUTOMOBILE</div>
                    <div className="text-[11px] text-slate-600 truncate">{brandInfo.address}</div>
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
              <a href={`tel:${brandInfo.phone1}`} className="p-4 rounded-xl bg-white border border-slate-200 card-hover flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#00a8ee]/10 text-brand-lime">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-600">Call us</div>
                  <div className="text-sm font-bold text-slate-950">{brandInfo.phone1}</div>
                </div>
              </a>
              <a href={`https://wa.me/${brandInfo.whatsapp}`} target="_blank" rel="noreferrer" className="p-4 rounded-xl bg-white border border-slate-200 card-hover flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#25d366]/10 text-[#25d366]">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-600">WhatsApp</div>
                  <div className="text-sm font-bold text-slate-950">{brandInfo.phone2}</div>
                </div>
              </a>
              <a href={`tel:${brandInfo.phone3}`} className="p-4 rounded-xl bg-white border border-slate-200 card-hover flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#00a8ee]/10 text-brand-lime">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-600">Alt. number</div>
                  <div className="text-sm font-bold text-slate-950">{brandInfo.phone3}</div>
                </div>
              </a>
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#00a8ee]/10 text-brand-lime">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-600">Open hours</div>
                  <div className="text-sm font-bold text-slate-950">Mon-Sun · 9am-8pm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 lg:p-8 shadow-2xl shadow-slate-900/10">
            {done ? (
              <div className="text-center py-10">
                <div className="h-16 w-16 mx-auto rounded-full bg-[#00a8ee]/15 flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-brand-lime" />
                </div>
                <h3 className="text-2xl font-black text-slate-950">Message Sent!</h3>
                <p className="text-slate-600 mt-2">Your WhatsApp message is ready. We&apos;ll get back to you within 30 minutes during business hours.</p>
                <Button variant="outline" className="mt-5 border-brand-lime text-brand-lime" onClick={() => setDone(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <h3 className="text-xl font-bold text-slate-950">Send a Message</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <label className="block text-sm font-medium text-slate-700" htmlFor="contact-name">
                    Your name <span className="text-brand-lime">*</span>
                    <input
                      id="contact-name"
                      name="name"
                      required
                      autoComplete="name"
                      maxLength={80}
                      placeholder="Amit Sharma"
                      value={form.name}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      className={inputClass}
                    />
                    {errors.name && (
                      <span id="contact-name-error" role="alert" className="mt-1.5 block text-xs font-medium text-brand-lime">
                        {errors.name}
                      </span>
                    )}
                  </label>
                  <label className="block text-sm font-medium text-slate-700" htmlFor="contact-phone">
                    Phone <span className="text-brand-lime">*</span>
                    <input
                      id="contact-phone"
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
                      aria-describedby={errors.phone ? "contact-phone-error" : undefined}
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={inputClass}
                    />
                    {errors.phone && (
                      <span id="contact-phone-error" role="alert" className="mt-1.5 block text-xs font-medium text-brand-lime">
                        {errors.phone}
                      </span>
                    )}
                  </label>
                </div>
                <label className="block text-sm font-medium text-slate-700" htmlFor="contact-email">
                  Email <span className="text-slate-500">(optional)</span>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={100}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                  />
                </label>
                <label className="block text-sm font-medium text-slate-700" htmlFor="contact-message">
                  Message
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us what car, service, or delivery city you need help with."
                    rows={5}
                    maxLength={500}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </label>
                <Button
                  type="submit"
                  className="w-full bg-[#00a8ee] hover:bg-[#007fba] text-white font-bold h-11"
                >
                  <Send className="h-4 w-4 mr-2" /> Send Message
                </Button>
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <Button asChild variant="outline" className="border-[#25d366]/40 text-[#25d366] hover:bg-[#25d366]/10">
                    <a href={`https://wa.me/${brandInfo.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp R.K. Automobile">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-brand-lime/40 text-brand-lime hover:bg-brand-lime/10">
                    <a href={`tel:${brandInfo.phone1}`} aria-label={`Call ${brandInfo.phone1}`}><Phone className="h-4 w-4" /></a>
                  </Button>
                  <Button asChild variant="outline" className="border-brand-lime/40 text-brand-lime hover:bg-brand-lime/10">
                    <a href={brandInfo.mapUrl} target="_blank" rel="noreferrer" aria-label="Open R.K. Automobile directions"><MapPin className="h-4 w-4" /></a>
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
