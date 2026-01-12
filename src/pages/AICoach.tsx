import { useState, useRef, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Bot, 
  User,
  Sparkles,
  Lightbulb
} from "lucide-react";

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

const AICoach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI nutrition coach. 🌿 I'm here to help you make healthier food choices, understand your nutrition needs, and reach your goals. What would you like to know about nutrition today?",
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

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(text),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("workout") || lowerQuery.includes("exercise")) {
      return "Great question! Before a workout, aim to eat 1-2 hours prior. Focus on easily digestible carbs for energy and moderate protein. Good options include:\n\n• Banana with almond butter\n• Greek yogurt with berries\n• Oatmeal with honey\n• Whole grain toast with eggs\n\nAvoid high-fat or high-fiber foods right before exercise as they can cause discomfort. Stay hydrated! 💪";
    }
    
    if (lowerQuery.includes("protein")) {
      return "Increasing protein intake is a smart goal! Here are some tips:\n\n• Start your day with eggs or Greek yogurt\n• Add chicken, fish, or legumes to lunch and dinner\n• Snack on cottage cheese, edamame, or protein bars\n• Consider a protein shake post-workout\n\nFor your weight loss goal, aim for about 1.6-2.2g of protein per kg of body weight. This helps preserve muscle while losing fat! 🥗";
    }
    
    if (lowerQuery.includes("fasting") || lowerQuery.includes("intermittent")) {
      return "Intermittent fasting can be effective for some people! The most popular methods are:\n\n• 16:8 (fast 16 hours, eat in 8-hour window)\n• 5:2 (eat normally 5 days, restrict 2 days)\n\nBased on your goals, 16:8 might work well. However, it's important to maintain adequate nutrition during eating windows. Would you like me to suggest a meal plan that fits this approach? 🕐";
    }
    
    if (lowerQuery.includes("snack") || lowerQuery.includes("calories")) {
      return "Here are some healthy snacks under 200 calories:\n\n• Apple with 1 tbsp peanut butter (180 kcal)\n• 1 cup Greek yogurt (120 kcal)\n• Handful of almonds (160 kcal)\n• Cottage cheese with cucumber (100 kcal)\n• Hard-boiled egg (70 kcal)\n• Baby carrots with hummus (150 kcal)\n\nThese provide good nutrition while keeping you satisfied between meals! 🍎";
    }
    
    return "That's a great question! Based on your goal of weight loss while maintaining muscle, I'd recommend focusing on:\n\n• Adequate protein at each meal\n• Plenty of vegetables for fiber and nutrients\n• Complex carbs for sustained energy\n• Healthy fats in moderation\n\nWould you like specific meal suggestions or want to explore any of these areas further? I'm here to help! 🌱";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <PageLayout 
      title="AI Nutrition Coach" 
      subtitle="Chat with your personal nutrition assistant for guidance on food choices and healthy habits."
    >
      <div className="max-w-3xl mx-auto">
        {/* Chat Container */}
        <Card className="glass overflow-hidden">
          {/* Messages */}
          <ScrollArea className="h-[500px] p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === "assistant" 
                      ? "bg-primary/20" 
                      : "bg-accent/20"
                  }`}>
                    {message.role === "assistant" ? (
                      <Bot className="w-4 h-4 text-primary" />
                    ) : (
                      <User className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "assistant"
                      ? "bg-muted/50 rounded-tl-sm"
                      : "bg-primary text-primary-foreground rounded-tr-sm"
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-100" />
                      <span className="w-2 h-2 rounded-full bg-primary/50 animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border/50 p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about nutrition, meals, or healthy habits..."
                className="flex-1 bg-muted/50 border-border/50 focus:border-primary"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                variant="hero" 
                size="icon"
                disabled={!input.trim() || isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>

        {/* Quick Prompts */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Lightbulb className="w-4 h-4" />
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
