import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader, Copy, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIWritingTool = () => {
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("blog");
  const [tone, setTone] = useState("professional");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const contentTypes = [
    { value: "blog", label: "Blog Post" },
    { value: "email", label: "Email" },
    { value: "ad", label: "Advertisement" },
    { value: "story", label: "Story" },
    { value: "social", label: "Social Media Post" },
    { value: "product", label: "Product Description" }
  ];

  const tones = [
    { value: "professional", label: "Professional" },
    { value: "casual", label: "Casual" },
    { value: "friendly", label: "Friendly" },
    { value: "formal", label: "Formal" },
    { value: "creative", label: "Creative" },
    { value: "persuasive", label: "Persuasive" }
  ];

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what you want to write about.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI generation (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockContent = `Here's your AI-generated ${contentTypes.find(t => t.value === contentType)?.label.toLowerCase()} with a ${tone} tone about "${prompt}":

This is a demonstration of the AI writing tool. In a real implementation, this would connect to an AI service like OpenAI's GPT API to generate high-quality, contextual content based on your prompt.

The generated content would be:
- Tailored to your selected content type (${contentTypes.find(t => t.value === contentType)?.label})
- Written in your chosen tone (${tone})
- Optimized for engagement and readability
- SEO-friendly when applicable

This powerful AI writing assistant can help you create compelling content in seconds, saving you hours of writing time while maintaining quality and consistency.`;

      setResult(mockContent);
      
      toast({
        title: "Content generated successfully!",
        description: "Your AI-powered content is ready.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied to clipboard!",
      description: "Your content has been copied.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Content Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Content Type
              </label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {contentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Tone
              </label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((toneOption) => (
                    <SelectItem key={toneOption.value} value={toneOption.value}>
                      {toneOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                What do you want to write about?
              </label>
              <Textarea
                placeholder="E.g., 'Write a blog post about the benefits of AI in healthcare' or 'Create an email announcing our new product launch'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <Button 
              onClick={generateContent} 
              disabled={isLoading}
              className="w-full"
              variant="hero"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Content"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Content</span>
              {result && (
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4" />
                  Copy
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="bg-muted rounded-lg p-4 min-h-[300px]">
                <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                  {result}
                </pre>
              </div>
            ) : (
              <div className="bg-muted rounded-lg p-4 min-h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Your generated content will appear here...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIWritingTool;