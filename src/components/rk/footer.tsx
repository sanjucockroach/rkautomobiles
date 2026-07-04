"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle, Phone, MapPin, Globe, Mail, ChevronRight } from "lucide-react";
import { brandInfo } from "@/lib/data";

const quickLinks = [
  { href: "#inventory", label: "Browse Cars" },
  { href: "#services", label: "Our Services" },
  { href: "#finance", label: "EMI Calculator" },
  { href: "#sell", label: "Sell Your Car" },
  { href: "#process", label: "How It Works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const services = [
  "Buy Used Cars",
  "Sell Used Cars",
  "Car Finance",
  "Pan India Delivery",
  "Insurance & Claims",
  "Denting & Painting",
  "Car Detailing",
  "Workshop Services",
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/10 bg-[#050608]">
      {/* top accent */}
      <div className="h-1 bg-gradient-to-r from-[#d4ff00] via-[#00a8ff] to-[#ff3b30]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="#" className="flex items-center gap-3 mb-4">
              <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-white/10 bg-black">
                <img src="/rk-logo.jpeg" alt="R.K. Automobile logo" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-extrabold tracking-wide text-white">
                  R.K. <span className="text-brand-cyan">AUTOMOBILE</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#aaaaaa]">Used Car Dealers</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Delhi&apos;s trusted used car dealer since 2012. Buy & sell certified pre-owned cars with finance, insurance, and Pan India delivery. Genuine deals, best prices.
            </p>

            {/* Socials */}
            <div className="flex flex-wrap gap-2 mt-5">
              <SocialIcon href={brandInfo.socials.facebook} label="Facebook" color="hover:text-[#1877F2] hover:border-[#1877F2]/50">
                <Facebook className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={brandInfo.socials.instagram} label="Instagram" color="hover:text-[#E4405F] hover:border-[#E4405F]/50">
                <Instagram className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={brandInfo.socials.youtube} label="YouTube" color="hover:text-[#FF0000] hover:border-[#FF0000]/50">
                <Youtube className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href={brandInfo.socials.whatsapp} label="WhatsApp Channel" color="hover:text-[#25D366] hover:border-[#25D366]/50">
                <MessageCircle className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-400 hover:text-brand-lime transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="text-sm text-gray-400 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-brand-lime" /> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Reach Us</h4>
            <div className="space-y-3">
              <a href={brandInfo.mapUrl} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-sm text-gray-400 hover:text-brand-lime transition-colors">
                <MapPin className="h-4 w-4 text-brand-lime shrink-0 mt-0.5" />
                <span>{brandInfo.address}</span>
              </a>
              <a href={`tel:${brandInfo.phone1}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-lime transition-colors">
                <Phone className="h-4 w-4 text-brand-cyan shrink-0" />
                <span>{brandInfo.phone1}, {brandInfo.phone3}</span>
              </a>
              <a href={`https://wa.me/${brandInfo.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#25D366] transition-colors">
                <MessageCircle className="h-4 w-4 text-[#25D366] shrink-0" />
                <span>WhatsApp: {brandInfo.phone2}</span>
              </a>
              <a href={brandInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-brand-cyan transition-colors">
                <Globe className="h-4 w-4 text-brand-blue shrink-0" />
                <span>rkautomobile.in</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} R.K. Automobile. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Designed with <span className="text-brand-red">♥</span> for genuine car deals in Delhi.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  color,
  children,
}: {
  href: string;
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className={`h-9 w-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 transition-colors ${color}`}
    >
      {children}
    </a>
  );
}

export default Footer;
