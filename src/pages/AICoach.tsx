import { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  User,
  Lightbulb,
  Sparkles,
  Leaf
} from "lucide-react";
import livanaLogo from "@/assets/livana-logo.png";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const quickPrompts = [
  "What should I eat before a workout?",
  "How can I increase my protein intake?",
  "Is intermittent fasting right for me?",
  "Suggest a healthy snack under 200 calories"
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
    // Simple markdown-like formatting
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
        <Card className="glass mb-6 p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-primary/50">
                <AvatarImage src={livanaLogo} alt="Mr. Livana" />
                <AvatarFallback className="bg-primary/20">
                  <Leaf className="w-8 h-8 text-primary" />
                </AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-background" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold">Mr. Livana</h3>
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">AI Nutrition Expert • Always here to help</p>
            </div>
          </div>
        </Card>

        {/* Chat Container */}
        <Card className="glass overflow-hidden">
          {/* Messages */}
          <ScrollArea className="h-[450px] p-6" ref={scrollRef}>
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {message.role === "assistant" ? (
                    <Avatar className="w-10 h-10 shrink-0 border border-primary/30">
                      <AvatarImage src={livanaLogo} alt="Mr. Livana" />
                      <AvatarFallback className="bg-primary/20">
                        <Leaf className="w-5 h-5 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                  )}
                  <div className={`max-w-[75%] ${message.role === "user" ? "text-right" : ""}`}>
                    {message.role === "assistant" && (
                      <p className="text-xs text-primary font-medium mb-1">Mr. Livana</p>
                    )}
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.role === "assistant"
                        ? "bg-muted/50 rounded-tl-sm text-left"
                        : "bg-primary text-primary-foreground rounded-tr-sm"
                    }`}>
                      <p 
                        className="text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 border border-primary/30">
                    <AvatarImage src={livanaLogo} alt="Mr. Livana" />
                    <AvatarFallback className="bg-primary/20">
                      <Leaf className="w-5 h-5 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-primary font-medium mb-1">Mr. Livana</p>
                    <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex items-center gap-2">
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

          {/* Input */}
          <div className="border-t border-border/50 p-4 bg-muted/20">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Mr. Livana about nutrition, meals, or healthy habits..."
                className="flex-1 bg-background/50 border-border/50 focus:border-primary h-12"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                variant="hero" 
                size="icon"
                className="h-12 w-12"
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
            <span>Try asking:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <Button
                key={prompt}
                variant="glass"
                size="sm"
                className="text-xs hover:border-primary/40 hover:bg-primary/10 transition-all"
                onClick={() => sendMessage(prompt)}
                disabled={isLoading}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AICoach;
