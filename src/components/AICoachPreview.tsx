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
    <section className="py-24 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div
          ref={textRef}
          className={cn(
            "transition-all duration-600",
            textVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          )}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/6 border border-primary/8 mb-6">
            <Bot className="w-3 h-3 text-primary" />
            <span className="text-primary text-[11px] font-medium">AI Coach</span>
          </div>
          <h2 className="text-[28px] md:text-[32px] font-bold text-foreground tracking-[-0.025em] mb-4">
            Your Personal{" "}
            <span className="text-gradient">Nutrition Expert</span>
          </h2>
          <p className="text-muted-foreground text-[15px] leading-[1.7] mb-8 max-w-[440px]">
            Get instant answers to all your nutrition questions. Personalized, science-backed advice available 24/7.
          </p>
          <ul className="space-y-3 mb-8">
            {["Instant answers to nutrition questions", "Personalized recommendations for your goals", "Science-backed advice from latest research", "Available 24/7, no appointments needed"].map((item, i) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[14px] text-muted-foreground"
                style={{
                  opacity: textVisible ? 1 : 0,
                  transform: textVisible ? "translateX(0)" : "translateX(-8px)",
                  transition: `all 0.4s ease ${200 + i * 60}ms`,
                }}
              >
                <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />{item}
              </li>
            ))}
          </ul>
          <Link to="/coach">
            <Button variant="outline" className="rounded-lg text-[13px] h-10 px-5 font-medium group">
              Try AI Coach
              <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        <div
          ref={chatRef}
          className={cn(
            "bg-card border border-border rounded-2xl p-6 transition-all duration-600 delay-100",
            chatVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-6 scale-[0.98]"
          )}
        >
          {/* Chat header */}
          <div className="flex items-center gap-3 pb-4 border-b border-border mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-[14px] text-foreground">Mr. Livana</h4>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-soft" />
                <span className="text-[11px] text-muted-foreground">Online</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/6 border border-primary/8">
              <span className="w-1 h-1 rounded-full bg-primary" />
              <span className="text-[9px] font-semibold text-primary">10+ active</span>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-3.5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
                style={{
                  opacity: chatVisible ? 1 : 0,
                  transform: chatVisible ? "translateY(0)" : "translateY(12px)",
                  transition: `all 0.4s ease ${300 + i * 150}ms`,
                }}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted/50"
                )}>
                  {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
                <div className={cn(
                  "flex-1 px-4 py-3 rounded-xl text-[13px] leading-[1.65]",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/30 text-foreground"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="mt-5 pt-4 border-t border-border">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-muted/25 border border-border">
              <input type="text" placeholder="Ask your AI coach..." className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none" readOnly />
              <button className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors duration-150">
                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICoachPreview;
