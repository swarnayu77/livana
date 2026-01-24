import { useState } from "react";
import { cn } from "@/lib/utils";
import { TrendingDown, Dumbbell, Heart, Activity, Brain, Leaf, Moon, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const goals = [
  {
    id: "weight-loss",
    icon: TrendingDown,
    title: "Weight Loss",
    description: "Calorie-conscious meal plans with high satiety foods and balanced nutrition for sustainable fat loss.",
    features: ["Calorie Deficit Plans", "High Protein Meals", "Appetite Control"],
    stat: "Avg 2kg/month",
  },
  {
    id: "muscle-gain",
    icon: Dumbbell,
    title: "Muscle Gain",
    description: "Protein-rich plans optimized for muscle synthesis, with strategic carb timing for performance.",
    features: ["High Protein", "Pre/Post Workout", "Calorie Surplus"],
    stat: "Optimal Macros",
  },
  {
    id: "diabetes",
    icon: Heart,
    title: "Diabetes-Friendly",
    description: "Low glycemic meals designed to maintain stable blood sugar with nutrient-dense ingredients.",
    features: ["Low GI Foods", "Blood Sugar Control", "Balanced Carbs"],
    stat: "Stable Glucose",
  },
  {
    id: "fitness",
    icon: Activity,
    title: "General Fitness",
    description: "Balanced nutrition to fuel your active lifestyle with optimal energy and recovery support.",
    features: ["Energy Balance", "Recovery Support", "Flexibility"],
    stat: "Peak Energy",
  },
  {
    id: "mental-clarity",
    icon: Brain,
    title: "Mental Clarity",
    description: "Brain-boosting foods rich in omega-3s, antioxidants, and nutrients for cognitive performance.",
    features: ["Brain Foods", "Focus Support", "Mood Balance"],
    stat: "Better Focus",
  },
  {
    id: "plant-based",
    icon: Leaf,
    title: "Plant-Based",
    description: "Complete plant-based nutrition ensuring all essential amino acids and micronutrients.",
    features: ["Vegan Meals", "Complete Protein", "B12 & Iron"],
    stat: "100% Plant",
  },
  {
    id: "better-sleep",
    icon: Moon,
    title: "Better Sleep",
    description: "Evening meals and timing strategies to promote restful sleep and recovery.",
    features: ["Sleep-Friendly", "Magnesium Rich", "Timing Guide"],
    stat: "Quality Rest",
  },
  {
    id: "energy-boost",
    icon: Zap,
    title: "Energy Boost",
    description: "Sustained energy throughout the day with balanced meals and strategic snacking.",
    features: ["Steady Energy", "No Crashes", "Smart Snacks"],
    stat: "All-Day Power",
  },
];

const GoalsSection = () => {
  const [selectedGoal, setSelectedGoal] = useState("weight-loss");
  const selectedGoalData = goals.find(g => g.id === selectedGoal);

  return (
    <section id="goals" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 tracking-tight">
            Choose Your <span className="text-gradient">Goal</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            LIVANA adapts all recommendations to your specific health and fitness goals.
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => setSelectedGoal(goal.id)}
              className={cn(
                "group relative p-4 md:p-6 rounded-2xl text-left transition-all duration-500",
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
                  "w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 transition-colors",
                  selectedGoal === goal.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary group-hover:bg-primary/20"
                )}
              >
                <goal.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>

              <h3 className="text-sm md:text-lg font-heading font-semibold mb-1 md:mb-2">{goal.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-none">
                {goal.description}
              </p>
              
              {/* Stat badge */}
              <div className="mt-3 hidden md:block">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {goal.stat}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Goal Details */}
        {selectedGoalData && (
          <div className="max-w-3xl mx-auto glass-strong rounded-2xl p-6 md:p-8 border border-primary/30">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                    <selectedGoalData.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-bold">{selectedGoalData.title}</h3>
                    <span className="text-sm text-primary">{selectedGoalData.stat}</span>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">{selectedGoalData.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedGoalData.features.map((feature) => (
                    <span 
                      key={feature}
                      className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <Link to="/goals">
                  <Button variant="hero" size="lg" className="group w-full md:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GoalsSection;
