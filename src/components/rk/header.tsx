"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandInfo } from "@/lib/data";

const navLinks = [
  { href: "#inventory", label: "Cars" },
  { href: "#services", label: "Services" },
  { href: "#finance", label: "Finance" },
  { href: "#sell", label: "Sell Car" },
  { href: "#process", label: "Process" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waLink = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(
    "Hi R.K. Automobile, I'm interested in your cars. Please share details."
  )}`;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#050608]/85 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-3 group shrink-0">
            <div className="relative h-10 w-10 lg:h-12 lg:w-12 rounded-lg overflow-hidden border border-white/10 bg-black">
              <img
                src="/rk-logo.jpeg"
                alt="R.K. Automobile logo"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#d4ff00]/30 rounded-lg" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm lg:text-base font-extrabold tracking-wide text-white">
                R.K. <span className="text-brand-cyan">AUTOMOBILE</span>
              </span>
              <span className="text-[10px] lg:text-[11px] uppercase tracking-[0.25em] text-[#aaaaaa]">
                Used Car Dealers
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-brand-lime transition-colors rounded-md hover:bg-white/5"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href={`tel:${brandInfo.phone1}`}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-200 hover:text-brand-lime transition-colors"
            >
              <Phone className="h-4 w-4" />
              {brandInfo.phone1}
            </a>
            <Button
              asChild
              className="bg-[#25D366] hover:bg-[#1ebe57] text-black font-semibold"
            >
              <a href={waLink} target="_blank" rel="noreferrer">
                <Car className="h-4 w-4 mr-1" /> WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#050608]/95 backdrop-blur-xl border-t border-white/10">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 text-base font-medium text-gray-200 hover:text-brand-lime hover:bg-white/5 rounded-md"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-2">
              <Button asChild variant="outline" className="flex-1 border-white/20 text-white">
                <a href={`tel:${brandInfo.phone1}`}>
                  <Phone className="h-4 w-4 mr-1" /> Call
                </a>
              </Button>
              <Button asChild className="flex-1 bg-[#25D366] hover:bg-[#1ebe57] text-black">
                <a href={waLink} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
