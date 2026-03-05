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
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);

  return (
    <section className="py-16 lg:py-24">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 mb-4">
          <Target className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary text-xs font-medium">Personalized Goals</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3 tracking-tight">
          Your Health, Your Way
        </h2>
        <p className="text-muted-foreground text-base max-w-lg mx-auto">
          Choose your primary health goal and let our AI tailor everything to your needs.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Selector */}
        <div className="space-y-1.5">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedGoal.id === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-150",
                  "border",
                  isSelected
                    ? "bg-primary/8 border-primary/30"
                    : "bg-card/20 border-border/30 hover:bg-card/50 hover:border-border/50"
                )}
              >
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                  isSelected ? "bg-primary/15" : "bg-muted/50"
                )}>
                  <Icon className={cn("w-4 h-4 stroke-[1.5]", isSelected ? "text-primary" : "text-muted-foreground")} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={cn("font-medium text-sm", isSelected ? "text-primary" : "text-foreground")}>{goal.title}</h4>
                  <p className="text-muted-foreground text-xs truncate">{goal.description}</p>
                </div>
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="p-6 rounded-xl bg-card/40 border border-border/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg bg-primary/12 flex items-center justify-center">
              <selectedGoal.icon className="w-5 h-5 text-primary stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-foreground tracking-tight">{selectedGoal.title}</h3>
              <p className="text-xs text-muted-foreground">{selectedGoal.description}</p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">{selectedGoal.details}</p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/25 to-accent/25 border-2 border-card flex items-center justify-center text-[10px] font-semibold text-foreground">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              <span className="text-primary font-semibold">2,000+</span> users with this goal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
