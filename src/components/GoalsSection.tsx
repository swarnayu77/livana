import { useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingDown, Dumbbell, Heart, Activity } from "lucide-react";

const goals = [
  {
    id: "weight-loss",
    icon: TrendingDown,
    title: "Weight Loss",
    description: "Calorie-conscious meal plans with high satiety foods and balanced nutrition for sustainable fat loss.",
    color: "primary",
  },
  {
    id: "muscle-gain",
    icon: Dumbbell,
    title: "Muscle Gain",
    description: "Protein-rich plans optimized for muscle synthesis, with strategic carb timing for performance.",
    color: "accent",
  },
  {
    id: "diabetes",
    icon: Heart,
    title: "Diabetes-Friendly",
    description: "Low glycemic meals designed to maintain stable blood sugar with nutrient-dense ingredients.",
    color: "primary",
  },
  {
    id: "fitness",
    icon: Activity,
    title: "General Fitness",
    description: "Balanced nutrition to fuel your active lifestyle with optimal energy and recovery support.",
    color: "accent",
  },
];

const GoalsSection = () => {
  const [selectedGoal, setSelectedGoal] = useState("weight-loss");

  return (
    <section id="goals" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your <span className="text-gradient">Goal</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            LIVANA adapts all recommendations to your specific health and fitness goals.
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={cn(
                "group relative p-6 rounded-2xl text-left transition-all duration-500",
                "border border-border hover:border-primary/50",
                selectedGoal === goal.id
                  ? "glass-strong border-primary glow-primary"
                  : "glass hover:-translate-y-1"
              )}
            >
              {/* Selected Indicator */}
              {selectedGoal === goal.id && (
                <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary animate-pulse" />
              )}

              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                  selectedGoal === goal.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary group-hover:bg-primary/20"
                )}
              >
                <goal.icon className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-semibold mb-2">{goal.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {goal.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoalsSection;
