import { useEffect } from 'react';
import { Code, Star, User, Settings } from "lucide-react";

const FooterAdBanner = () => {
  useEffect(() => {
    const uniqueId = Math.random().toString(36).substr(2, 9);
    (window as any)[`atOptions_footer_${uniqueId}`] = {
      'key': '083127bd8f2e0e659744a5003e21eb62',
      'format': 'iframe',
      'height': 90,
      'width': 728,
      'params': {}
    };

    const script = document.createElement('script');
    script.src = "//www.highperformanceformat.com/083127bd8f2e0e659744a5003e21eb62/invoke.js";
    script.type = "text/javascript";
    script.id = `footer-ad-${uniqueId}`;
    
    if (!document.getElementById(script.id)) {
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="flex justify-center py-6 border-b border-border">
      <div style={{ width: '728px', height: '90px', textAlign: 'center' }}>
        {/* Footer ad will be inserted here */}
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: "AI Tools", href: "#tools" },
      { name: "Pricing", href: "#pricing" },
      { name: "Features", href: "#features" },
      { name: "API Access", href: "#api" }
    ],
    Company: [
      { name: "About", href: "#about" },
      { name: "Blog", href: "#blog" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" }
    ],
    Support: [
      { name: "Help Center", href: "#help" },
      { name: "Documentation", href: "#docs" },
      { name: "Community", href: "#community" },
      { name: "Status", href: "#status" }
    ],
    Legal: [
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
      { name: "Cookie Policy", href: "#cookies" },
      { name: "GDPR", href: "#gdpr" }
    ]
  };

  return (
    <footer className="bg-background/95 backdrop-blur-sm border-t border-border">
      {/* Footer Ad */}
      <FooterAdBanner />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CoreAI Suite
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The most comprehensive AI-powered platform for content creation, code generation, 
              and intelligent assistance. Boost your productivity with cutting-edge artificial intelligence.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Star, href: "#twitter" },
                { icon: User, href: "#linkedin" },
                { icon: Code, href: "#github" },
                { icon: Settings, href: "#discord" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} CoreAI Suite. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>Made with ❤️ using AI</span>
              <span>•</span>
              <span>99.9% Uptime SLA</span>
              <span>•</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;