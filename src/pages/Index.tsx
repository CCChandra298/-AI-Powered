import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ToolsSection from "@/components/ToolsSection";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import SidebarAd from "@/components/SidebarAd";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Sidebar Ads */}
      <SidebarAd side="left" />
      <SidebarAd side="right" />
      
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
