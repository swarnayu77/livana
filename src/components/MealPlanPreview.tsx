import { Utensils, Clock, Flame, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScrollAnimation, useStaggerAnimation } from "@/hooks/use-scroll-animation";

const meals = [
  { name: "Mediterranean Breakfast Bowl", time: "15 min", calories: 420, tags: ["High Protein", "Low Carb"] },
  { name: "Grilled Chicken Power Salad", time: "20 min", calories: 380, tags: ["Lean", "Fresh"] },
  { name: "Salmon with Roasted Vegetables", time: "35 min", calories: 520, tags: ["Omega-3", "Heart Healthy"] },
];

const MealPlanPreview = () => {
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation();
  const { ref: cardsRef, isVisible: cardsVisible, getItemStyle } = useStaggerAnimation(meals.length, 100);

  return (
    <section className="py-24 lg:py-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div
          ref={textRef}
          className={cn(
            "transition-all duration-600",
            textVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          )}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/6 border border-primary/8 mb-6">
            <Utensils className="w-3 h-3 text-primary" />
            <span className="text-primary text-[11px] font-medium">AI Meal Plans</span>
          </div>
          <h2 className="text-[28px] md:text-[32px] font-bold text-foreground tracking-[-0.025em] mb-4">
            Smart Meals,{" "}
            <span className="text-gradient">Zero Guesswork</span>
          </h2>
          <p className="text-muted-foreground text-[15px] leading-[1.7] mb-8 max-w-[440px]">
            Our AI analyzes your preferences, dietary needs, and goals to create perfectly balanced meal plans — in seconds.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {[{ v: "500+", l: "Recipes" }, { v: "30s", l: "To Generate" }, { v: "100%", l: "Personalized" }].map((s) => (
              <div key={s.l}>
                <p className="text-xl font-bold text-foreground tracking-tight">{s.v}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.12em] mt-1">{s.l}</p>
              </div>
            ))}
          </div>

          <Link to="/meal-plans">
            <Button variant="outline" className="rounded-lg text-[13px] h-10 px-5 font-medium group">
              Explore Meal Plans
              <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>

        <div ref={cardsRef} className="space-y-3">
          {meals.map((meal, i) => (
            <div
              key={meal.name}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/12 hover:shadow-[0_4px_20px_-8px_hsl(var(--primary)/0.1)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer group"
              style={getItemStyle(i)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-[14px] text-foreground group-hover:text-primary transition-colors duration-200">{meal.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-[12px] text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{meal.time}</span>
                    <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5" />{meal.calories} cal</span>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  {meal.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 text-[10px] rounded-md bg-primary/6 text-primary font-medium">{tag}</span>
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
