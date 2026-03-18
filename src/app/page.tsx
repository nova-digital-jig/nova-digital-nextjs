import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { Process } from "@/components/process";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
