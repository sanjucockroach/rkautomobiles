import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/rk-story", label: "RK Story" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={overlay ? "relative z-30" : "sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl"}>
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
        <a href="/" className="flex min-w-0 items-center gap-3" aria-label="R.K. Automobiles home">
          <img src="/rk-logo-transparent.png" alt="" className="h-16 w-16 shrink-0 object-contain sm:h-[72px] sm:w-[72px]" />
          <span className="truncate text-base font-black text-slate-900 sm:text-lg">R.K. Automobiles</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-semibold text-slate-700 transition-colors hover:text-brand-blue">
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-900 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-navigation" className="absolute left-4 right-4 top-[76px] border border-slate-200 bg-white p-3 shadow-xl lg:hidden">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-slate-100 px-3 py-4 text-lg font-bold text-slate-800 last:border-0"
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

