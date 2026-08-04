import { Facebook, Instagram, Youtube, MessageCircle, Phone, MapPin, Globe, ChevronRight } from "lucide-react";
import { brandInfo } from "@/lib/data";

const quickLinks = [
  { href: "/#inventory", label: "Browse Cars" },
  { href: "/#services", label: "Our Services" },
  { href: "/#finance", label: "EMI Calculator" },
  { href: "/#sell", label: "Sell Your Car" },
  { href: "/#process", label: "How It Works" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
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
    <footer className="relative mt-auto border-t border-slate-200 bg-white text-slate-950">
      <div className="flex h-1"><span className="w-2/3 bg-brand-blue" /><span className="w-1/3 bg-brand-red" /></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center gap-3 mb-4">
              <img src="/rk-logo-transparent.png" alt="R.K. Automobiles logo" className="h-16 w-16 object-contain" />
              <div className="flex flex-col leading-tight">
                <span className="text-base font-extrabold tracking-wide text-slate-950">
                  R.K. Automobiles
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Used cars, clearly handled</span>
              </div>
            </a>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              Used-car buying, selling, finance, insurance and delivery across India, supported by our Delhi showroom team.
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
              <SocialIcon href={brandInfo.socials.whatsapp} label="WhatsApp Channel" color="hover:text-[#25d366] hover:border-[#25d366]/50">
                <MessageCircle className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-slate-950 mb-4">Quick links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-slate-600 hover:text-brand-blue transition-colors flex items-center gap-1">
                    <ChevronRight className="h-3 w-3" /> {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-slate-950 mb-4">Our services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="text-sm text-slate-600 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-brand-red" /> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-slate-950 mb-4">Reach us</h4>
            <div className="space-y-3">
              <a href={brandInfo.mapUrl} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-sm text-slate-600 hover:text-brand-blue transition-colors">
                <MapPin className="h-4 w-4 text-brand-lime shrink-0 mt-0.5" />
                <span>{brandInfo.address}</span>
              </a>
              <a href={`tel:${brandInfo.phone1}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-blue transition-colors">
                <Phone className="h-4 w-4 text-brand-lime shrink-0" />
                <span>{brandInfo.phone1}, {brandInfo.phone3}</span>
              </a>
              <a href={`https://wa.me/${brandInfo.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#25d366] transition-colors">
                <MessageCircle className="h-4 w-4 text-[#25d366] shrink-0" />
                <span>WhatsApp: {brandInfo.phone2}</span>
              </a>
              <a href={brandInfo.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-blue transition-colors">
                <Globe className="h-4 w-4 text-brand-lime shrink-0" />
                <span>rkautomobile.in</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} R.K. Automobiles. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built for genuine used car deals across India.
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
      className={`h-9 w-9 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 transition-colors ${color}`}
    >
      {children}
    </a>
  );
}

export default Footer;
