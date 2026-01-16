import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Target, 
  Dumbbell, 
  Heart, 
  Leaf,
  Check,
  Sparkles,
  Scale,
  Activity,
  Bot,
  Loader2
} from "lucide-react";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const goals = [
  {
    id: "weight-loss",
    icon: Scale,
    title: "Weight Loss",
    description: "Lose weight sustainably while maintaining muscle mass",
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    id: "muscle-gain",
    icon: Dumbbell,
    title: "Muscle Gain",
    description: "Build lean muscle with optimized protein and calories",
    color: "bg-purple-500/20 text-purple-400"
  },
  {
    id: "diabetes",
    icon: Heart,
    title: "Diabetes-Friendly",
    description: "Manage blood sugar with low glycemic, balanced meals",
    color: "bg-red-500/20 text-red-400"
  },
  {
    id: "fitness",
    icon: Activity,
    title: "General Fitness",
    description: "Maintain health with balanced nutrition and energy",
    color: "bg-primary/20 text-primary"
  }
];

const dietaryOptions = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "pescatarian", label: "Pescatarian" },
  { id: "keto", label: "Keto" },
  { id: "paleo", label: "Paleo" }
];

const restrictionOptions = [
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "dairy-free", label: "Dairy-Free" },
  { id: "nut-free", label: "Nut-Free" },
  { id: "soy-free", label: "Soy-Free" },
  { id: "low-sodium", label: "Low Sodium" }
];

type AIRecommendation = {
  dailyCalories: number;
  macros: { protein: number; carbs: number; fat: number };
  mealTimings: string[];
  tips: string[];
  supplements: string[];
  weeklyGoal: string;
};

const Goals = () => {
  const { toast } = useToast();
  const [selectedGoal, setSelectedGoal] = useState("weight-loss");
  const [calorieTarget, setCalorieTarget] = useState([2000]);
  const [activityLevel, setActivityLevel] = useState([3]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>(["dairy-free"]);
  const [autoAdjust, setAutoAdjust] = useState(true);
  
  // AI state
  const [isGenerating, setIsGenerating] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [aiRecommendation, setAIRecommendation] = useState<AIRecommendation | null>(null);

  const toggleOption = (id: string, list: string[], setList: (list: string[]) => void) => {
    setList(list.includes(id) ? list.filter(i => i !== id) : [...list, id]);
  };

  const activityLabels = ["Sedentary", "Light", "Moderate", "Active", "Very Active"];

  const generatePlan = async () => {
    setIsGenerating(true);
    setAIRecommendation(null);

    try {
      const selectedGoalData = goals.find(g => g.id === selectedGoal);
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ 
            role: "user", 
            content: `Generate a personalized nutrition plan based on these goals:

Goal: ${selectedGoalData?.title}
Current Calorie Target: ${calorieTarget[0]} kcal
Activity Level: ${activityLabels[activityLevel[0] - 1]}
Dietary Preferences: ${dietary.length > 0 ? dietary.map(d => dietaryOptions.find(o => o.id === d)?.label).join(", ") : "None specified"}
Restrictions: ${restrictions.length > 0 ? restrictions.map(r => restrictionOptions.find(o => o.id === r)?.label).join(", ") : "None"}
${additionalInfo ? `Additional Info: ${additionalInfo}` : ''}

Return ONLY a JSON object with:
{
  "dailyCalories": recommended_calories_number,
  "macros": { "protein": grams, "carbs": grams, "fat": grams },
  "mealTimings": ["meal 1 timing and suggestion", "meal 2", "meal 3", "meal 4"],
  "tips": ["tip 1", "tip 2", "tip 3"],
  "supplements": ["supplement 1 if needed", "supplement 2"],
  "weeklyGoal": "specific weekly goal"
}

Return ONLY the JSON object, no other text.`
          }],
          type: "analysis",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate plan");
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error("No plan returned");
      }

      const parsed = JSON.parse(content);
      setAIRecommendation(parsed);
      toast({
        title: "Plan generated! ✨",
        description: "Your personalized nutrition plan is ready",
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Could not generate plan",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageLayout 
      title="AI Goals & Preferences" 
      subtitle="Customize your nutrition plan based on your goals, dietary preferences, and restrictions."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Goal Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Select Your Primary Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-300 hover:scale-102 ${
                      selectedGoal === goal.id
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border/50 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg ${goal.color} flex items-center justify-center`}>
                        <goal.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{goal.title}</h3>
                          {selectedGoal === goal.id && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {goal.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Calorie & Activity */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Daily Targets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Daily Calorie Target</Label>
                  <span className="text-xl font-bold text-primary">{calorieTarget[0]} kcal</span>
                </div>
                <Slider
                  value={calorieTarget}
                  onValueChange={setCalorieTarget}
                  min={1200}
                  max={3500}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>1,200</span>
                  <span>3,500</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Activity Level</Label>
                  <span className="text-sm font-medium text-primary">
                    {activityLabels[activityLevel[0] - 1]}
                  </span>
                </div>
                <Slider
                  value={activityLevel}
                  onValueChange={setActivityLevel}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>Sedentary</span>
                  <span>Very Active</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dietary Preferences */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Dietary Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((option) => (
                  <Badge
                    key={option.id}
                    variant={dietary.includes(option.id) ? "default" : "outline"}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      dietary.includes(option.id) 
                        ? "bg-primary hover:bg-primary/90" 
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => toggleOption(option.id, dietary, setDietary)}
                  >
                    {dietary.includes(option.id) && <Check className="w-3 h-3 mr-1" />}
                    {option.label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Restrictions */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Dietary Restrictions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {restrictionOptions.map((option) => (
                  <Badge
                    key={option.id}
                    variant={restrictions.includes(option.id) ? "default" : "outline"}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      restrictions.includes(option.id) 
                        ? "bg-destructive/80 hover:bg-destructive/70" 
                        : "hover:border-destructive/50"
                    }`}
                    onClick={() => toggleOption(option.id, restrictions, setRestrictions)}
                  >
                    {restrictions.includes(option.id) && <Check className="w-3 h-3 mr-1" />}
                    {option.label}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Info for AI */}
          <Card className="glass border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                Additional Information (Optional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Tell us more about yourself (e.g., age, weight, health conditions, specific goals like 'lose 10 lbs in 3 months', workout routine...)"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="min-h-[100px] bg-muted/50 border-border/50 focus:border-primary"
              />
            </CardContent>
          </Card>
        </div>

        {/* Summary Sidebar */}
        <div className="space-y-6">
          <Card className="glass sticky top-28">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm font-medium text-primary mb-1">Primary Goal</p>
                <p className="text-lg font-semibold">
                  {goals.find(g => g.id === selectedGoal)?.title}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Daily Target</p>
                <p className="font-semibold">{calorieTarget[0]} kcal</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Activity</p>
                <p className="font-semibold">{activityLabels[activityLevel[0] - 1]}</p>
              </div>

              {dietary.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Diet Type</p>
                  <p className="font-semibold">
                    {dietary.map(d => dietaryOptions.find(o => o.id === d)?.label).join(", ")}
                  </p>
                </div>
              )}

              {restrictions.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Restrictions</p>
                  <p className="font-semibold">
                    {restrictions.map(r => restrictionOptions.find(o => o.id === r)?.label).join(", ")}
                  </p>
                </div>
              )}

              <div className="border-t border-border/50 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-adjust" className="text-sm">Auto-adjust plans</Label>
                  <Switch
                    id="auto-adjust"
                    checked={autoAdjust}
                    onCheckedChange={setAutoAdjust}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  AI will adapt recommendations based on your progress
                </p>
              </div>

              <Button 
                variant="hero" 
                className="w-full gap-2 mt-4"
                onClick={generatePlan}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate My Plan
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          {aiRecommendation && (
            <Card className="glass border-primary/30 animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bot className="w-5 h-5 text-primary" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <p className="text-sm text-muted-foreground mb-1">Recommended Calories</p>
                  <p className="text-2xl font-bold text-primary">{aiRecommendation.dailyCalories} kcal</p>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Daily Macros</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="font-bold text-primary">{aiRecommendation.macros.protein}g</p>
                      <p className="text-xs text-muted-foreground">Protein</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="font-bold text-accent">{aiRecommendation.macros.carbs}g</p>
                      <p className="text-xs text-muted-foreground">Carbs</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="font-bold text-secondary">{aiRecommendation.macros.fat}g</p>
                      <p className="text-xs text-muted-foreground">Fat</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Meal Schedule</p>
                  <ul className="space-y-1">
                    {aiRecommendation.mealTimings.map((timing, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {timing}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Tips</p>
                  <ul className="space-y-1">
                    {aiRecommendation.tips.map((tip, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                  <p className="text-sm font-medium text-accent mb-1">Weekly Goal</p>
                  <p className="text-sm text-muted-foreground">{aiRecommendation.weeklyGoal}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Goals;
