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

export default function App() {
  const isAdminRoute =
    window.location.pathname === "/admin" ||
    window.location.pathname.startsWith("/admin/");

  if (isAdminRoute) {
    return <AdminApp />;
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="flex-1">
        <Hero />
        <StatsBar />
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
