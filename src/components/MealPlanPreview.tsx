import { Utensils, Clock, Flame, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const meals = [
  {
    name: "Mediterranean Breakfast Bowl",
    time: "15 min",
    calories: 420,
    tags: ["High Protein", "Low Carb"],
  },
  {
    name: "Grilled Chicken Power Salad",
    time: "20 min",
    calories: 380,
    tags: ["Lean", "Fresh"],
  },
  {
    name: "Salmon with Roasted Vegetables",
    time: "35 min",
    calories: 520,
    tags: ["Omega-3", "Heart Healthy"],
  },
];

const MealPlanPreview = () => {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-5">
                <Utensils className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">AI Meal Plans</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-5 tracking-tight">
                Smart Meals,<br />
                <span className="text-gradient">Zero Guesswork</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                Our AI analyzes your preferences, dietary needs, and goals to create perfectly balanced meal plans. Every recipe is optimized for nutrition and taste.
              </p>
              
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">500+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Recipes</p>
                </div>
                <div className="w-px h-12 bg-border/50" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">30s</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">To Generate</p>
                </div>
                <div className="w-px h-12 bg-border/50" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-gradient">100%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Personalized</p>
                </div>
              </div>
            </div>

            {/* Meal Cards Preview */}
            <div className="space-y-4">
              {meals.map((meal, index) => (
                <div
                  key={meal.name}
                  className={cn(
                    "p-5 rounded-xl",
                    "bg-card/60 backdrop-blur-sm",
                    "border border-border/40",
                    "hover:bg-card/80 hover:border-primary/30",
                    "hover:shadow-lg hover:shadow-primary/5",
                    "transition-all duration-300 ease-out",
                    "cursor-pointer group"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors tracking-tight">
                        {meal.name}
                      </h4>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {meal.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Flame className="w-4 h-4" />
                          {meal.calories} cal
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {meal.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-lg bg-primary/10 text-primary/80 border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* CTA */}
              <div className="pt-3">
                <Link 
                  to="/meal-plans" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  <Leaf className="w-4 h-4" />
                  View all meal plans →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealPlanPreview;
