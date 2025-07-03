import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ToolsSection from "@/components/ToolsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <ToolsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
