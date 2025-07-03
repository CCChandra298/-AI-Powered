import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  onTryTool: () => void;
  comingSoon?: boolean;
}

const ToolCard = ({ title, description, icon, category, onTryTool, comingSoon = false }: ToolCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-gradient-card border border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      
      <CardHeader className="relative">
        <div className="flex items-center justify-between mb-2">
          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-primary-foreground">
            {icon}
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="relative">
        <Button 
          variant="tool" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
          onClick={onTryTool}
          disabled={comingSoon}
        >
          {comingSoon ? "Coming Soon" : "Try Tool"}
          {!comingSoon && <ArrowRight className="w-4 h-4" />}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ToolCard;