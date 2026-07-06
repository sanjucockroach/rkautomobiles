"use client";

import { useState } from "react";
import {
  Car,
  ChevronRight,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { brandInfo } from "@/lib/data";

const heroScenes = [
  {
    label: "Showroom",
    src: "https://cdn.pixabay.com/video/2021/09/13/88481-606110665_large.mp4",
    poster: "/cars/hero-car.png",
  },
  {
    label: "Test Drive",
    src: "https://cdn.pixabay.com/video/2017/08/20/11490-230853032_large.mp4",
    poster: "/cars/car-5.png",
  },
  {
    label: "Luxury Detail",
    src: "https://cdn.pixabay.com/video/2023/10/12/184734-873923034_large.mp4",
    poster: "/cars/car-8.png",
  },
  {
    label: "Delivery Day",
    src: "https://cdn.pixabay.com/video/2021/09/13/88481-606110665_large.mp4",
    poster: "/cars/car-2.png",
  },
];

const navLinks = [
  { href: "#inventory", label: "Cars" },
  { href: "#services", label: "Services" },
  { href: "#finance", label: "Finance" },
  { href: "#sell", label: "Sell Car" },
  { href: "#contact", label: "Contact" },
];

const proofStats = [
  "Pan India Delivery",
  "200+ Point Inspection",
  "5000+ Happy Customers",
  "Finance & Insurance",
];

export function Hero() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [previousVideo, setPreviousVideo] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [failedVideos, setFailedVideos] = useState<Record<number, boolean>>({});
  const [menuOpen, setMenuOpen] = useState(false);

  const waLink = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(
    "Hi R.K. Automobile, I want to explore your India-wide used car inventory. Please share details."
  )}`;

  const switchVideo = (index: number) => {
    if (index === activeVideo || isTransitioning) return;
    setPreviousVideo(activeVideo);
    setActiveVideo(index);
    setIsTransitioning(true);
    window.setTimeout(() => {
      setPreviousVideo(null);
      setIsTransitioning(false);
    }, 1000);
  };

  const visibleVideoIndexes =
    previousVideo === null ? [activeVideo] : [previousVideo, activeVideo];
  const activeScene = heroScenes[activeVideo];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#050608]">
      <div className="absolute inset-0">
        <img
          src={activeScene.poster}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            failedVideos[activeVideo] ? "opacity-100" : "opacity-0"
          }`}
        />
        {visibleVideoIndexes.map((index) => {
          const scene = heroScenes[index];
          if (failedVideos[index]) return null;

          return (
            <video
              key={`${scene.label}-${index}`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
                activeVideo === index ? "opacity-100" : "opacity-0"
              }`}
              autoPlay
              muted
              loop
              playsInline
              poster={scene.poster}
              preload={activeVideo === index ? "auto" : "metadata"}
              onError={() =>
                setFailedVideos((current) => ({ ...current, [index]: true }))
              }
            >
              <source src={scene.src} type="video/mp4" />
            </video>
          );
        })}
        <img
          src="/cars/hero-car.png"
          alt=""
          aria-hidden="true"
          className="car-float pointer-events-none absolute bottom-[9vh] right-[-8vw] z-[1] hidden w-[58vw] max-w-[860px] opacity-75 mix-blend-screen lg:block"
        />
        <div className="cinematic-overlay absolute inset-0 z-[1]" />
      </div>

      <div className="relative z-[2] flex min-h-screen flex-col px-4 py-5 sm:px-6 lg:px-8">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
          <a href="#" className="flex h-[73px] w-[229px] sm:w-[270px] items-center rounded-xl px-3 py-2 bg-black border border-white/10" aria-label="R.K. Automobile home">
            <img src="/rk-logo.jpeg" alt="R.K. Automobile" className="h-full w-full object-contain" />
          </a>

          <div className="liquid-glass hidden items-center gap-1 rounded-full px-2 py-2 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`tel:${brandInfo.phone1}`}
              className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#050608] transition hover:bg-[#d4ff00]"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="liquid-glass relative flex h-12 w-12 items-center justify-center rounded-full text-white lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <Menu className={`absolute h-5 w-5 transition duration-300 ${menuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
            <X className={`absolute h-5 w-5 transition duration-300 ${menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"}`} />
          </button>
        </nav>

        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 px-4 py-6 backdrop-blur-md lg:hidden">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-white"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex h-[80vh] flex-col items-center justify-center gap-7 text-center">
              {navLinks.map((link, index) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="translate-y-0 text-3xl font-semibold text-white transition duration-500"
                  style={{ transitionDelay: `${100 + index * 50}ms` }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 rounded-full bg-[#d4ff00] px-7 py-3 text-sm font-black text-[#050608] transition hover:bg-white"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        )}

        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center pb-8 pt-12 lg:pb-10">
          <div className="max-w-4xl">
            <div className="liquid-glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85">
              <Truck className="h-4 w-4 text-[#d4ff00]" />
              India-wide used car buying, selling & delivery
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.96] tracking-normal text-white sm:text-6xl md:text-7xl lg:text-[6rem]">
              Find Your Next Car
              <span className="block text-[#d4ff00]">With Confidence</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
              Certified pre-owned cars with finance, insurance, Delhi showroom support, and Pan India delivery. R.K. Automobile helps you buy, sell, and upgrade without the usual guesswork.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full bg-[#d4ff00] px-6 font-black text-[#050608] hover:bg-white">
                <a href="#inventory">
                  <Search className="h-4 w-4" />
                  Explore Cars
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/30 bg-white/5 px-6 font-bold text-white backdrop-blur hover:bg-white/15 hover:text-white">
                <a href="#sell">
                  <Car className="h-4 w-4" />
                  Sell Your Car
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/30 bg-white/5 px-6 font-bold text-white backdrop-blur hover:bg-white/15 hover:text-white">
                <a href={waLink} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </Button>
            </div>

            <div className="liquid-glass mt-8 grid max-w-xl grid-cols-1 gap-3 rounded-2xl p-3 sm:grid-cols-[1fr_auto]">
              <div className="flex items-center gap-3 rounded-full bg-black/25 px-4 py-3 text-sm text-white/80">
                <ShieldCheck className="h-4 w-4 text-[#d4ff00]" />
                200+ inspected cars, doorstep delivery across India
              </div>
              <a
                href="#inventory"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-[#050608] transition hover:bg-[#d4ff00]"
              >
                Browse
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 pb-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {heroScenes.map((scene, index) => (
              <button
                key={scene.label}
                type="button"
                disabled={isTransitioning}
                onClick={() => switchVideo(index)}
                className={`border-b-2 px-1 pb-1 text-sm font-semibold transition duration-300 ${
                  activeVideo === index
                    ? "border-[#d4ff00] text-[#d4ff00]"
                    : "border-transparent text-white/55 hover:text-white/85"
                }`}
                aria-pressed={activeVideo === index}
              >
                {scene.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-white/70 sm:text-sm">
            {proofStats.map((stat, index) => (
              <span key={stat} className="flex items-center gap-2">
                {index > 0 && <span className="hidden text-white/25 sm:inline">|</span>}
                {stat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
