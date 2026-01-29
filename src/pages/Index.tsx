import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BrandsSection } from "@/components/BrandsSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { B2BSection } from "@/components/B2BSection";
import { StatsSection } from "@/components/StatsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <main>
        <HeroSection />
        <BrandsSection />
        <CategoriesSection />
        <B2BSection />
        <StatsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <ExitIntentPopup />
    </div>
  );
};

export default Index;
