import { Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const messages = [
  { role: "user", content: "What should I eat before my morning workout?" },
  { role: "assistant", content: "For optimal energy, have a light snack 30-60 minutes before: a banana with almond butter, or Greek yogurt with berries. This provides quick carbs for energy and protein to prevent muscle breakdown." },
];

const AICoachPreview = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Chat */}
        <div className="p-5 rounded-xl bg-card/40 border border-border/30 order-2 lg:order-1">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border/30 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/12 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-sm text-foreground">LIVANA Coach</h4>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-2.5", msg.role === "user" ? "flex-row-reverse" : "")}>
                <div className={cn(
                  "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0",
                  msg.role === "user" ? "bg-primary/12" : "bg-muted/50"
                )}>
                  {msg.role === "user" ? <User className="w-3.5 h-3.5 text-primary" /> : <Bot className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
                <div className={cn(
                  "flex-1 p-3 rounded-lg text-xs leading-relaxed",
                  msg.role === "user" ? "bg-primary/8 text-foreground border border-primary/15" : "bg-muted/30 text-foreground border border-border/30"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border/30">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/20 border border-border/30">
              <input type="text" placeholder="Ask your AI coach..." className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none" readOnly />
              <button className="w-7 h-7 rounded-lg bg-primary/12 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 mb-4">
            <Bot className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-medium">AI Coach</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3 tracking-tight">
            Your Personal<br /><span className="text-gradient">Nutrition Expert</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-md">
            Get instant answers to all your nutrition questions. Personalized, science-backed advice 24/7.
          </p>
          <ul className="space-y-2.5">
            {["Instant answers to nutrition questions", "Personalized recommendations for your goals", "Science-backed advice from latest research", "Available 24/7, no appointments needed"].map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />{item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AICoachPreview;
