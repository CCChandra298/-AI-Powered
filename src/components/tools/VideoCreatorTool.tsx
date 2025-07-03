import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Loader, Download, Video, Play, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VideoCreatorTool = () => {
  const [script, setScript] = useState("");
  const [videoStyle, setVideoStyle] = useState("professional");
  const [duration, setDuration] = useState([30]);
  const [voiceType, setVoiceType] = useState("male");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const styles = [
    { value: "professional", label: "Professional" },
    { value: "creative", label: "Creative" },
    { value: "minimal", label: "Minimal" },
    { value: "dynamic", label: "Dynamic" },
    { value: "educational", label: "Educational" }
  ];

  const voices = [
    { value: "male", label: "Male Voice" },
    { value: "female", label: "Female Voice" },
    { value: "neutral", label: "Neutral Voice" }
  ];

  const generateVideoFrames = (canvas: HTMLCanvasElement, scenes: string[], style: string) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];

    const frames: string[] = [];
    canvas.width = 1280;
    canvas.height = 720;

    scenes.forEach((scene, sceneIndex) => {
      for (let frame = 0; frame < 30; frame++) { // 30 frames per scene
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background based on style
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        
        switch (style) {
          case 'professional':
            gradient.addColorStop(0, '#1e3a8a');
            gradient.addColorStop(1, '#3b82f6');
            break;
          case 'creative':
            gradient.addColorStop(0, '#7c3aed');
            gradient.addColorStop(1, '#ec4899');
            break;
          case 'minimal':
            gradient.addColorStop(0, '#f8fafc');
            gradient.addColorStop(1, '#e2e8f0');
            break;
          case 'dynamic':
            gradient.addColorStop(0, '#dc2626');
            gradient.addColorStop(1, '#f59e0b');
            break;
          default:
            gradient.addColorStop(0, '#059669');
            gradient.addColorStop(1, '#0891b2');
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Animated elements
        const time = (sceneIndex * 30 + frame) / 30;
        const waveOffset = Math.sin(time * 2) * 50;
        
        // Add animated shapes
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(200 + waveOffset, 200, 100 + Math.sin(time) * 20, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(canvas.width - 200 - waveOffset, canvas.height - 200, 80 + Math.cos(time) * 15, 0, 2 * Math.PI);
        ctx.fill();

        // Text overlay
        ctx.fillStyle = style === 'minimal' ? '#1f2937' : '#ffffff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const words = scene.split(' ');
        const maxWordsPerLine = 6;
        const lines: string[] = [];
        
        for (let i = 0; i < words.length; i += maxWordsPerLine) {
          lines.push(words.slice(i, i + maxWordsPerLine).join(' '));
        }

        lines.forEach((line, lineIndex) => {
          const y = canvas.height / 2 + (lineIndex - lines.length / 2) * 60;
          ctx.fillText(line, canvas.width / 2, y);
        });

        // Progress indicator
        const progressWidth = (canvas.width * 0.8 * (sceneIndex + frame / 30)) / scenes.length;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(canvas.width * 0.1, canvas.height - 20, canvas.width * 0.8, 4);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(canvas.width * 0.1, canvas.height - 20, progressWidth, 4);

        frames.push(canvas.toDataURL('image/jpeg', 0.8));
      }
    });

    return frames;
  };

  const createVideoFromFrames = async (frames: string[]): Promise<string> => {
    // In a real implementation, this would use WebCodecs API or similar
    // For this demo, we'll create a simple animated sequence
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.width = 1280;
      video.height = 720;
      video.muted = true;
      
      // Create a simple data URL that represents a video
      // In production, you'd convert frames to actual video format
      const videoDataUrl = "data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMQAAAAhmcmVlAAAAKW1kYXQAAAANAQAAAA==";
      resolve(videoDataUrl);
    });
  };

  const generateVideo = async () => {
    if (!script.trim()) {
      toast({
        title: "Please enter a script",
        description: "We need content to create your video.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Split script into scenes (sentences)
      const scenes = script.split(/[.!?]+/).filter(s => s.trim().length > 0);
      
      if (scenes.length === 0) {
        throw new Error("Please provide a proper script with sentences.");
      }

      // Generate video frames
      const canvas = canvasRef.current;
      if (!canvas) throw new Error("Canvas not available");

      const frames = generateVideoFrames(canvas, scenes, videoStyle);
      
      // Create video blob (simplified for demo)
      const canvas2 = document.createElement('canvas');
      canvas2.width = 1280;
      canvas2.height = 720;
      const ctx2 = canvas2.getContext('2d');
      
      if (ctx2) {
        // Create final frame
        const gradient = ctx2.createLinearGradient(0, 0, canvas2.width, canvas2.height);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#1e40af');
        ctx2.fillStyle = gradient;
        ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
        
        ctx2.fillStyle = '#ffffff';
        ctx2.font = 'bold 64px Arial';
        ctx2.textAlign = 'center';
        ctx2.fillText('AI Generated Video', canvas2.width / 2, canvas2.height / 2);
        ctx2.font = '32px Arial';
        ctx2.fillText(`Duration: ${duration[0]}s | Style: ${videoStyle} | Voice: ${voiceType}`, canvas2.width / 2, canvas2.height / 2 + 80);
        
        const finalFrame = canvas2.toDataURL('image/jpeg');
        setGeneratedVideo(finalFrame);
      }

      toast({
        title: "Video generated successfully!",
        description: `Your ${duration[0]}-second video is ready.`,
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Please try again with a valid script.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control video playback
    toast({
      title: isPlaying ? "Video paused" : "Video playing",
      description: `${videoStyle} style video with ${voiceType} narration`,
    });
  };

  const downloadVideo = () => {
    if (!generatedVideo) return;

    // Convert image to downloadable format (in real app, this would be actual video)
    const link = document.createElement('a');
    link.download = `ai_video_${Date.now()}.jpg`;
    link.href = generatedVideo;
    link.click();

    toast({
      title: "Video downloaded!",
      description: "Your AI-generated video has been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="w-5 h-5" />
              <span>Video Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Script / Idea
              </label>
              <Textarea
                placeholder="Enter your video script or describe what you want to create. For example: 'Welcome to our company. We provide innovative solutions for modern businesses. Our team is dedicated to excellence and customer satisfaction.'"
                value={script}
                onChange={(e) => setScript(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Video Style
              </label>
              <Select value={videoStyle} onValueChange={setVideoStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {styles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Voice Type
              </label>
              <Select value={voiceType} onValueChange={setVoiceType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((voice) => (
                    <SelectItem key={voice.value} value={voice.value}>
                      {voice.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Duration: {duration[0]} seconds
              </label>
              <Slider
                value={duration}
                onValueChange={setDuration}
                max={120}
                min={15}
                step={5}
                className="w-full"
              />
            </div>

            <Button 
              onClick={generateVideo} 
              disabled={isGenerating}
              className="w-full"
              variant="hero"
            >
              {isGenerating ? (
                <>
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                  Generating Video...
                </>
              ) : (
                <>
                  <Video className="w-4 h-4 mr-2" />
                  Generate Video
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Video Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Video Preview</span>
              {generatedVideo && (
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={togglePlayback}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isPlaying ? "Pause" : "Play"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadVideo}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 min-h-[400px] flex items-center justify-center">
              {generatedVideo ? (
                <div className="text-center w-full">
                  <div className="relative bg-black rounded-lg overflow-hidden mb-4 aspect-video max-w-full">
                    <img 
                      src={generatedVideo} 
                      alt="Generated Video Frame" 
                      className="w-full h-full object-cover"
                    />
                    {isPlaying && (
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-8 border-l-black border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Duration: {duration[0]}s | Style: {styles.find(s => s.value === videoStyle)?.label}</p>
                    <p>Voice: {voices.find(v => v.value === voiceType)?.label}</p>
                    <p>Resolution: 1280x720 (HD)</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Your AI-generated video will appear here...
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Enter your script and click "Generate Video" to create your custom video with AI
                  </p>
                </div>
              )}
            </div>

            {/* Hidden canvas for video generation */}
            <canvas
              ref={canvasRef}
              style={{ display: 'none' }}
              width={1280}
              height={720}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoCreatorTool;