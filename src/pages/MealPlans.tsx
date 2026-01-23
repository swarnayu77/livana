import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
  Zap,
  Loader2,
  Bot,
  Leaf,
  Fish,
  Beef,
  Wheat,
  Milk,
  Nut,
  Shell,
  Egg,
  Target,
  UtensilsCrossed
} from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

type Meal = {
  type: string;
  icon: typeof Coffee;
  time: string;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  tags: string[];
  isCompleted: boolean;
};

const dietTypes = [
  { value: "balanced", label: "Balanced", icon: Utensils },
  { value: "vegetarian", label: "Vegetarian", icon: Leaf },
  { value: "vegan", label: "Vegan", icon: Leaf },
  { value: "keto", label: "Keto / Low Carb", icon: Beef },
  { value: "paleo", label: "Paleo", icon: Beef },
  { value: "mediterranean", label: "Mediterranean", icon: Fish },
  { value: "high-protein", label: "High Protein", icon: Target },
];

const cuisineTypes = [
  { value: "any", label: "Any Cuisine" },
  { value: "american", label: "American" },
  { value: "asian", label: "Asian" },
  { value: "mediterranean", label: "Mediterranean" },
  { value: "mexican", label: "Mexican" },
  { value: "indian", label: "Indian" },
  { value: "italian", label: "Italian" },
  { value: "japanese", label: "Japanese" },
  { value: "middle-eastern", label: "Middle Eastern" },
];

const allergyOptions = [
  { value: "gluten", label: "Gluten", icon: Wheat },
  { value: "dairy", label: "Dairy", icon: Milk },
  { value: "nuts", label: "Nuts", icon: Nut },
  { value: "shellfish", label: "Shellfish", icon: Shell },
  { value: "eggs", label: "Eggs", icon: Egg },
  { value: "soy", label: "Soy", icon: Leaf },
  { value: "fish", label: "Fish", icon: Fish },
];

const goalOptions = [
  { value: "maintain", label: "Maintain Weight" },
  { value: "lose", label: "Weight Loss" },
  { value: "gain", label: "Muscle Gain" },
  { value: "energy", label: "More Energy" },
  { value: "health", label: "General Health" },
];

const mealCountOptions = [
  { value: "3", label: "3 Meals" },
  { value: "4", label: "3 Meals + Snack" },
  { value: "5", label: "3 Meals + 2 Snacks" },
  { value: "6", label: "6 Small Meals" },
];

const defaultMeals: Meal[] = [
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
];

const nutritionTips = [
  "💡 Try adding spinach to your smoothies — you won't taste it but you'll get iron and vitamins!",
  "🥤 Drink a glass of water before each meal to stay hydrated and manage portions.",
  "🥗 Aim for half your plate to be vegetables at lunch and dinner.",
  "⏰ Eating protein within 30 mins after workout helps muscle recovery."
];

