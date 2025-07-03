import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, Download, User, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
}

const ResumeBuilderTool = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: ""
    },
    experience: [{ title: "", company: "", duration: "", description: "" }],
    education: [{ degree: "", school: "", year: "" }],
    skills: []
  });
  const [template, setTemplate] = useState("professional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const { toast } = useToast();

  const templates = [
    { value: "professional", label: "Professional" },
    { value: "creative", label: "Creative" },
    { value: "modern", label: "Modern" },
    { value: "minimal", label: "Minimal" }
  ];

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", duration: "", description: "" }]
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", year: "" }]
    }));
  };

  const addSkill = () => {
    if (skillInput.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const generateSuggestions = async () => {
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // AI-powered content suggestions
      const suggestions = {
        summary: "Dynamic professional with 5+ years of experience in technology and innovation. Proven track record of delivering high-quality solutions and leading cross-functional teams to achieve business objectives.",
        skills: ["JavaScript", "React", "Node.js", "Python", "Project Management", "Team Leadership", "Problem Solving", "Communication"]
      };

      setResumeData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          summary: prev.personalInfo.summary || suggestions.summary
        },
        skills: prev.skills.length === 0 ? suggestions.skills : prev.skills
      }));

      toast({
        title: "Suggestions generated!",
        description: "AI-powered content has been added to your resume.",
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

  const exportToPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    let yPosition = 20;

    // Header
    pdf.setFontSize(24);
    pdf.setFont(undefined, 'bold');
    pdf.text(resumeData.personalInfo.name || "Your Name", 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    pdf.setFont(undefined, 'normal');
    pdf.text(`${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}`, 20, yPosition);
    yPosition += 8;
    pdf.text(resumeData.personalInfo.location, 20, yPosition);
    yPosition += 15;

    // Summary
    if (resumeData.personalInfo.summary) {
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text("Professional Summary", 20, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setFont(undefined, 'normal');
      const summaryLines = pdf.splitTextToSize(resumeData.personalInfo.summary, pageWidth - 40);
      pdf.text(summaryLines, 20, yPosition);
      yPosition += summaryLines.length * 5 + 10;
    }

    // Experience
    if (resumeData.experience.some(exp => exp.title)) {
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text("Experience", 20, yPosition);
      yPosition += 8;

      resumeData.experience.forEach(exp => {
        if (exp.title) {
          pdf.setFontSize(12);
          pdf.setFont(undefined, 'bold');
          pdf.text(`${exp.title} at ${exp.company}`, 20, yPosition);
          yPosition += 6;

          pdf.setFontSize(10);
          pdf.setFont(undefined, 'italic');
          pdf.text(exp.duration, 20, yPosition);
          yPosition += 6;

          if (exp.description) {
            pdf.setFontSize(11);
            pdf.setFont(undefined, 'normal');
            const descLines = pdf.splitTextToSize(exp.description, pageWidth - 40);
            pdf.text(descLines, 20, yPosition);
            yPosition += descLines.length * 5 + 8;
          }
        }
      });
      yPosition += 5;
    }

    // Skills
    if (resumeData.skills.length > 0) {
      pdf.setFontSize(16);
      pdf.setFont(undefined, 'bold');
      pdf.text("Skills", 20, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setFont(undefined, 'normal');
      pdf.text(resumeData.skills.join(", "), 20, yPosition);
    }

    pdf.save("resume.pdf");
    
    toast({
      title: "Resume exported!",
      description: "Your resume has been downloaded as a PDF.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="builder">Resume Builder</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Template</label>
                  <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((tmpl) => (
                        <SelectItem key={tmpl.value} value={tmpl.value}>
                          {tmpl.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Input
                  placeholder="Full Name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, name: e.target.value }
                  }))}
                />

                <Input
                  placeholder="Email"
                  type="email"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, email: e.target.value }
                  }))}
                />

                <Input
                  placeholder="Phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, phone: e.target.value }
                  }))}
                />

                <Input
                  placeholder="Location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, location: e.target.value }
                  }))}
                />

                <Textarea
                  placeholder="Professional Summary"
                  value={resumeData.personalInfo.summary}
                  onChange={(e) => setResumeData(prev => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, summary: e.target.value }
                  }))}
                  rows={4}
                />

                <Button 
                  onClick={generateSuggestions} 
                  disabled={isGenerating}
                  variant="outline"
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      Generating Suggestions...
                    </>
                  ) : (
                    "Generate AI Suggestions"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill}>Add</Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center space-x-2"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(index)}
                        className="text-primary hover:text-primary/80"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={exportToPDF} variant="hero" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export as PDF</span>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Resume Preview - {templates.find(t => t.value === template)?.label} Template</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <div className="border-b pb-4 mb-6">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {resumeData.personalInfo.name || "Your Name"}
                  </h1>
                  <div className="text-gray-600 mt-2">
                    {resumeData.personalInfo.email && (
                      <span>{resumeData.personalInfo.email}</span>
                    )}
                    {resumeData.personalInfo.email && resumeData.personalInfo.phone && " | "}
                    {resumeData.personalInfo.phone && (
                      <span>{resumeData.personalInfo.phone}</span>
                    )}
                  </div>
                  {resumeData.personalInfo.location && (
                    <div className="text-gray-600">{resumeData.personalInfo.location}</div>
                  )}
                </div>

                {resumeData.personalInfo.summary && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Professional Summary</h2>
                    <p className="text-gray-700">{resumeData.personalInfo.summary}</p>
                  </div>
                )}

                {resumeData.skills.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                      {resumeData.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-200 px-3 py-1 rounded text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilderTool;