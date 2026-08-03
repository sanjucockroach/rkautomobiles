import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/rk-story", label: "RK Story" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`${overlay ? "absolute inset-x-0 top-0" : "sticky top-0"} z-40 border-b border-white/10 bg-[#05070a]/95 text-white backdrop-blur-md`}>
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <a href="/" className="flex min-w-0 items-center gap-3" aria-label="R.K. Automobiles home">
          <img src="/rk-logo-transparent.png" alt="" className="h-[72px] w-[72px] shrink-0 object-contain" />
          <span className="truncate text-base font-black text-white sm:text-lg">R.K. Automobiles</span>
        </a>

        <div className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="relative py-2 text-sm font-semibold text-white/80 transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand-blue after:transition-transform after:duration-200 hover:text-white hover:after:scale-x-100">
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-white/20 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-navigation" className="absolute left-0 right-0 top-20 border-y border-white/10 bg-[#05070a] px-4 py-3 lg:hidden">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/10 px-2 py-4 text-lg font-bold text-white last:border-0"
              style={{ animation: `mobile-nav-in 260ms ${index * 45}ms both` }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

