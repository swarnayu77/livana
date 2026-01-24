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
    <section id="meal-plans" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-primary/4 rounded-full blur-3xl animate-float-subtle" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-hero mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/80">AI-Generated Daily Plan</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 tracking-tight">
              Personalized <span className="text-gradient">Meal Plans</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Get daily meal plans tailored to your goals, with balanced macros, 
              calorie estimates, and easy-to-follow recipes.
            </p>

            {/* Meals List */}
            <div className="space-y-3 mb-8">
              {meals.map((meal, index) => (
                <div
                  key={meal.type}
                  className="glass rounded-xl p-4 flex items-center justify-between hover:border-primary/30 transition-all"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wide">
                      {meal.type}
                    </span>
                    <h4 className="font-semibold">{meal.name}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Flame className="w-3 h-3" /> {meal.calories} cal
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {meal.time}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <div>P: {meal.macros.protein}g</div>
                    <div>C: {meal.macros.carbs}g</div>
                    <div>F: {meal.macros.fat}g</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="glass-strong rounded-xl p-4 flex items-center justify-between mb-8">
              <span className="font-semibold">Daily Total</span>
              <span className="text-gradient font-bold text-xl">{totalCalories} calories</span>
            </div>

            <Button variant="hero" size="lg">
              Get Your Personalized Plan
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
            <img
              src={mealBowl}
              alt="Healthy meal bowl"
              className="relative rounded-3xl shadow-2xl shadow-primary/10 w-full object-cover animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealPlanPreview;
