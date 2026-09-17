import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { Hero } from "@/components/portfolio/Hero";
import { Focus } from "@/components/portfolio/Focus";
import { Work } from "@/components/portfolio/Work";
import { Systems } from "@/components/portfolio/Systems";
import { Stack } from "@/components/portfolio/Stack";
import { GitHubSection } from "@/components/portfolio/GitHubSection";
import { About, Contact } from "@/components/portfolio/AboutContact";
import { Footer } from "@/components/portfolio/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <SiteHeader />
      <main>
        <Hero />
        <Focus />
        <Work />
        <Systems />
        <Stack />
        <GitHubSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
