import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader, Copy, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CodeGeneratorTool = () => {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [framework, setFramework] = useState("react");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "typescript", label: "TypeScript" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" }
  ];

  const frameworks = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "node", label: "Node.js" },
    { value: "express", label: "Express" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "none", label: "No Framework" }
  ];

  const generateCode = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a description",
        description: "Describe what code you want to generate.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate AI generation (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockCode = language === "javascript" ? 
`// AI-Generated ${language.toUpperCase()} Code
// Description: ${prompt}
// Framework: ${frameworks.find(f => f.value === framework)?.label}

import React, { useState, useEffect } from 'react';

const GeneratedComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize component
    console.log('Component mounted');
  }, []);

  const handleAction = async () => {
    setLoading(true);
    try {
      // Your logic here based on: ${prompt}
      console.log('Action executed');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Generated Component</h1>
      <button 
        onClick={handleAction}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Execute Action'}
      </button>
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
};

export default GeneratedComponent;` :
`# AI-Generated ${language.toUpperCase()} Code
# Description: ${prompt}
# Framework: ${frameworks.find(f => f.value === framework)?.label}

def main():
    """
    Main function based on: ${prompt}
    """
    print("Generated Python code")
    
    # Your implementation here
    data = process_data()
    return data

def process_data():
    """Process data according to requirements"""
    # Implementation based on your prompt
    return {"status": "success", "message": "Code generated successfully"}

if __name__ == "__main__":
    result = main()
    print(f"Result: {result}")`;

      setResult(mockCode);
      
      toast({
        title: "Code generated successfully!",
        description: "Your AI-powered code is ready.",
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
      description: "Your code has been copied.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Code Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Programming Language
              </label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Framework/Library
              </label>
              <Select value={framework} onValueChange={setFramework}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {frameworks.map((fw) => (
                    <SelectItem key={fw.value} value={fw.value}>
                      {fw.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                What do you want to build?
              </label>
              <Textarea
                placeholder="E.g., 'Create a React component for user authentication' or 'Build a Python function to process CSV files'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <Button 
              onClick={generateCode} 
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
                "Generate Code"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Code</span>
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
              <div className="bg-muted rounded-lg p-4 min-h-[400px] overflow-auto">
                <pre className="text-sm text-foreground font-mono">
                  {result}
                </pre>
              </div>
            ) : (
              <div className="bg-muted rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Your generated code will appear here...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeGeneratorTool;