import { lazy, Suspense } from "react";
import { Hero } from "@/components/rk/hero";
import { StatsBar } from "@/components/rk/stats-bar";
import { CarInventory } from "@/components/rk/car-inventory";
import { Services } from "@/components/rk/services";
import { WhyChooseUs } from "@/components/rk/why-choose-us";
import { EmiCalculator } from "@/components/rk/emi-calculator";
import { Process } from "@/components/rk/process";
import { SellCarForm } from "@/components/rk/sell-car-form";
import { Testimonials } from "@/components/rk/testimonials";
import { ContactMap } from "@/components/rk/contact-map";
import { Footer } from "@/components/rk/footer";
import { WhatsAppFloat } from "@/components/rk/whatsapp-float";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { AdminApp } from "@/components/admin/admin-app";
import { VehicleLookup } from "@/components/rk/vehicle-lookup";

const RkStoryPage = lazy(() => import("@/pages/rk-story-page").then((module) => ({ default: module.RkStoryPage })));
const BlogPage = lazy(() => import("@/pages/blog-page").then((module) => ({ default: module.BlogPage })));

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const isAdminRoute =
    window.location.pathname === "/admin" ||
    window.location.pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return <AdminApp />;
  }

  if (path === "/rk-story" || path === "/rk-story.html") return <Suspense fallback={null}><RkStoryPage /></Suspense>;
  if (path === "/blog" || path === "/blog.html") return <Suspense fallback={null}><BlogPage /></Suspense>;

  return (
    <div className="public-page relative min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="flex-1">
        <Hero />
        <StatsBar />
        <VehicleLookup />
        <CarInventory />
        <Services />
        <WhyChooseUs />
        <EmiCalculator />
        <Process />
        <SellCarForm />
        <Testimonials />
        <ContactMap />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Toaster />
      <SonnerToaster />
    </div>
  );
}
