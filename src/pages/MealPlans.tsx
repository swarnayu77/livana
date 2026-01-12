import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Utensils, 
  Clock, 
  Flame, 
  Plus,
  Coffee,
  Sun,
  Moon,
  Apple
} from "lucide-react";

const mealPlan = {
  day: "Today",
  calories: 1850,
  targetCalories: 2000,
  meals: [
    {
      type: "Breakfast",
      icon: Coffee,
      time: "7:00 AM",
      name: "Avocado Toast with Poached Eggs",
      calories: 420,
      protein: 18,
      carbs: 35,
      fat: 24,
      tags: ["High Protein", "Fiber Rich"]
    },
    {
      type: "Lunch",
      icon: Sun,
      time: "12:30 PM",
      name: "Grilled Chicken Buddha Bowl",
      calories: 580,
      protein: 42,
      carbs: 48,
      fat: 22,
      tags: ["Balanced", "Meal Prep Friendly"]
    },
    {
      type: "Snack",
      icon: Apple,
      time: "3:30 PM",
      name: "Greek Yogurt with Berries & Nuts",
      calories: 280,
      protein: 15,
      carbs: 28,
      fat: 12,
      tags: ["Quick", "Probiotic"]
    },
    {
      type: "Dinner",
      icon: Moon,
      time: "7:00 PM",
      name: "Salmon with Roasted Vegetables",
      calories: 520,
      protein: 38,
      carbs: 25,
      fat: 28,
      tags: ["Omega-3", "Low Carb"]
    }
  ]
};

const MealPlans = () => {
  const calorieProgress = (mealPlan.calories / mealPlan.targetCalories) * 100;

  return (
    <PageLayout 
      title="Personalized Meal Plans" 
      subtitle="Daily plans tailored to your goals with balanced macronutrients and essential micronutrients."
    >
      {/* Summary Card */}
      <Card className="glass mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">{mealPlan.day}'s Plan</h3>
              <p className="text-muted-foreground">Based on your weight loss goal</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center gap-2 text-2xl font-bold text-primary">
                  <Flame className="w-5 h-5" />
                  {mealPlan.calories}
                </div>
                <p className="text-sm text-muted-foreground">of {mealPlan.targetCalories} kcal</p>
              </div>
              <div className="w-24 h-24 relative">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeDasharray={`${calorieProgress}, 100`}
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                  {Math.round(calorieProgress)}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meals Grid */}
      <div className="grid gap-4">
        {mealPlan.meals.map((meal, index) => (
          <Card 
            key={meal.type} 
            className="glass group hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <meal.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm text-muted-foreground">{meal.type}</span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {meal.time}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{meal.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {meal.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-primary font-medium">{meal.calories} kcal</span>
                    <span className="text-muted-foreground">P: {meal.protein}g</span>
                    <span className="text-muted-foreground">C: {meal.carbs}g</span>
                    <span className="text-muted-foreground">F: {meal.fat}g</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8">
        <Button variant="hero" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Custom Meal
        </Button>
        <Button variant="glass" className="gap-2">
          <Utensils className="w-4 h-4" />
          Generate New Plan
        </Button>
      </div>
    </PageLayout>
  );
};

export default MealPlans;
