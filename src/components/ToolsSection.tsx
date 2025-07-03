import { useState } from "react";
import ToolCard from "./ToolCard";
import AIWritingTool from "./tools/AIWritingTool";
import CodeGeneratorTool from "./tools/CodeGeneratorTool";
import AIChatTool from "./tools/AIChatTool";
import ResumeBuilderTool from "./tools/ResumeBuilderTool";
import LogoGeneratorTool from "./tools/LogoGeneratorTool";
import VideoCreatorTool from "./tools/VideoCreatorTool";
import SEOOptimizerTool from "./tools/SEOOptimizerTool";
import AnalyticsDashboardTool from "./tools/AnalyticsDashboardTool";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Code, User, Star, Image, Video, Calendar, Settings, File, BarChart3, Search } from "lucide-react";

const ToolsSection = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      id: "writing",
      title: "AI Writing Assistant",
      description: "Generate blogs, emails, ads, and stories with advanced AI writing capabilities.",
      icon: <User className="w-6 h-6" />,
      category: "Content",
      component: <AIWritingTool />
    },
    {
      id: "code",
      title: "Code Generator",
      description: "Generate, debug, and optimize code in multiple programming languages instantly.",
      icon: <Code className="w-6 h-6" />,
      category: "Developer",
      component: <CodeGeneratorTool />
    },
    {
      id: "chat",
      title: "AI Chat Assistant",
      description: "Get instant help, answers, and guidance with our advanced AI chatbot.",
      icon: <Star className="w-6 h-6" />,
      category: "Assistant",
      component: <AIChatTool />
    },
    {
      id: "resume",
      title: "Resume Builder",
      description: "Create professional resumes with AI-powered suggestions and templates.",
      icon: <File className="w-6 h-6" />,
      category: "Career",
      component: <ResumeBuilderTool />
    },
    {
      id: "logo",
      title: "Logo Generator",
      description: "Design unique logos and branding materials with AI-powered creativity.",
      icon: <Image className="w-6 h-6" />,
      category: "Design",
      component: <LogoGeneratorTool />
    },
    {
      id: "video",
      title: "Video Creator",
      description: "Generate videos from text, images, or scripts using advanced AI models.",
      icon: <Video className="w-6 h-6" />,
      category: "Media",
      component: <VideoCreatorTool />
    },
    {
      id: "seo",
      title: "SEO Optimizer",
      description: "Optimize your content for search engines with AI-powered analysis.",
      icon: <Search className="w-6 h-6" />,
      category: "Marketing",
      component: <SEOOptimizerTool />
    },
    {
      id: "analytics",
      title: "Analytics Dashboard",
      description: "Get AI-powered insights and predictions from your business data.",
      icon: <BarChart3 className="w-6 h-6" />,
      category: "Analytics",
      component: <AnalyticsDashboardTool />
    }
  ];

  const categories = ["All", "Content", "Developer", "Assistant", "Career", "Design", "Media", "Marketing", "Analytics"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = selectedCategory === "All" 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const openTool = (toolId: string) => {
    setSelectedTool(toolId);
  };

  const closeTool = () => {
    setSelectedTool(null);
  };

  const selectedToolData = tools.find(tool => tool.id === selectedTool);

  return (
    <section id="tools" className="py-20 bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Powerful <span className="bg-gradient-primary bg-clip-text text-transparent">AI Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our comprehensive suite of AI-powered tools designed to boost your productivity and creativity.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={tool.icon}
              category={tool.category}
              onTryTool={() => openTool(tool.id)}
              comingSoon={!tool.component}
            />
          ))}
        </div>

        {/* Tool Modal */}
        <Dialog open={!!selectedTool} onOpenChange={() => closeTool()}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {selectedToolData?.icon}
                <span>{selectedToolData?.title}</span>
              </DialogTitle>
            </DialogHeader>
            {selectedToolData?.component}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ToolsSection;