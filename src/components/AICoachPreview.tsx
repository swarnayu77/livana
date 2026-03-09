import { Bot, User, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const messages = [
  { role: "user", content: "What should I eat before my morning workout?" },
  { role: "assistant", content: "For optimal energy, have a light snack 30-60 minutes before: a banana with almond butter, or Greek yogurt with berries. This provides quick carbs for energy and protein to prevent muscle breakdown." },
];

const AICoachPreview = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation();
  const { ref: chatRef, isVisible: chatVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div
          ref={textRef}
          className={cn(
            "transition-all duration-700",
            textVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          )}
        >
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
            {["Instant answers to nutrition questions", "Personalized recommendations for your goals", "Science-backed advice from latest research", "Available 24/7, no appointments needed"].map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
                style={{
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible ? "translateX(0)" : "translateX(-12px)",
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${300 + i * 80}ms`,
                }}
              >
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

        <div
          ref={chatRef}
          className={cn(
            "glass-card rounded-3xl p-6 transition-all duration-700 delay-150",
            chatVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"
          )}
        >
          <div className="flex items-center gap-3 pb-4 border-b border-border mb-5">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-foreground">Mr. Livana</h4>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15">
              <div className="relative">
                <span className="w-1.5 h-1.5 rounded-full bg-primary block" />
                <span className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              </div>
              <span className="text-[10px] font-semibold text-primary">10+ active</span>
            </div>
          </div>

          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
                style={{
                  opacity: chatVisible ? 1 : 0,
                  transform: chatVisible ? "translateY(0)" : "translateY(16px)",
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${400 + i * 200}ms`,
                }}
              >
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
              <button className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center hover:bg-primary/90 hover:scale-110 active:scale-95 transition-all duration-200">
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
