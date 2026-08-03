"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import { brandInfo } from "@/lib/data";

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const waLink = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(
    "Hi R.K. Automobile, I'd like to know more about your cars and services."
  )}`;

  if (!show) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Expanded card */}
      {open && (
        <div id="whatsapp-panel" className="w-72 overflow-hidden rounded-xl border border-slate-200 bg-white animate-in slide-in-from-bottom-4">
          <div className="bg-[#25d366] p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-slate-950" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-950">R.K. Automobile</div>
              <div className="text-[11px] text-slate-950/85 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-white" /> Online now
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-slate-700 bg-slate-100 rounded-lg p-3 rounded-tl-none">
              Interested in a vehicle, finance, or Pan India delivery? Message us and the showroom team will help with availability, pricing, and inspection details.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center py-2.5 rounded-lg bg-[#25d366] hover:bg-[#1ebe57] text-black text-sm font-bold transition-colors"
            >
              Start Chat on WhatsApp
            </a>
            <a
              href={`tel:${brandInfo.phone1}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-brand-lime/40 text-brand-lime text-sm font-semibold hover:bg-brand-lime/10 transition-colors"
            >
              <Phone className="h-4 w-4" /> Call {brandInfo.phone1}
            </a>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-black transition-transform hover:scale-105"
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        aria-expanded={open}
        aria-controls="whatsapp-panel"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
        {!open && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#00a8ee] text-black text-[10px] font-bold flex items-center justify-center border-2 border-[#050608]">
            1
          </span>
        )}
      </button>
    </div>
  );
}

export default WhatsAppFloat;
