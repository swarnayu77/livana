import { useState } from "react";
import { Target, TrendingDown, Dumbbell, Heart, Leaf, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import ProgressRing from "@/components/ProgressRing";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const goals = [
  { id: "weight-loss", icon: TrendingDown, title: "Weight Loss", description: "Sustainable fat loss with balanced nutrition", details: "Our AI creates calorie-deficit meal plans while ensuring you get all essential nutrients. Expect to lose 0.5-1kg per week safely.", progress: 72, color: "hsl(var(--primary))" },
  { id: "muscle-gain", icon: Dumbbell, title: "Muscle Building", description: "High-protein plans for lean muscle growth", details: "Optimize your protein intake with strategic meal timing. Perfect for those following strength training programs.", progress: 85, color: "hsl(var(--accent))" },
  { id: "heart-health", icon: Heart, title: "Heart Health", description: "Mediterranean-style heart-healthy eating", details: "Focus on omega-3s, fiber, and antioxidants. Reduce sodium and saturated fats for optimal cardiovascular health.", progress: 65, color: "hsl(152 60% 55%)" },
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
          "text-center mb-14 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/12 mb-4">
          <Target className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary text-xs font-semibold">Personalized Goals</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight mb-4">
          Your Health, Your Way
        </h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto leading-relaxed">
          Choose your primary health goal and let our AI tailor everything to your needs.
        </p>
      </div>

      <div className={cn(
        "grid lg:grid-cols-5 gap-6 transition-all duration-700 delay-200",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <div className="lg:col-span-2 space-y-2">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const active = selected.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelected(goal)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-2xl text-left transition-all duration-300",
                  active
                    ? "bg-primary/8 border border-primary/15 shadow-sm scale-[1.02]"
                    : "bg-secondary/40 border border-transparent hover:bg-secondary/80 hover:scale-[1.01]"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300",
                  active ? "bg-primary text-primary-foreground scale-110 rotate-3" : "bg-secondary text-muted-foreground"
                )}>
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn("font-semibold text-sm transition-colors", active ? "text-primary" : "text-foreground")}>{goal.title}</h4>
                  <p className="text-muted-foreground text-xs mt-0.5 truncate">{goal.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-3 glass-card rounded-3xl p-8 flex flex-col justify-center transition-all duration-500">
          <div className="flex items-start gap-6 mb-6" key={selected.id}>
            <div className="animate-scale-in">
              <ProgressRing
                value={selected.progress}
                size={80}
                strokeWidth={7}
                color={selected.color}
                label={`${selected.progress}%`}
              />
            </div>
            <div className="flex-1 animate-fade-up" style={{ animationDuration: '0.4s' }}>
              <h3 className="text-xl font-display font-bold text-foreground">{selected.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{selected.description}</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">{selected.details}</p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              <span className="text-primary font-semibold">2,000+</span> people pursuing this goal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
