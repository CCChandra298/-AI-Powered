import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ToolsSection from "@/components/ToolsSection";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AdBanner />
      <main>
        <HeroSection />
        <ToolsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
