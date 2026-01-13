import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Utensils, 
  Clock, 
  Flame, 
  Plus,
  Coffee,
  Sun,
  Moon,
  Apple,
  ChevronRight,
  RefreshCw,
  Heart,
  Sparkles,
  Droplet,
  Zap
} from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mealPlans = {
  today: {
    day: "Today",
    date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    calories: 1850,
    targetCalories: 2000,
    protein: 113,
    targetProtein: 120,
    carbs: 180,
    targetCarbs: 200,
    fat: 68,
    targetFat: 70,
    water: 6,
    targetWater: 8,
    meals: [
      {
        type: "Breakfast",
        icon: Coffee,
        time: "7:00 AM",
        name: "Avocado Toast with Poached Eggs",
        description: "Whole grain toast topped with mashed avocado, two poached eggs, and microgreens",
        calories: 420,
        protein: 18,
        carbs: 35,
        fat: 24,
        tags: ["High Protein", "Fiber Rich"],
        isCompleted: true
      },
      {
        type: "Lunch",
        icon: Sun,
        time: "12:30 PM",
        name: "Grilled Chicken Buddha Bowl",
        description: "Quinoa base with grilled chicken, roasted vegetables, hummus, and tahini dressing",
        calories: 580,
        protein: 42,
        carbs: 48,
        fat: 22,
        tags: ["Balanced", "Meal Prep Friendly"],
        isCompleted: true
      },
      {
        type: "Snack",
        icon: Apple,
        time: "3:30 PM",
        name: "Greek Yogurt with Berries & Nuts",
        description: "Low-fat Greek yogurt with mixed berries, honey, and a sprinkle of almonds",
        calories: 280,
        protein: 15,
        carbs: 28,
        fat: 12,
        tags: ["Quick", "Probiotic"],
        isCompleted: false
      },
      {
        type: "Dinner",
        icon: Moon,
        time: "7:00 PM",
        name: "Salmon with Roasted Vegetables",
        description: "Wild-caught salmon fillet with roasted asparagus, sweet potato, and lemon herb sauce",
        calories: 520,
        protein: 38,
        carbs: 25,
        fat: 28,
        tags: ["Omega-3", "Low Carb"],
        isCompleted: false
      }
    ]
  }
};

const nutritionTips = [
  "💡 Try adding spinach to your smoothies — you won't taste it but you'll get iron and vitamins!",
  "🥤 Drink a glass of water before each meal to stay hydrated and manage portions.",
  "🥗 Aim for half your plate to be vegetables at lunch and dinner.",
  "⏰ Eating protein within 30 mins after workout helps muscle recovery."
];

const MealPlans = () => {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState(3); // Thursday
  const [completedMeals, setCompletedMeals] = useState<string[]>(["Breakfast", "Lunch"]);
  
  const plan = mealPlans.today;
  const calorieProgress = (plan.calories / plan.targetCalories) * 100;
  const proteinProgress = (plan.protein / plan.targetProtein) * 100;
  const carbsProgress = (plan.carbs / plan.targetCarbs) * 100;
  const fatProgress = (plan.fat / plan.targetFat) * 100;
  const waterProgress = (plan.water / plan.targetWater) * 100;

  const toggleMealComplete = (mealType: string) => {
    setCompletedMeals(prev => 
      prev.includes(mealType) ? prev.filter(m => m !== mealType) : [...prev, mealType]
    );
    toast({
      title: completedMeals.includes(mealType) ? "Meal unmarked" : "Meal completed! 🎉",
      description: completedMeals.includes(mealType) 
        ? `${mealType} removed from completed` 
        : `Great job completing your ${mealType.toLowerCase()}!`,
    });
  };

  const randomTip = nutritionTips[Math.floor(Math.random() * nutritionTips.length)];

  return (
    <PageLayout 
      title="Personalized Meal Plans" 
      subtitle="AI-generated daily plans tailored to your goals with balanced macros and micronutrients."
    >
      {/* Week Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {weekDays.map((day, index) => (
          <Button
            key={day}
            variant={selectedDay === index ? "hero" : "glass"}
            size="sm"
            onClick={() => setSelectedDay(index)}
            className={`min-w-[60px] ${selectedDay === index ? "" : "hover:border-primary/40"}`}
          >
            {day}
          </Button>
        ))}
      </div>

      <Tabs defaultValue="meals" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto glass">
          <TabsTrigger value="meals">Today's Meals</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="meals" className="space-y-6">
          {/* Summary Card */}
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{plan.date}</h3>
                  <p className="text-muted-foreground">Optimized for your weight loss goal</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-3xl font-bold text-primary">
                      <Flame className="w-6 h-6" />
                      {plan.calories}
                    </div>
                    <p className="text-sm text-muted-foreground">of {plan.targetCalories} kcal</p>
                  </div>
                  <div className="w-20 h-20 relative">
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
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                      {Math.round(calorieProgress)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meals Grid */}
          <div className="grid gap-4">
            {plan.meals.map((meal) => {
              const isComplete = completedMeals.includes(meal.type);
              return (
                <Card 
                  key={meal.type} 
                  className={`glass group hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 cursor-pointer ${
                    isComplete ? "border-primary/30 bg-primary/5" : ""
                  }`}
                  onClick={() => toggleMealComplete(meal.type)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                        isComplete ? "bg-primary/30" : "bg-primary/10 group-hover:bg-primary/20"
                      }`}>
                        <meal.icon className={`w-7 h-7 ${isComplete ? "text-primary" : "text-primary"}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-medium text-primary">{meal.type}</span>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {meal.time}
                          </span>
                          {isComplete && (
                            <Badge className="bg-primary/20 text-primary text-xs">Completed ✓</Badge>
                          )}
                        </div>
                        <h3 className={`text-lg font-semibold mb-1 group-hover:text-primary transition-colors ${
                          isComplete ? "text-primary" : ""
                        }`}>
                          {meal.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{meal.description}</p>
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
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Custom Meal
            </Button>
            <Button variant="glass" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Regenerate Plan
            </Button>
            <Button variant="glass" className="gap-2">
              <Heart className="w-4 h-4" />
              Save Plan
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-6">
          {/* Macro Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Macros Today
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Protein</span>
                    <span className="text-sm text-muted-foreground">{plan.protein}g / {plan.targetProtein}g</span>
                  </div>
                  <Progress value={proteinProgress} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Carbohydrates</span>
                    <span className="text-sm text-muted-foreground">{plan.carbs}g / {plan.targetCarbs}g</span>
                  </div>
                  <Progress value={carbsProgress} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Fat</span>
                    <span className="text-sm text-muted-foreground">{plan.fat}g / {plan.targetFat}g</span>
                  </div>
                  <Progress value={fatProgress} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-blue-400" />
                  Hydration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold text-blue-400 mb-2">{plan.water}</div>
                  <p className="text-muted-foreground mb-4">of {plan.targetWater} glasses</p>
                  <Progress value={waterProgress} className="h-4 mb-4" />
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: plan.targetWater }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-6 h-8 rounded-t-full ${
                          i < plan.water ? "bg-blue-400" : "bg-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calorie Distribution */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Calorie Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {plan.meals.map((meal) => (
                  <div key={meal.type} className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                      <meal.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="text-lg font-bold">{meal.calories}</p>
                    <p className="text-xs text-muted-foreground">{meal.type}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card className="glass border-primary/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Today's Nutrition Tip</h3>
                  <p className="text-muted-foreground">{randomTip}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {nutritionTips.map((tip, index) => (
              <Card key={index} className="glass hover:border-primary/30 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <p className="text-sm">{tip}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default MealPlans;
