import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, Search, TrendingUp, Target, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SEOAnalysis {
  overallScore: number;
  keywordDensity: { [key: string]: number };
  readabilityScore: number;
  suggestions: string[];
  metaAnalysis: {
    titleLength: number;
    descriptionLength: number;
    titleOptimal: boolean;
    descriptionOptimal: boolean;
  };
  contentAnalysis: {
    wordCount: number;
    paragraphCount: number;
    headingCount: number;
    avgWordsPerSentence: number;
  };
}

const SEOOptimizerTool = () => {
  const [content, setContent] = useState("");
  const [targetKeyword, setTargetKeyword] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const { toast } = useToast();

  const analyzeContent = async () => {
    if (!content.trim()) {
      toast({
        title: "Please enter content to analyze",
        description: "We need content to perform SEO analysis.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Perform basic SEO analysis
      const words = content.toLowerCase().split(/\s+/).filter(word => word.length > 3);
      const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
      
      // Calculate keyword density
      const keywordCounts: { [key: string]: number } = {};
      words.forEach(word => {
        keywordCounts[word] = (keywordCounts[word] || 0) + 1;
      });

      // Get top keywords
      const topKeywords = Object.entries(keywordCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .reduce((obj, [word, count]) => {
          obj[word] = (count / words.length) * 100;
          return obj;
        }, {} as { [key: string]: number });

      // Calculate readability (simplified Flesch score approximation)
      const avgWordsPerSentence = words.length / sentences.length;
      const avgSyllablesPerWord = 1.5; // Simplified estimation
      const readabilityScore = Math.max(0, Math.min(100, 
        206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord)
      ));

      // Check target keyword presence
      const targetKeywordPresent = targetKeyword && 
        content.toLowerCase().includes(targetKeyword.toLowerCase());
      const targetKeywordDensity = targetKeyword ? 
        (keywordCounts[targetKeyword.toLowerCase()] || 0) / words.length * 100 : 0;

      // Generate suggestions
      const suggestions: string[] = [];
      
      if (words.length < 300) {
        suggestions.push("Content is too short. Aim for at least 300 words for better SEO.");
      }
      
      if (targetKeyword && !targetKeywordPresent) {
        suggestions.push(`Target keyword "${targetKeyword}" not found in content. Include it naturally.`);
      }
      
      if (targetKeyword && targetKeywordDensity > 3) {
        suggestions.push("Keyword density is too high. Reduce keyword repetition to avoid over-optimization.");
      }
      
      if (targetKeyword && targetKeywordDensity < 0.5) {
        suggestions.push("Keyword density is too low. Include the target keyword more frequently.");
      }
      
      if (readabilityScore < 60) {
        suggestions.push("Content readability is low. Use shorter sentences and simpler words.");
      }
      
      if (metaTitle.length < 30 || metaTitle.length > 60) {
        suggestions.push("Meta title should be between 30-60 characters for optimal display in search results.");
      }
      
      if (metaDescription.length < 120 || metaDescription.length > 160) {
        suggestions.push("Meta description should be between 120-160 characters for optimal display.");
      }
      
      if (paragraphs.length < 3) {
        suggestions.push("Break content into more paragraphs for better readability and structure.");
      }

      if (suggestions.length === 0) {
        suggestions.push("Great job! Your content follows good SEO practices.");
      }

      // Calculate overall score
      let overallScore = 50;
      if (words.length >= 300) overallScore += 15;
      if (targetKeywordPresent) overallScore += 10;
      if (targetKeywordDensity >= 0.5 && targetKeywordDensity <= 3) overallScore += 10;
      if (readabilityScore >= 60) overallScore += 10;
      if (metaTitle.length >= 30 && metaTitle.length <= 60) overallScore += 5;
      
      overallScore = Math.min(100, overallScore);

      const seoAnalysis: SEOAnalysis = {
        overallScore,
        keywordDensity: topKeywords,
        readabilityScore: Math.round(readabilityScore),
        suggestions,
        metaAnalysis: {
          titleLength: metaTitle.length,
          descriptionLength: metaDescription.length,
          titleOptimal: metaTitle.length >= 30 && metaTitle.length <= 60,
          descriptionOptimal: metaDescription.length >= 120 && metaDescription.length <= 160
        },
        contentAnalysis: {
          wordCount: words.length,
          paragraphCount: paragraphs.length,
          headingCount: (content.match(/^#+\s/gm) || []).length,
          avgWordsPerSentence: Math.round(avgWordsPerSentence)
        }
      };

      setAnalysis(seoAnalysis);

      toast({
        title: "SEO analysis complete!",
        description: `Overall SEO score: ${overallScore}/100`,
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Content & Meta Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Target Keyword
              </label>
              <Input
                placeholder="e.g., digital marketing, web development"
                value={targetKeyword}
                onChange={(e) => setTargetKeyword(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Meta Title ({metaTitle.length}/60)
              </label>
              <Input
                placeholder="Enter your page title"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                maxLength={60}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Meta Description ({metaDescription.length}/160)
              </label>
              <Textarea
                placeholder="Enter your page description"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                maxLength={160}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Content to Analyze
              </label>
              <Textarea
                placeholder="Paste your content here for SEO analysis..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                className="resize-none"
              />
            </div>

            <Button 
              onClick={analyzeContent} 
              disabled={isAnalyzing}
              className="w-full"
              variant="hero"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                  Analyzing SEO...
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Analyze SEO
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* SEO Analysis Results */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {analysis ? (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="keywords">Keywords</TabsTrigger>
                  <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                        {analysis.overallScore}/100
                      </div>
                      <p className="text-muted-foreground">
                        {getScoreLabel(analysis.overallScore)}
                      </p>
                      <Progress value={analysis.overallScore} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-semibold">{analysis.contentAnalysis.wordCount}</div>
                        <div className="text-sm text-muted-foreground">Words</div>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <div className="text-2xl font-semibold">{analysis.readabilityScore}</div>
                        <div className="text-sm text-muted-foreground">Readability</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Meta Title Length</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{analysis.metaAnalysis.titleLength}/60</span>
                          {analysis.metaAnalysis.titleOptimal ? 
                            <CheckCircle className="w-4 h-4 text-green-600" /> : 
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                          }
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Meta Description Length</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{analysis.metaAnalysis.descriptionLength}/160</span>
                          {analysis.metaAnalysis.descriptionOptimal ? 
                            <CheckCircle className="w-4 h-4 text-green-600" /> : 
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="keywords" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Top Keywords by Density</h4>
                    <div className="space-y-2">
                      {Object.entries(analysis.keywordDensity).map(([keyword, density]) => (
                        <div key={keyword} className="flex items-center justify-between">
                          <span className="text-sm">{keyword}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{density.toFixed(1)}%</span>
                            <Badge 
                              variant={keyword === targetKeyword.toLowerCase() ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {keyword === targetKeyword.toLowerCase() ? "Target" : "Found"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {targetKeyword && (
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4" />
                        <span className="font-medium">Target Keyword Analysis</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        "{targetKeyword}" appears {analysis.keywordDensity[targetKeyword.toLowerCase()] ? 
                          `${analysis.keywordDensity[targetKeyword.toLowerCase()].toFixed(1)}%` : 
                          "0%"} of the time
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="suggestions" className="space-y-4">
                  <div className="space-y-3">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                        <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">
                  Your SEO analysis will appear here...
                </p>
                <p className="text-sm text-muted-foreground">
                  Enter your content and click "Analyze SEO" to get detailed insights and suggestions
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SEOOptimizerTool;