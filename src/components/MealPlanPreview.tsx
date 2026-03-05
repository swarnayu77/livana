import { Utensils, Clock, Flame, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const meals = [
  { name: "Mediterranean Breakfast Bowl", time: "15 min", calories: 420, tags: ["High Protein", "Low Carb"] },
  { name: "Grilled Chicken Power Salad", time: "20 min", calories: 380, tags: ["Lean", "Fresh"] },
  { name: "Salmon with Roasted Vegetables", time: "35 min", calories: 520, tags: ["Omega-3", "Heart Healthy"] },
];

const MealPlanPreview = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 border border-primary/15 mb-4">
            <Utensils className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-medium">AI Meal Plans</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3 tracking-tight">
            Smart Meals,<br /><span className="text-gradient">Zero Guesswork</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
            Our AI analyzes your preferences, dietary needs, and goals to create perfectly balanced meal plans.
          </p>
          <div className="flex items-center gap-6">
            {[{ v: "500+", l: "Recipes" }, { v: "30s", l: "To Generate" }, { v: "100%", l: "Personalized" }].map((s, i) => (
              <div key={s.l} className="text-center">
                <p className="text-xl font-bold text-gradient">{s.v}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {meals.map((meal) => (
            <div key={meal.name} className={cn(
              "p-4 rounded-lg bg-card/40 border border-border/30",
              "hover:bg-card/60 hover:border-primary/20 transition-all duration-150 cursor-pointer group"
            )}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{meal.name}</h4>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{meal.time}</span>
                    <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" />{meal.calories} cal</span>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {meal.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] rounded bg-primary/8 text-primary/70 border border-primary/15">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <Link to="/meal-plans" className="inline-flex items-center gap-1.5 text-primary hover:text-primary/80 text-xs font-medium transition-colors pt-1">
            <Leaf className="w-3.5 h-3.5" />View all meal plans →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MealPlanPreview;
