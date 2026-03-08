import { Utensils, Clock, Flame, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const meals = [
  { name: "Mediterranean Breakfast Bowl", time: "15 min", calories: 420, tags: ["High Protein", "Low Carb"] },
  { name: "Grilled Chicken Power Salad", time: "20 min", calories: 380, tags: ["Lean", "Fresh"] },
  { name: "Salmon with Roasted Vegetables", time: "35 min", calories: 520, tags: ["Omega-3", "Heart Healthy"] },
];

const MealPlanPreview = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 mb-5">
            <Utensils className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-semibold">AI Meal Plans</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight mb-4">
            Smart Meals,{" "}
            <span className="text-gradient">Zero Guesswork</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
            Our AI analyzes your preferences, dietary needs, and goals to create perfectly balanced meal plans — in seconds.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {[{ v: "500+", l: "Recipes" }, { v: "30s", l: "To Generate" }, { v: "100%", l: "Personalized" }].map((s) => (
              <div key={s.l}>
                <p className="text-xl font-bold text-gradient">{s.v}</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest mt-1">{s.l}</p>
              </div>
            ))}
          </div>

          <Link to="/meal-plans">
            <Button variant="heroOutline" size="default" className="rounded-xl text-sm group">
              Explore Meal Plans
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Right cards */}
        <div className="space-y-3">
          {meals.map((meal) => (
            <div key={meal.name} className={cn(
              "p-5 rounded-xl bg-card/30 border border-border/25",
              "hover:bg-card/50 hover:border-primary/20 transition-all duration-150 cursor-pointer group"
            )}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{meal.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{meal.time}</span>
                    <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5" />{meal.calories} cal</span>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  {meal.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-[10px] rounded-lg bg-primary/8 text-primary/80 border border-primary/15 font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MealPlanPreview;
