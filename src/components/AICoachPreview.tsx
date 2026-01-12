import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send, Bot, User } from "lucide-react";
import fitnessBg from "@/assets/fitness-bg.jpg";

const sampleMessages = [
  {
    role: "user",
    content: "What should I eat before my morning workout?",
  },
  {
    role: "assistant",
    content: "Great question! For a morning workout, aim for a light meal 30-60 minutes before. Try a banana with a tablespoon of almond butter, or Greek yogurt with berries. These provide quick energy without feeling heavy. Stay hydrated too!",
  },
  {
    role: "user",
    content: "I'm trying to build muscle. How much protein do I need?",
  },
  {
    role: "assistant",
    content: "For muscle building, aim for 1.6-2.2g of protein per kg of body weight daily. Spread it across 4-5 meals for optimal absorption. Good sources: chicken, fish, eggs, legumes, and dairy. I can create a high-protein meal plan for you!",
  },
];

const AICoachPreview = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <section id="ai-coach" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={fitnessBg}
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chat Preview */}
          <div className="order-2 lg:order-1">
            <div className="glass-strong rounded-2xl overflow-hidden max-w-lg mx-auto lg:mx-0">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">LIVANA Coach</h4>
                  <p className="text-xs text-muted-foreground">Your AI Nutrition Assistant</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-4 h-80 overflow-y-auto">
                {sampleMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-3 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask about nutrition, meals, or fitness..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground"
                  />
                  <Button variant="hero" size="icon" className="rounded-xl h-12 w-12">
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Your Personal <span className="text-gradient">AI Coach</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Chat with LIVANA anytime for nutrition advice, meal suggestions, 
              and motivation. Like having a nutritionist in your pocket.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Ask Anything</h4>
                  <p className="text-sm text-muted-foreground">
                    Questions about portions, timing, ingredients, or alternatives.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Get Smart Answers</h4>
                  <p className="text-sm text-muted-foreground">
                    Personalized advice based on your goals and preferences.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Build Better Habits</h4>
                  <p className="text-sm text-muted-foreground">
                    Encouraging guidance for long-term, sustainable health.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICoachPreview;
