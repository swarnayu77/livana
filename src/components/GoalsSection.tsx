import { useState } from "react";
import { Target, TrendingDown, Dumbbell, Heart, Leaf, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const goals = [
  { id: "weight-loss", icon: TrendingDown, title: "Weight Loss", description: "Sustainable fat loss with balanced nutrition", details: "Our AI creates calorie-deficit meal plans while ensuring you get all essential nutrients. Expect to lose 0.5-1kg per week safely." },
  { id: "muscle-gain", icon: Dumbbell, title: "Muscle Building", description: "High-protein plans for lean muscle growth", details: "Optimize your protein intake with strategic meal timing. Perfect for those following strength training programs." },
  { id: "heart-health", icon: Heart, title: "Heart Health", description: "Mediterranean-style heart-healthy eating", details: "Focus on omega-3s, fiber, and antioxidants. Reduce sodium and saturated fats for optimal cardiovascular health." },
  { id: "plant-based", icon: Leaf, title: "Plant-Based", description: "Complete nutrition from plant sources", details: "Get all your essential amino acids, B12, iron, and omega-3s from carefully planned plant-based meals." },
  { id: "mental-clarity", icon: Brain, title: "Mental Clarity", description: "Brain-boosting foods for focus", details: "Enhance cognitive function with foods rich in omega-3s, antioxidants, and compounds that support brain health." },
];

const GoalsSection = () => {
  const [selected, setSelected] = useState(goals[0]);

  return (
    <section className="py-20 lg:py-28">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-4">
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

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Selector - 2 cols */}
        <div className="lg:col-span-2 space-y-2">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const active = selected.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelected(goal)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-150",
                  active
                    ? "bg-primary/8 border border-primary/25 shadow-sm"
                    : "bg-card/20 border border-transparent hover:bg-card/40"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                  active ? "bg-primary/15" : "bg-muted/50"
                )}>
                  <Icon className={cn("w-5 h-5 stroke-[1.5]", active ? "text-primary" : "text-muted-foreground")} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn("font-semibold text-sm", active ? "text-primary" : "text-foreground")}>{goal.title}</h4>
                  <p className="text-muted-foreground text-xs mt-0.5 truncate">{goal.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail - 3 cols */}
        <div className="lg:col-span-3 p-8 rounded-2xl bg-card/30 border border-border/25 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <selected.icon className="w-7 h-7 text-primary stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold text-foreground">{selected.title}</h3>
              <p className="text-sm text-muted-foreground mt-0.5">{selected.description}</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8">{selected.details}</p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-background flex items-center justify-center text-[10px] font-bold text-foreground">
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
