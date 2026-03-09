import { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  User,
  Lightbulb,
  Sparkles,
  Leaf,
  Shield,
  Users,
  Zap,
  Heart
} from "lucide-react";
import livanaLogo from "@/assets/livana-logo.png";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const quickPrompts = [
  { text: "What should I eat before a workout?", icon: Zap },
  { text: "How can I increase my protein intake?", icon: Heart },
  { text: "Is intermittent fasting right for me?", icon: Lightbulb },
  { text: "Suggest a healthy snack under 200 calories", icon: Sparkles },
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const AICoach = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm **Mr. Livana**, your personal AI nutrition coach. 🌿\n\nI'm here to help you make healthier food choices, understand your nutrition needs, and reach your wellness goals. Whether you're looking to lose weight, build muscle, or simply eat better — I've got you covered!\n\nWhat would you like to know about nutrition today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    let assistantContent = "";

    try {
      const chatMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: chatMessages, type: "coach" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      const upsertAssistant = (nextChunk: string) => {
        assistantContent += nextChunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant" && last.id.startsWith("stream-")) {
            return prev.map((m, i) => 
              i === prev.length - 1 ? { ...m, content: assistantContent } : m
            );
          }
          return [...prev, { 
            id: `stream-${Date.now()}`, 
            role: "assistant", 
            content: assistantContent, 
            timestamp: new Date() 
          }];
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <PageLayout 
      title="Mr. Livana" 
      subtitle="Your personal AI nutrition coach — ask anything about healthy eating, meal planning, and wellness."
    >
      <div className="max-w-4xl mx-auto">
        {/* AI Coach Header Card */}
        <Card className="glass mb-6 p-5 relative overflow-hidden">
          {/* Subtle gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-primary/50 shadow-lg shadow-primary/20">
                <AvatarImage src={livanaLogo} alt="Mr. Livana" />
                <AvatarFallback className="bg-primary/20">
                  <Leaf className="w-8 h-8 text-primary" />
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-background animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold font-heading">Mr. Livana</h3>
                <Sparkles className="w-5 h-5 text-primary" />
                <Badge variant="secondary" className="text-[10px] font-semibold px-2 py-0.5 bg-primary/10 text-primary border-primary/20">
                  AI Pro
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm">AI Nutrition Expert • Always here to help</p>
            </div>
            
            {/* Active Users Indicator */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15">
                <div className="relative flex items-center">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="absolute w-2 h-2 rounded-full bg-primary animate-ping" />
                </div>
                <div className="flex -space-x-1.5">
                  <Users className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-primary">10+ active</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
                <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Private</span>
              </div>
            </div>
          </div>
          
          {/* Mobile active users */}
          <div className="flex sm:hidden items-center gap-2 mt-3 pt-3 border-t border-border/30">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15">
              <div className="relative flex items-center">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="absolute w-2 h-2 rounded-full bg-primary animate-ping" />
              </div>
              <span className="text-xs font-semibold text-primary">10+ active users</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border border-border/50">
              <Shield className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Private</span>
            </div>
          </div>
        </Card>

        {/* Chat Container */}
        <Card className="glass overflow-hidden border-border/30">
          {/* Messages */}
          <ScrollArea className="h-[500px] p-6" ref={scrollRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  {message.role === "assistant" ? (
                    <Avatar className="w-9 h-9 shrink-0 border border-primary/30 shadow-sm shadow-primary/10">
                      <AvatarImage src={livanaLogo} alt="Mr. Livana" />
                      <AvatarFallback className="bg-primary/20">
                        <Leaf className="w-4 h-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0 shadow-sm">
                      <User className="w-4 h-4 text-accent" />
                    </div>
                  )}
                  <div className={`max-w-[78%] ${message.role === "user" ? "text-right" : ""}`}>
                    {message.role === "assistant" && (
                      <p className="text-[11px] text-primary font-semibold mb-1 tracking-wide uppercase">Mr. Livana</p>
                    )}
                    <div className={`rounded-2xl px-4 py-3 shadow-sm ${
                      message.role === "assistant"
                        ? "bg-muted/50 rounded-tl-sm text-left border border-border/20"
                        : "bg-primary text-primary-foreground rounded-tr-sm shadow-primary/20"
                    }`}>
                      <p 
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1.5 tabular-nums">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <Avatar className="w-9 h-9 border border-primary/30">
                    <AvatarImage src={livanaLogo} alt="Mr. Livana" />
                    <AvatarFallback className="bg-primary/20">
                      <Leaf className="w-4 h-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[11px] text-primary font-semibold mb-1 tracking-wide uppercase">Mr. Livana</p>
                    <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3 border border-border/20">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
                        <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
                        <span className="text-xs text-muted-foreground ml-2">Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border/30 p-4 bg-muted/10 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Mr. Livana about nutrition, meals, or healthy habits..."
                  className="flex-1 bg-background/60 border-border/40 focus:border-primary h-12 pr-4 pl-4 rounded-xl"
                  disabled={isLoading}
                />
              </div>
              <Button 
                type="submit" 
                variant="hero" 
                size="icon"
                className="h-12 w-12 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
                disabled={!input.trim() || isLoading}
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </Card>

        {/* Quick Prompts */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span className="font-medium">Suggested questions</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickPrompts.map(({ text, icon: Icon }) => (
              <Button
                key={text}
                variant="glass"
                size="sm"
                className="text-xs justify-start gap-2 hover:border-primary/40 hover:bg-primary/5 transition-all h-auto py-2.5 px-3"
                onClick={() => sendMessage(text)}
                disabled={isLoading}
              >
                <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-left">{text}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AICoach;
