import { Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const messages = [
  {
    role: "user",
    content: "What should I eat before my morning workout?",
  },
  {
    role: "assistant",
    content: "For optimal energy, have a light snack 30-60 minutes before: a banana with almond butter, or Greek yogurt with berries. This provides quick carbs for energy and protein to prevent muscle breakdown.",
  },
];

const AICoachPreview = () => {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Chat Preview */}
            <div className={cn(
              "p-6 rounded-2xl order-2 lg:order-1",
              "bg-card/50 backdrop-blur-sm",
              "border border-border/40"
            )}>
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-5 border-b border-border/40 mb-5">
                <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground tracking-tight">LIVANA Coach</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "flex-row-reverse" : ""
                    )}
                  >
                    <div className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                      message.role === "user" ? "bg-primary/15" : "bg-muted"
                    )}>
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-primary" />
                      ) : (
                        <Bot className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className={cn(
                      "flex-1 p-4 rounded-xl text-sm leading-relaxed",
                      message.role === "user"
                        ? "bg-primary/10 text-foreground border border-primary/20"
                        : "bg-muted/50 text-foreground border border-border/40"
                    )}>
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="mt-5 pt-5 border-t border-border/40">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/40">
                  <input
                    type="text"
                    placeholder="Ask your AI coach anything..."
                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                    readOnly
                  />
                  <button className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center hover:bg-primary/25 transition-colors">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">AI Coach</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-5 tracking-tight">
                Your Personal<br />
                <span className="text-gradient">Nutrition Expert</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                Get instant answers to all your nutrition questions. Our AI coach understands your goals and provides personalized, science-backed advice 24/7.
              </p>

              <ul className="space-y-4">
                {[
                  "Instant answers to nutrition questions",
                  "Personalized recommendations based on your goals",
                  "Science-backed advice from latest research",
                  "Available 24/7, no appointments needed"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICoachPreview;
