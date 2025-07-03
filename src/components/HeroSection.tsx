import { Button } from "@/components/ui/button";
import { Star, Code, User } from "lucide-react";

const HeroSection = () => {
  const scrollToTools = () => {
    document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-card backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-8">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Your Complete AI Toolkit
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI-Powered
            </span>
            <br />
            Everything Suite
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Write content, generate code, create media, and chat with AI — all in one powerful platform. 
            Transform your productivity with cutting-edge artificial intelligence.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: Code, text: "Code Generation" },
              { icon: User, text: "Content Writing" },
              { icon: Star, text: "AI Chat Assistant" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 bg-gradient-card backdrop-blur-sm border border-border/50 rounded-full px-4 py-2"
              >
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="xl" 
              className="min-w-48"
              onClick={scrollToTools}
            >
              Explore AI Tools
            </Button>
            <Button variant="outline" size="xl" className="min-w-48">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-md mx-auto">
            {[
              { number: "15+", label: "AI Tools" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-foreground bg-gradient-primary bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;