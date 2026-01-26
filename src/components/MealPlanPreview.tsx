import { Button } from "@/components/ui/button";
import { Clock, Flame, Sparkles } from "lucide-react";
import mealBowl from "@/assets/meal-bowl.jpg";

const meals = [
  {
    type: "Breakfast",
    name: "Protein Power Bowl",
    calories: 420,
    time: "15 min",
    macros: { protein: 28, carbs: 45, fat: 14 },
  },
  {
    type: "Lunch",
    name: "Mediterranean Quinoa Salad",
    calories: 520,
    time: "20 min",
    macros: { protein: 22, carbs: 58, fat: 18 },
  },
  {
    type: "Dinner",
    name: "Grilled Salmon & Vegetables",
    calories: 580,
    time: "25 min",
    macros: { protein: 42, carbs: 32, fat: 24 },
  },
  {
    type: "Snack",
    name: "Greek Yogurt Parfait",
    calories: 220,
    time: "5 min",
    macros: { protein: 15, carbs: 28, fat: 6 },
  },
];

const MealPlanPreview = () => {
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <section id="meal-plans" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-hero mb-5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground/80">AI-Generated Daily Plan</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 tracking-tight">
              Personalized <span className="text-gradient">Meal Plans</span>
            </h2>
            <p className="text-muted-foreground text-base mb-6">
              Get daily meal plans tailored to your goals, with balanced macros, 
              calorie estimates, and easy-to-follow recipes.
            </p>

            {/* Meals List */}
            <div className="space-y-2.5 mb-6">
              {meals.map((meal, index) => (
                <div
                  key={meal.type}
                  className="glass rounded-lg p-3 flex items-center justify-between hover:border-primary/20 transition-all"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wide">
                      {meal.type}
                    </span>
                    <h4 className="text-sm font-semibold">{meal.name}</h4>
                    <div className="flex items-center gap-2.5 mt-0.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" /> {meal.calories} cal
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {meal.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground space-y-0.5">
                    <div>P: {meal.macros.protein}g</div>
                    <div>C: {meal.macros.carbs}g</div>
                    <div>F: {meal.macros.fat}g</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="glass-strong rounded-lg p-3 flex items-center justify-between mb-6">
              <span className="text-sm font-semibold">Daily Total</span>
              <span className="text-gradient font-bold text-lg">{totalCalories} calories</span>
            </div>

            <Button variant="hero" size="default">
              Get Your Personalized Plan
            </Button>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/15 to-accent/15 rounded-2xl blur-xl" />
            <img
              src={mealBowl}
              alt="Healthy meal bowl"
              className="relative rounded-2xl shadow-xl shadow-primary/5 w-full max-w-md mx-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealPlanPreview;