const MealPlans = () => {
  const { toast } = useToast();
  const [selectedDay, setSelectedDay] = useState(3);
  const [meals, setMeals] = useState<Meal[]>(defaultMeals);
  const [completedMeals, setCompletedMeals] = useState<string[]>(["Breakfast", "Lunch"]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState("");
  
  // New detailed options
  const [dietType, setDietType] = useState("balanced");
  const [calorieTarget, setCalorieTarget] = useState("2000");
  const [mealCount, setMealCount] = useState("4");
  const [cuisinePreference, setCuisinePreference] = useState("any");
  const [goal, setGoal] = useState("maintain");
  const [allergies, setAllergies] = useState<string[]>([]);
  const [cookingTime, setCookingTime] = useState("moderate");
  
  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0);
  const totalFat = meals.reduce((sum, m) => sum + m.fat, 0);
  
  const targetCalories = 2000;
  const targetProtein = 120;
  const targetCarbs = 200;
  const targetFat = 70;
  
  const calorieProgress = (totalCalories / targetCalories) * 100;
  const proteinProgress = (totalProtein / targetProtein) * 100;
  const carbsProgress = (totalCarbs / targetCarbs) * 100;
  const fatProgress = (totalFat / targetFat) * 100;

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

  const toggleAllergy = (allergy: string) => {
    setAllergies(prev => 
      prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]
    );
  };

  const generateMealPlan = async () => {
    setIsGenerating(true);
    try {
      const selectedDiet = dietTypes.find(d => d.value === dietType)?.label || "Balanced";
      const selectedGoal = goalOptions.find(g => g.value === goal)?.label || "Maintain Weight";
      const selectedCuisine = cuisineTypes.find(c => c.value === cuisinePreference)?.label || "Any";
      const allergyList = allergies.length > 0 ? allergies.join(", ") : "None";
      const mealNumber = parseInt(mealCount);
      
      const prompt = `Generate a personalized daily meal plan with the following requirements:

- Diet Type: ${selectedDiet}
- Daily Calorie Target: ${calorieTarget} calories
- Goal: ${selectedGoal}
- Number of Meals: ${mealNumber}
- Cuisine Preference: ${selectedCuisine}
- Allergies/Restrictions: ${allergyList}
- Cooking Time Preference: ${cookingTime === "quick" ? "Quick meals under 20 min" : cookingTime === "moderate" ? "Moderate 20-40 min" : "Elaborate meals, time not an issue"}
${additionalNotes ? `- Additional Notes: ${additionalNotes}` : ""}

Return ONLY a JSON array with exactly ${mealNumber} meals. Include breakfast, lunch, dinner, and snacks as needed.
Each meal should have:
{
  "type": "Breakfast/Lunch/Snack/Dinner",
  "time": "time like 7:00 AM",
  "name": "meal name",
  "description": "short description with key ingredients",
  "calories": number,
  "protein": number in grams,
  "carbs": number in grams,
  "fat": number in grams,
  "tags": ["tag1", "tag2"] (2-3 relevant tags)
}

Ensure meals fit the diet type, respect allergies, and total calories are close to ${calorieTarget}.
Return ONLY the JSON array, no other text.`;

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          type: "analysis",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate meal plan");
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error("No meal plan returned");
      }

      const parsed = JSON.parse(content);
      const icons = [Coffee, Sun, Apple, Moon, Coffee, Sun];
      const newMeals: Meal[] = parsed.map((m: any, i: number) => ({
        ...m,
        icon: icons[i % icons.length] || Coffee,
        isCompleted: false,
      }));
      
      setMeals(newMeals);
      setCompletedMeals([]);
      toast({
        title: "Meal plan generated! ✨",
        description: `${newMeals.length} meals created for your ${selectedDiet} plan`,
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Could not generate meal plan",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const randomTip = nutritionTips[Math.floor(Math.random() * nutritionTips.length)];

  return (
    <PageLayout 
      title="AI Meal Plans" 
      subtitle="AI-generated daily plans tailored to your goals with balanced macros and micronutrients."
    >
      {/* AI Generation Section */}
      <Card className="glass mb-6 border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">AI Meal Plan Generator</h3>
              <p className="text-sm text-muted-foreground">Customize your preferences and let AI create your perfect plan</p>
            </div>
          </div>
          
          {/* Diet Type Selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">Diet Type</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {dietTypes.map((diet) => {
                const IconComponent = diet.icon;
                return (
                  <Button
                    key={diet.value}
                    variant={dietType === diet.value ? "hero" : "glass"}
                    size="sm"
                    className="gap-1.5 h-auto py-2 px-3"
                    onClick={() => setDietType(diet.value)}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-xs">{diet.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Row of selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Calorie Target</Label>
              <Select value={calorieTarget} onValueChange={setCalorieTarget}>
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue placeholder="Select calories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1200">1200 kcal</SelectItem>
                  <SelectItem value="1500">1500 kcal</SelectItem>
                  <SelectItem value="1800">1800 kcal</SelectItem>
                  <SelectItem value="2000">2000 kcal</SelectItem>
                  <SelectItem value="2200">2200 kcal</SelectItem>
                  <SelectItem value="2500">2500 kcal</SelectItem>
                  <SelectItem value="2800">2800 kcal</SelectItem>
                  <SelectItem value="3000">3000 kcal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Meal Count</Label>
              <Select value={mealCount} onValueChange={setMealCount}>
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue placeholder="Number of meals" />
                </SelectTrigger>
                <SelectContent>
                  {mealCountOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Cuisine</Label>
              <Select value={cuisinePreference} onValueChange={setCuisinePreference}>
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue placeholder="Cuisine preference" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineTypes.map(c => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">Goal</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue placeholder="Your goal" />
                </SelectTrigger>
                <SelectContent>
                  {goalOptions.map(g => (
                    <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Cooking Time */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">Cooking Time</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "quick", label: "Quick (< 20 min)", icon: Zap },
                { value: "moderate", label: "Moderate (20-40 min)", icon: Clock },
                { value: "elaborate", label: "Elaborate (40+ min)", icon: UtensilsCrossed },
              ].map((option) => {
                const IconComponent = option.icon;
                return (
                  <Button
                    key={option.value}
                    variant={cookingTime === option.value ? "hero" : "glass"}
                    size="sm"
                    className="gap-2"
                    onClick={() => setCookingTime(option.value)}
                  >
                    <IconComponent className="w-4 h-4" />
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Allergies */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-3 block">Allergies & Restrictions</Label>
            <div className="flex flex-wrap gap-2">
              {allergyOptions.map((allergy) => {
                const IconComponent = allergy.icon;
                const isSelected = allergies.includes(allergy.value);
                return (
                  <Button
                    key={allergy.value}
                    variant={isSelected ? "destructive" : "glass"}
                    size="sm"
                    className="gap-1.5"
                    onClick={() => toggleAllergy(allergy.value)}
                  >
                    <IconComponent className="w-4 h-4" />
                    {allergy.label}
                    {isSelected && <span className="ml-1">✕</span>}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mb-6">
            <Label className="text-sm font-medium mb-2 block">Additional Notes (Optional)</Label>
            <Textarea
              placeholder="Any specific preferences? (e.g., no spicy food, prefer cold breakfast, need high fiber...)"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="min-h-[80px] bg-muted/50 border-border/50 focus:border-primary"
            />
          </div>

          {/* Generate Button */}
          <Button 
            variant="hero" 
            size="lg"
            className="gap-2 w-full sm:w-auto"
            onClick={generateMealPlan}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating Your Plan...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate AI Meal Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

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
                  <h3 className="text-xl font-semibold mb-1">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </h3>
                  <p className="text-muted-foreground">AI-optimized for your nutrition goal</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="flex items-center gap-2 text-3xl font-bold text-primary">
                      <Flame className="w-6 h-6" />
                      {totalCalories}
                    </div>
                    <p className="text-sm text-muted-foreground">of {targetCalories} kcal</p>
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
                        strokeDasharray={`${Math.min(calorieProgress, 100)}, 100`}
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
            {meals.map((meal) => {
              const isComplete = completedMeals.includes(meal.type);
              const IconComponent = meal.icon;
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
                        <IconComponent className={`w-7 h-7 ${isComplete ? "text-primary" : "text-primary"}`} />
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
            <Button variant="hero" className="gap-2" onClick={generateMealPlan} disabled={isGenerating}>
              <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
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
                    <span className="text-sm text-muted-foreground">{totalProtein}g / {targetProtein}g</span>
                  </div>
                  <Progress value={proteinProgress} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Carbohydrates</span>
                    <span className="text-sm text-muted-foreground">{totalCarbs}g / {targetCarbs}g</span>
                  </div>
                  <Progress value={carbsProgress} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Fat</span>
                    <span className="text-sm text-muted-foreground">{totalFat}g / {targetFat}g</span>
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
                  <div className="text-5xl font-bold text-blue-400 mb-2">6</div>
                  <p className="text-muted-foreground mb-4">of 8 glasses</p>
                  <Progress value={75} className="h-4 mb-4" />
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-6 h-8 rounded-t-full ${i < 6 ? "bg-blue-400" : "bg-muted"}`}
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
                {meals.map((meal) => {
                  const IconComponent = meal.icon;
                  return (
                    <div key={meal.type} className="text-center">
                      <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-lg font-bold">{meal.calories}</p>
                      <p className="text-xs text-muted-foreground">{meal.type}</p>
                    </div>
                  );
                })}
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
