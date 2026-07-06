"use client";

import { Star, Quote, MessageCircle } from "lucide-react";
import { testimonials } from "@/lib/data";

const avatarColors = [
  "bg-[#d4ff00]/15 text-brand-lime border-[#d4ff00]/30",
  "bg-[#d4ff00]/15 text-brand-lime border-[#d4ff00]/30",
  "bg-[#d4ff00]/15 text-brand-lime border-[#d4ff00]/30",
  "bg-[#d4ff00]/15 text-brand-lime border-[#d4ff00]/30",
];

export function Testimonials() {
  return (
    <section id="reviews" className="content-auto relative py-16 lg:py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4ff00]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-sm font-semibold text-brand-lime mb-3">Proof from buyers and sellers, not just promises</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            What Our <span className="text-brand-lime">Customers Say</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#d4ff00] text-[#d4ff00]" />
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.8</span>
            <span className="text-gray-400 text-sm">/ 5 · 1200+ reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="group relative bg-[#0d0f14] border border-white/10 rounded-2xl p-6 card-hover"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-white/5 group-hover:text-[#d4ff00]/10 transition-colors" />
              <div className="flex items-center gap-3 mb-4">
                <div className={`h-11 w-11 rounded-full border flex items-center justify-center font-bold ${avatarColors[i % 4]}`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.location} · {t.car}</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-[#d4ff00] text-[#d4ff00]" />
                ))}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 mb-3">Join 5000+ happy customers. Share your experience!</p>
          <a
            href="https://wa.me/919999995121?text=Hi%20R.K.%20Automobile,%20I'd%20like%20to%20share%20my%20feedback"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] hover:bg-[#25d366]/20 transition-colors text-sm font-semibold"
          >
            <MessageCircle className="h-4 w-4" /> Share Your Review
          </a>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
