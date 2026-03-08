import { Bot, User, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const messages = [
  { role: "user", content: "What should I eat before my morning workout?" },
  { role: "assistant", content: "For optimal energy, have a light snack 30-60 minutes before: a banana with almond butter, or Greek yogurt with berries. This provides quick carbs for energy and protein to prevent muscle breakdown." },
];

const AICoachPreview = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/12 mb-5">
            <Bot className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-semibold">AI Coach</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight mb-4">
            Your Personal{" "}
            <span className="text-gradient">Nutrition Expert</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
            Get instant answers to all your nutrition questions. Personalized, science-backed advice available 24/7.
          </p>
          <ul className="space-y-3 mb-8">
            {["Instant answers to nutrition questions", "Personalized recommendations for your goals", "Science-backed advice from latest research", "Available 24/7, no appointments needed"].map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />{item}
              </li>
            ))}
          </ul>
          <Link to="/coach">
            <Button variant="outline" size="default" className="rounded-full text-sm group">
              Try AI Coach
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border mb-5">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-foreground">LIVANA Coach</h4>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}>
                <div className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary"
                )}>
                  {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-muted-foreground" />}
                </div>
                <div className={cn(
                  "flex-1 p-4 rounded-2xl text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-border">
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-secondary/60 border border-border">
              <input type="text" placeholder="Ask your AI coach..." className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none" readOnly />
              <button className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICoachPreview;
