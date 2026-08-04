import { useEffect, useState } from "react";
import { ArrowRight, Check, Menu, X } from "lucide-react";
import { brandInfo } from "@/lib/data";

const videoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4";

const navLinks = [
  { href: "#start", label: "Start" },
  { href: "#story", label: "Story" },
  { href: "#aircraft", label: "Aircraft" },
  { href: "#benefits", label: "Benefits" },
  { href: "#faq", label: "FAQ" },
];

const benefits = [
  "Private jet and helicopter sales",
  "Aircraft sourcing across India and abroad",
  "Inspection and ownership due diligence",
  "Documentation and handover coordination",
];

export function OurSpecialityPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const enquiryUrl = `https://wa.me/${brandInfo.whatsapp}?text=${encodeURIComponent(
    "Hi R.K. Automobiles, I am interested in buying a private jet or helicopter.",
  )}`;

  useEffect(() => {
    document.title = "Private Jets & Helicopters | R.K. Automobiles";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <section
        id="start"
        className="relative h-screen min-h-[680px] overflow-hidden"
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-white/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/5 to-white/35" />

        <div className="relative flex h-full flex-col">
          <header className="relative z-30">
            <nav
              className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8"
              aria-label="Aviation navigation"
            >
              <a
                href="/"
                className="flex items-center gap-3 text-2xl font-semibold text-gray-900 transition-colors hover:text-gray-700"
                aria-label="R.K. Automobiles home"
              >
                <img
                  src="/rk-logo-transparent.png"
                  alt=""
                  className="h-12 w-12 object-contain"
                />
                <span>R.K. Automobiles</span>
              </a>

              <div className="hidden items-center gap-8 md:flex">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-gray-900 transition-colors hover:text-gray-700"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="flex h-11 w-11 items-center justify-center text-gray-900 transition-colors hover:text-gray-700 md:hidden"
                aria-expanded={menuOpen}
                aria-controls="aviation-mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </nav>

            {menuOpen && (
              <div
                id="aviation-mobile-menu"
                className="absolute left-5 right-5 top-[88px] rounded-lg bg-white/95 p-3 shadow-lg backdrop-blur-md md:hidden"
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md px-4 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </header>

          <main className="relative z-20 flex flex-1 items-center justify-center px-5 pb-16 sm:px-8">
            <div className="-mt-20 max-w-5xl text-center md:-mt-28 lg:-mt-36">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-600">
                Private jets & helicopters
              </p>
              <h1 className="text-balance text-6xl font-normal leading-none tracking-tighter md:text-7xl lg:text-8xl">
                <span className="block text-gray-500">Beyond the road.</span>
                <span className="-mt-3 block text-[#202a36]">
                  Above expectation.
                </span>
              </h1>
              <p className="mx-auto mb-6 mt-7 max-w-2xl text-lg text-gray-600 md:text-xl">
                R.K. Automobiles brings the same trusted, personal service to
                buying private jets and helicopters.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#story"
                  className="rounded-full bg-gray-300 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-400"
                >
                  Discover
                </a>
                <a
                  href={enquiryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-[#202a36] px-4 py-2 font-medium text-white transition-colors hover:bg-[#1a2229]"
                >
                  Enquire to buy
                </a>
              </div>
            </div>
          </main>
        </div>
      </section>

      <section id="story" className="scroll-mt-20 bg-white py-20 sm:py-28">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-gray-500">
              Our speciality
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-tight text-[#202a36] sm:text-5xl">
              Mobility without limits, handled with discretion.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-gray-600">
            Whether you are acquiring an executive jet or a private helicopter,
            our team helps identify the right aircraft and coordinates the sale
            through inspection, documentation and handover.
          </p>
        </div>
      </section>

      <section
        id="aircraft"
        className="scroll-mt-20 border-y border-gray-200 bg-gray-50 py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-4xl font-semibold text-[#202a36]">
                The right aircraft for your mission.
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-8 text-gray-600">
                Range, cabin, passenger capacity, operating profile, age and
                maintenance history shape every purchase. We help you compare
                those details before you commit.
              </p>
            </div>
            <div
              id="benefits"
              className="scroll-mt-20 border-t border-gray-300"
            >
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-4 border-b border-gray-300 py-5 text-lg font-medium text-gray-800"
                >
                  <Check className="h-5 w-5 text-[#202a36]" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-20 bg-[#202a36] py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white/60">
              Private aircraft sales
            </p>
            <h2 className="mt-3 text-4xl font-semibold">
              Tell us what you want to own.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              Share your preferred aircraft type, budget and operating needs.
              Our team will respond with relevant sales opportunities and the
              next practical steps.
            </p>
          </div>
          <a
            href={enquiryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-[#202a36] transition-colors hover:bg-gray-200"
          >
            Enquire to buy <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
