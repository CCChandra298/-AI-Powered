import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Loader, Download, Image, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LogoGeneratorTool = () => {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("technology");
  const [style, setStyle] = useState("modern");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [secondaryColor, setSecondaryColor] = useState("#1E40AF");
  const [fontSize, setFontSize] = useState([32]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const industries = [
    { value: "technology", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "retail", label: "Retail" },
    { value: "food", label: "Food & Beverage" },
    { value: "consulting", label: "Consulting" },
    { value: "creative", label: "Creative" }
  ];

  const styles = [
    { value: "modern", label: "Modern" },
    { value: "minimalist", label: "Minimalist" },
    { value: "vintage", label: "Vintage" },
    { value: "playful", label: "Playful" },
    { value: "professional", label: "Professional" },
    { value: "elegant", label: "Elegant" }
  ];

  const generateLogo = async () => {
    if (!businessName.trim()) {
      toast({
        title: "Please enter a business name",
        description: "We need a business name to create your logo.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate logo using Canvas API
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 400;
      canvas.height = 200;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background based on style
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      if (style === 'modern') {
        gradient.addColorStop(0, primaryColor);
        gradient.addColorStop(1, secondaryColor);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (style === 'minimalist') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
      } else {
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Add industry-specific icon
      const iconSize = 40;
      const iconX = 60;
      const iconY = canvas.height / 2 - iconSize / 2;

      ctx.fillStyle = style === 'minimalist' ? primaryColor : '#ffffff';
      
      // Simple geometric shapes based on industry
      switch (industry) {
        case 'technology':
          // Draw a gear-like shape
          ctx.beginPath();
          ctx.arc(iconX + iconSize/2, iconY + iconSize/2, iconSize/3, 0, 2 * Math.PI);
          ctx.fill();
          break;
        case 'finance':
          // Draw a diamond
          ctx.beginPath();
          ctx.moveTo(iconX + iconSize/2, iconY);
          ctx.lineTo(iconX + iconSize, iconY + iconSize/2);
          ctx.lineTo(iconX + iconSize/2, iconY + iconSize);
          ctx.lineTo(iconX, iconY + iconSize/2);
          ctx.closePath();
          ctx.fill();
          break;
        case 'healthcare':
          // Draw a cross
          ctx.fillRect(iconX + iconSize/2 - 5, iconY + 5, 10, iconSize - 10);
          ctx.fillRect(iconX + 5, iconY + iconSize/2 - 5, iconSize - 10, 10);
          break;
        default:
          // Draw a circle
          ctx.beginPath();
          ctx.arc(iconX + iconSize/2, iconY + iconSize/2, iconSize/3, 0, 2 * Math.PI);
          ctx.fill();
      }

      // Add business name
      ctx.fillStyle = style === 'minimalist' ? '#000000' : '#ffffff';
      ctx.font = `bold ${fontSize[0]}px Arial`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      
      const textX = iconX + iconSize + 20;
      const textY = canvas.height / 2;
      
      ctx.fillText(businessName, textX, textY);

      // Add tagline based on industry
      const taglines = {
        technology: 'Innovation at its best',
        finance: 'Your financial partner',
        healthcare: 'Caring for your health',
        education: 'Learning excellence',
        retail: 'Quality you trust',
        food: 'Taste the difference',
        consulting: 'Expert solutions',
        creative: 'Unleash creativity'
      };

      ctx.font = `${fontSize[0] * 0.4}px Arial`;
      ctx.fillStyle = style === 'minimalist' ? '#666666' : 'rgba(255,255,255,0.8)';
      ctx.fillText(taglines[industry as keyof typeof taglines] || 'Excellence in everything', textX, textY + fontSize[0] * 0.7);

      // Convert canvas to data URL
      const logoDataUrl = canvas.toDataURL('image/png');
      setGeneratedLogo(logoDataUrl);

      toast({
        title: "Logo generated successfully!",
        description: "Your unique logo is ready for download.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadLogo = () => {
    if (!generatedLogo) return;

    const link = document.createElement('a');
    link.download = `${businessName.replace(/\s+/g, '_')}_logo.png`;
    link.href = generatedLogo;
    link.click();

    toast({
      title: "Logo downloaded!",
      description: "Your logo has been saved to your device.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logo Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="w-5 h-5" />
              <span>Logo Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Business Name
              </label>
              <Input
                placeholder="Enter your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Industry
              </label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind.value} value={ind.value}>
                      {ind.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Style
              </label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((st) => (
                    <SelectItem key={st.value} value={st.value}>
                      {st.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Primary Color
              </label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  placeholder="#3B82F6"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Secondary Color
              </label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-16 h-10 p-1 border rounded"
                />
                <Input
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  placeholder="#1E40AF"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Font Size: {fontSize[0]}px
              </label>
              <Slider
                value={fontSize}
                onValueChange={setFontSize}
                max={48}
                min={16}
                step={2}
                className="w-full"
              />
            </div>

            <Button 
              onClick={generateLogo} 
              disabled={isGenerating}
              className="w-full"
              variant="hero"
            >
              {isGenerating ? (
                <>
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                  Generating Logo...
                </>
              ) : (
                <>
                  <Image className="w-4 h-4 mr-2" />
                  Generate Logo
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Logo Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Logo Preview</span>
              {generatedLogo && (
                <Button variant="outline" size="sm" onClick={downloadLogo}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 min-h-[300px] flex items-center justify-center">
              {generatedLogo ? (
                <div className="text-center">
                  <img 
                    src={generatedLogo} 
                    alt="Generated Logo" 
                    className="max-w-full h-auto rounded-lg shadow-lg mb-4"
                  />
                  <p className="text-sm text-muted-foreground">
                    Your unique {style} logo for {businessName}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <Image className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Your generated logo will appear here...
                  </p>
                </div>
              )}
            </div>

            {/* Hidden canvas for logo generation */}
            <canvas
              ref={canvasRef}
              style={{ display: 'none' }}
              width={400}
              height={200}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogoGeneratorTool;