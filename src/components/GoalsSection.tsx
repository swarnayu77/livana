import { useState } from "react";
import { Target, TrendingDown, Dumbbell, Heart, Leaf, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressRing from "@/components/ProgressRing";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const goals = [
  { id: "weight-loss", icon: TrendingDown, title: "Weight Loss", description: "Sustainable fat loss with balanced nutrition", details: "Our AI creates calorie-deficit meal plans while ensuring you get all essential nutrients. Expect to lose 0.5-1kg per week safely.", progress: 72, color: "hsl(var(--primary))" },
  { id: "muscle-gain", icon: Dumbbell, title: "Muscle Building", description: "High-protein plans for lean muscle growth", details: "Optimize your protein intake with strategic meal timing. Perfect for those following strength training programs.", progress: 85, color: "hsl(var(--accent))" },
  { id: "heart-health", icon: Heart, title: "Heart Health", description: "Mediterranean-style heart-healthy eating", details: "Focus on omega-3s, fiber, and antioxidants. Reduce sodium and saturated fats for optimal cardiovascular health.", progress: 65, color: "hsl(152 55% 52%)" },
  { id: "plant-based", icon: Leaf, title: "Plant-Based", description: "Complete nutrition from plant sources", details: "Get all your essential amino acids, B12, iron, and omega-3s from carefully planned plant-based meals.", progress: 90, color: "hsl(var(--primary))" },
  { id: "mental-clarity", icon: Brain, title: "Mental Clarity", description: "Brain-boosting foods for focus", details: "Enhance cognitive function with foods rich in omega-3s, antioxidants, and compounds that support brain health.", progress: 58, color: "hsl(var(--accent))" },
];

const GoalsSection = () => {
  const [selected, setSelected] = useState(goals[0]);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 lg:py-28">
      <div
        ref={ref}
        className={cn(
          "text-center mb-12 transition-all duration-600",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/6 border border-primary/10 mb-4">
          <Target className="w-3 h-3 text-primary" />
          <span className="text-primary text-[11px] font-semibold">Personalized Goals</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
          Your Health, Your Way
        </h2>
        <p className="text-muted-foreground text-[14px] max-w-md mx-auto leading-relaxed">
          Choose your primary health goal and let our AI tailor everything to your needs.
        </p>
      </div>

      <div className={cn(
        "grid lg:grid-cols-5 gap-5 transition-all duration-600 delay-150",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}>
        <div className="lg:col-span-2 space-y-1.5">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const active = selected.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelected(goal)}
                className={cn(
                  "w-full flex items-center gap-3 p-3.5 rounded-xl text-left transition-all duration-200",
                  active
                    ? "bg-primary/6 border border-primary/12"
                    : "bg-card border border-border hover:border-primary/10 hover:bg-muted/30"
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200",
                  active ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn("font-semibold text-[13px] transition-colors", active ? "text-primary" : "text-foreground")}>{goal.title}</h4>
                  <p className="text-muted-foreground text-[11px] mt-0.5 truncate">{goal.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-7 flex flex-col justify-center transition-all duration-400">
          <div className="flex items-start gap-5 mb-5" key={selected.id}>
            <div className="animate-scale-in">
              <ProgressRing
                value={selected.progress}
                size={72}
                strokeWidth={6}
                color={selected.color}
                label={`${selected.progress}%`}
              />
            </div>
            <div className="flex-1 animate-fade-up" style={{ animationDuration: '0.35s' }}>
              <h3 className="text-lg font-bold text-foreground">{selected.title}</h3>
              <p className="text-[13px] text-muted-foreground mt-0.5">{selected.description}</p>
            </div>
          </div>
          <p className="text-muted-foreground text-[13px] leading-relaxed mb-6">{selected.details}</p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-primary/8 border-2 border-card flex items-center justify-center text-[9px] font-bold text-primary">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-[12px] text-muted-foreground">
              <span className="text-primary font-semibold">2,000+</span> pursuing this goal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
