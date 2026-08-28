import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ServiceStrip } from "@/components/ServiceStrip";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";

/**
 * Page order is an argument, not a menu:
 *   proof (a yard changing under your thumb) → how it's done → what
 *   it costs to wait → what else we build → who we are → how to book.
 * The ask comes last because by then it's been earned.
 */
export default function Home() {
  return (
    <>
      <Nav />
      {/* Bottom padding clears the mobile call bar. */}
      <main className="pb-[78px] md:pb-0">
        <Hero />
        <ServiceStrip />
        <Work />
        <Process />
        <Services />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
      <CookieConsent />
      <Analytics />
    </>
  );
}
