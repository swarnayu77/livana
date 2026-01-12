import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Target, 
  Dumbbell, 
  Heart, 
  Leaf,
  Check,
  Sparkles,
  Scale,
  Activity
} from "lucide-react";

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

const Goals = () => {
  const [selectedGoal, setSelectedGoal] = useState("weight-loss");
  const [calorieTarget, setCalorieTarget] = useState([2000]);
  const [activityLevel, setActivityLevel] = useState([3]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [restrictions, setRestrictions] = useState<string[]>(["dairy-free"]);
  const [autoAdjust, setAutoAdjust] = useState(true);

  const toggleOption = (id: string, list: string[], setList: (list: string[]) => void) => {
    setList(list.includes(id) ? list.filter(i => i !== id) : [...list, id]);
  };

  const activityLabels = ["Sedentary", "Light", "Moderate", "Active", "Very Active"];

  return (
    <PageLayout 
      title="Goals & Preferences" 
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

              <Button variant="hero" className="w-full gap-2 mt-4">
                <Sparkles className="w-4 h-4" />
                Generate My Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Goals;
