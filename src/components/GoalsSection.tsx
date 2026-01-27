import { useState } from "react";
import { Target, TrendingDown, Dumbbell, Heart, Leaf, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const goals = [
  {
    id: "weight-loss",
    icon: TrendingDown,
    title: "Weight Loss",
    description: "Sustainable fat loss with balanced nutrition",
    details: "Our AI creates calorie-deficit meal plans while ensuring you get all essential nutrients. Expect to lose 0.5-1kg per week safely."
  },
  {
    id: "muscle-gain",
    icon: Dumbbell,
    title: "Muscle Building",
    description: "High-protein plans for lean muscle growth",
    details: "Optimize your protein intake with strategic meal timing. Perfect for those following strength training programs."
  },
  {
    id: "heart-health",
    icon: Heart,
    title: "Heart Health",
    description: "Mediterranean-style heart-healthy eating",
    details: "Focus on omega-3s, fiber, and antioxidants. Reduce sodium and saturated fats for optimal cardiovascular health."
  },
  {
    id: "plant-based",
    icon: Leaf,
    title: "Plant-Based",
    description: "Complete nutrition from plant sources",
    details: "Get all your essential amino acids, B12, iron, and omega-3s from carefully planned plant-based meals."
  },
  {
    id: "mental-clarity",
    icon: Brain,
    title: "Mental Clarity",
    description: "Brain-boosting foods for focus",
    details: "Enhance cognitive function with foods rich in omega-3s, antioxidants, and compounds that support brain health."
  },
];

const GoalsSection = () => {
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Personalized Goals</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-5 tracking-tight">
            Your Health, Your Way
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Choose your primary health goal and let our AI tailor everything to your needs.
          </p>
        </div>

        {/* Goals Interactive Section */}
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Goal Selector */}
            <div className="space-y-2">
              {goals.map((goal) => {
                const Icon = goal.icon;
                const isSelected = selectedGoal.id === goal.id;
                
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl text-left",
                      "transition-all duration-200 ease-out",
                      "border",
                      isSelected 
                        ? "bg-primary/10 border-primary/40 shadow-lg shadow-primary/10" 
                        : "bg-card/30 border-border/40 hover:bg-card/60 hover:border-border"
                    )}
                  >
                    <div className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0",
                      "transition-colors duration-200",
                      isSelected ? "bg-primary/20" : "bg-muted"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5 stroke-[1.5]",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={cn(
                        "font-semibold text-base tracking-tight",
                        isSelected ? "text-primary" : "text-foreground"
                      )}>
                        {goal.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mt-0.5 truncate">
                        {goal.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-lg shadow-primary/50" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Selected Goal Details */}
            <div className={cn(
              "p-8 rounded-2xl",
              "bg-card/50 backdrop-blur-sm",
              "border border-border/40"
            )}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center">
                  <selectedGoal.icon className="w-7 h-7 text-primary stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-foreground tracking-tight">
                    {selectedGoal.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedGoal.description}</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {selectedGoal.details}
              </p>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 border-2 border-card flex items-center justify-center text-xs font-semibold text-foreground"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <span className="text-primary font-semibold">2,000+</span> users with this goal
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
