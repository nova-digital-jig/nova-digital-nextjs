import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { Stats } from "@/components/stats";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <Stats />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
