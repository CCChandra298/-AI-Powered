import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Star, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const AIChatTool = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponses = [
        "That's a great question! Based on what you've shared, I'd recommend exploring the following approaches...",
        "I understand your concern. Here's how I can help you with that specific issue...",
        "Excellent! Let me break this down into actionable steps for you...",
        "I see what you're looking for. Here are some best practices and solutions...",
        "That's an interesting challenge. Let me provide you with some detailed guidance...",
        "Perfect! I can definitely help you optimize that process. Here's what I suggest..."
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `${randomResponse}

For your specific question about "${input}", here are my recommendations:

1. **First approach**: Start by analyzing the current situation and identifying key pain points.

2. **Implementation strategy**: Consider using proven methodologies and best practices in your field.

3. **Optimization tips**: Focus on efficiency and scalability when implementing solutions.

4. **Next steps**: I'd be happy to dive deeper into any of these areas. What would you like to explore further?

Is there anything specific you'd like me to clarify or expand on?`,
        sender: "ai",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again in a moment.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        text: "Hello! I'm your AI assistant. How can I help you today?",
        sender: "ai",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="h-[600px] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>AI Chat Assistant</span>
            </div>
            <Button variant="outline" size="sm" onClick={clearChat}>
              Clear Chat
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col space-y-4">
          {/* Messages Area */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.sender === "user" ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Star className="w-4 h-4" />
                      )}
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      <span className="text-sm">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={!input.trim() || isLoading}
              variant="hero"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2">
            {[
              "How can you help me?",
              "Explain AI concepts",
              "Help with coding",
              "Business advice"
            ].map((quickAction) => (
              <Button
                key={quickAction}
                variant="outline"
                size="sm"
                onClick={() => setInput(quickAction)}
                disabled={isLoading}
              >
                {quickAction}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChatTool;