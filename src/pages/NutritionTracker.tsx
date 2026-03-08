import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import ProgressRing from "@/components/ProgressRing";
import {
  Plus,
  Droplets,
  Scale,
  Utensils,
  Coffee,
  Sun,
  Moon,
  Apple,
  Search,
  Sparkles,
  Trash2,
  TrendingUp,
  Lightbulb,
  LogOut,
} from "lucide-react";
import { format, startOfDay, endOfDay } from "date-fns";

type Profile = {
  full_name: string | null;
  daily_calorie_target: number;
  daily_protein_target: number;
  daily_carbs_target: number;
  daily_fat_target: number;
  daily_water_target: number;
  onboarding_complete: boolean;
};

type FoodLog = {
  id: string;
  meal_type: string;
  food_name: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  quantity: string;
  logged_at: string;
};

const mealIcons: Record<string, any> = {
  breakfast: Coffee,
  lunch: Sun,
  dinner: Moon,
  snack: Apple,
};

const mealLabels: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snack: "Snack",
};

const NutritionTracker = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>([]);
  const [waterCount, setWaterCount] = useState(0);
  const [showAddFood, setShowAddFood] = useState(false);
  const [addingMealType, setAddingMealType] = useState("breakfast");
  const [foodSearch, setFoodSearch] = useState("");
  const [searchingAI, setSearchingAI] = useState(false);
  const [aiResult, setAIResult] = useState<any>(null);
  const [weightInput, setWeightInput] = useState("");
  const [loggingWeight, setLoggingWeight] = useState(false);

  const today = new Date();
  const todayStart = startOfDay(today).toISOString();
  const todayEnd = endOfDay(today).toISOString();

  const fetchData = useCallback(async () => {
    if (!user) return;

    const [profileRes, foodRes, waterRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("food_logs").select("*").eq("user_id", user.id).gte("logged_at", todayStart).lte("logged_at", todayEnd).order("logged_at", { ascending: true }),
      supabase.from("water_logs").select("*").eq("user_id", user.id).gte("logged_at", todayStart).lte("logged_at", todayEnd),
    ]);

    if (profileRes.data) {
      if (!profileRes.data.onboarding_complete) {
        navigate("/onboarding");
        return;
      }
      setProfile(profileRes.data as unknown as Profile);
    }
    if (foodRes.data) setFoodLogs(foodRes.data as unknown as FoodLog[]);
    if (waterRes.data) setWaterCount(waterRes.data.reduce((sum: number, w: any) => sum + (w.glasses || 1), 0));
  }, [user, todayStart, todayEnd, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Totals
  const totals = foodLogs.reduce(
    (acc, log) => ({
      calories: acc.calories + Number(log.calories || 0),
      protein: acc.protein + Number(log.protein_g || 0),
      carbs: acc.carbs + Number(log.carbs_g || 0),
      fat: acc.fat + Number(log.fat_g || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const targets = {
    calories: profile?.daily_calorie_target || 2000,
    protein: profile?.daily_protein_target || 100,
    carbs: profile?.daily_carbs_target || 250,
    fat: profile?.daily_fat_target || 65,
    water: profile?.daily_water_target || 8,
  };

  const handleAISearch = async () => {
    if (!foodSearch.trim()) return;
    setSearchingAI(true);
    setAIResult(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          type: "food_search",
          messages: [{ role: "user", content: foodSearch }],
        }),
      });
      if (!res.ok) throw new Error("AI search failed");
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        setAIResult(JSON.parse(cleaned));
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to search food", variant: "destructive" });
    } finally {
      setSearchingAI(false);
    }
  };

  const handleAddFood = async () => {
    if (!user || !aiResult) return;
    try {
      const { error } = await supabase.from("food_logs").insert({
        user_id: user.id,
        meal_type: addingMealType,
        food_name: aiResult.food_name,
        calories: aiResult.calories,
        protein_g: aiResult.protein_g,
        carbs_g: aiResult.carbs_g,
        fat_g: aiResult.fat_g,
        fiber_g: aiResult.fiber_g || 0,
        quantity: aiResult.quantity,
      });
      if (error) throw error;
      toast({ title: "Added!", description: `${aiResult.food_name} logged to ${mealLabels[addingMealType]}` });
      setShowAddFood(false);
      setFoodSearch("");
      setAIResult(null);
      fetchData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to log food", variant: "destructive" });
    }
  };

  const handleDeleteFood = async (id: string) => {
    await supabase.from("food_logs").delete().eq("id", id);
    fetchData();
  };

  const handleAddWater = async () => {
    if (!user) return;
    await supabase.from("water_logs").insert({ user_id: user.id, glasses: 1 });
    setWaterCount((c) => c + 1);
  };

  const handleLogWeight = async () => {
    if (!user || !weightInput) return;
    setLoggingWeight(true);
    try {
      await supabase.from("weight_logs").insert({ user_id: user.id, weight_kg: parseFloat(weightInput) });
      toast({ title: "Weight logged!", description: `${weightInput} kg recorded` });
      setWeightInput("");
    } catch {
      toast({ title: "Error", description: "Failed to log weight", variant: "destructive" });
    } finally {
      setLoggingWeight(false);
    }
  };

  // Insights
  const insights = [];
  if (totals.protein < targets.protein * 0.5 && foodLogs.length > 0) {
    insights.push("⚠️ You're consuming less protein than recommended. Add eggs, chicken, or legumes.");
  }
  if (totals.calories > targets.calories) {
    insights.push("🔴 You've exceeded your daily calorie target. Consider lighter meals for the rest of the day.");
  }
  if (totals.calories > 0 && totals.calories <= targets.calories) {
    insights.push("✅ Your calorie intake is within your target range today. Great job!");
  }
  if (waterCount < targets.water / 2) {
    insights.push("💧 Drink more water! You're behind on your hydration goal.");
  }

  if (!profile) return null;

  return (
    <PageLayout
      title={`Hey${profile.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""} 👋`}
      subtitle={format(today, "EEEE, MMMM d, yyyy")}
    >
      <div className="max-w-4xl mx-auto">
        {/* Sign out */}
        <div className="flex justify-end mb-4">
          <Button variant="ghost" size="sm" className="text-xs rounded-full" onClick={signOut}>
            <LogOut className="w-3.5 h-3.5 mr-1.5" /> Sign Out
          </Button>
        </div>

        {/* Daily Progress Rings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card rounded-2xl p-5 text-center">
            <ProgressRing value={totals.calories} max={targets.calories} size={90} strokeWidth={8} color="hsl(var(--primary))" />
            <p className="text-xs text-muted-foreground mt-2">Calories</p>
            <p className="text-sm font-semibold">{Math.round(totals.calories)} / {targets.calories}</p>
          </Card>
          <Card className="glass-card rounded-2xl p-5 text-center">
            <ProgressRing value={totals.protein} max={targets.protein} size={90} strokeWidth={8} color="hsl(152, 70%, 45%)" />
            <p className="text-xs text-muted-foreground mt-2">Protein</p>
            <p className="text-sm font-semibold">{Math.round(totals.protein)}g / {targets.protein}g</p>
          </Card>
          <Card className="glass-card rounded-2xl p-5 text-center">
            <ProgressRing value={totals.carbs} max={targets.carbs} size={90} strokeWidth={8} color="hsl(162, 65%, 42%)" />
            <p className="text-xs text-muted-foreground mt-2">Carbs</p>
            <p className="text-sm font-semibold">{Math.round(totals.carbs)}g / {targets.carbs}g</p>
          </Card>
          <Card className="glass-card rounded-2xl p-5 text-center">
            <ProgressRing value={totals.fat} max={targets.fat} size={90} strokeWidth={8} color="hsl(40, 90%, 50%)" />
            <p className="text-xs text-muted-foreground mt-2">Fat</p>
            <p className="text-sm font-semibold">{Math.round(totals.fat)}g / {targets.fat}g</p>
          </Card>
        </div>

        {/* Water + Weight Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Water */}
          <Card className="glass-card rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-sm">Water Intake</h3>
              </div>
              <Badge variant="secondary" className="text-[10px] rounded-full">{waterCount}/{targets.water} glasses</Badge>
            </div>
            <div className="flex items-center gap-2 mb-3">
              {Array.from({ length: targets.water }).map((_, i) => (
                <div key={i} className={`h-8 flex-1 rounded-full transition-all ${i < waterCount ? "bg-accent/60" : "bg-secondary/50"}`} />
              ))}
            </div>
            <Button size="sm" variant="glass" className="w-full rounded-xl text-xs" onClick={handleAddWater}>
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Glass
            </Button>
          </Card>

          {/* Weight */}
          <Card className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Scale className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-sm">Log Weight</h3>
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="kg"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                className="rounded-xl bg-secondary/30 flex-1"
              />
              <Button size="sm" className="rounded-xl" onClick={handleLogWeight} disabled={loggingWeight || !weightInput}>
                <TrendingUp className="w-3.5 h-3.5 mr-1" /> Log
              </Button>
            </div>
          </Card>
        </div>

        {/* Insights */}
        {insights.length > 0 && (
          <Card className="glass-card rounded-2xl p-5 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-sm">Smart Insights</h3>
            </div>
            <div className="space-y-2">
              {insights.map((insight, i) => (
                <p key={i} className="text-xs text-muted-foreground leading-relaxed">{insight}</p>
              ))}
            </div>
          </Card>
        )}

        {/* Food Log */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Today's Meals</h2>
          <Dialog open={showAddFood} onOpenChange={setShowAddFood}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-full text-xs px-4">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Food
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-border/50 max-w-md">
              <DialogHeader>
                <DialogTitle>Log Food</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Meal Type</Label>
                  <Select value={addingMealType} onValueChange={setAddingMealType}>
                    <SelectTrigger className="rounded-xl bg-secondary/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">🌅 Breakfast</SelectItem>
                      <SelectItem value="lunch">☀️ Lunch</SelectItem>
                      <SelectItem value="dinner">🌙 Dinner</SelectItem>
                      <SelectItem value="snack">🍎 Snack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Describe your food</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g. 2 eggs with toast and butter"
                      value={foodSearch}
                      onChange={(e) => setFoodSearch(e.target.value)}
                      className="rounded-xl bg-secondary/30 flex-1"
                      onKeyDown={(e) => e.key === "Enter" && handleAISearch()}
                    />
                    <Button size="icon" className="rounded-xl shrink-0" onClick={handleAISearch} disabled={searchingAI}>
                      {searchingAI ? (
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground">AI will estimate nutrition automatically</p>
                </div>

                {aiResult && (
                  <div className="rounded-xl bg-primary/5 border border-primary/10 p-4 animate-fade-up">
                    <p className="font-semibold text-sm text-foreground mb-1">{aiResult.food_name}</p>
                    <p className="text-[10px] text-muted-foreground mb-3">{aiResult.quantity}</p>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <p className="text-lg font-bold text-foreground">{aiResult.calories}</p>
                        <p className="text-[10px] text-muted-foreground">Cal</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{aiResult.protein_g}g</p>
                        <p className="text-[10px] text-muted-foreground">Protein</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{aiResult.carbs_g}g</p>
                        <p className="text-[10px] text-muted-foreground">Carbs</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-foreground">{aiResult.fat_g}g</p>
                        <p className="text-[10px] text-muted-foreground">Fat</p>
                      </div>
                    </div>
                    <Button className="w-full mt-3 rounded-xl" onClick={handleAddFood}>
                      Add to {mealLabels[addingMealType]}
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Meal sections */}
        <div className="space-y-4">
          {(["breakfast", "lunch", "dinner", "snack"] as const).map((mealType) => {
            const meals = foodLogs.filter((f) => f.meal_type === mealType);
            const Icon = mealIcons[mealType];
            const mealCals = meals.reduce((s, m) => s + Number(m.calories || 0), 0);

            return (
              <Card key={mealType} className="glass-card rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{mealLabels[mealType]}</h3>
                      <p className="text-[10px] text-muted-foreground">{Math.round(mealCals)} cal</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs rounded-full"
                    onClick={() => { setAddingMealType(mealType); setShowAddFood(true); }}
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>

                {meals.length > 0 ? (
                  <div className="space-y-2">
                    {meals.map((meal) => (
                      <div key={meal.id} className="flex items-center justify-between py-2 px-3 rounded-xl bg-secondary/20">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{meal.food_name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {meal.quantity} • {Math.round(Number(meal.calories))} cal • P:{Math.round(Number(meal.protein_g))}g C:{Math.round(Number(meal.carbs_g))}g F:{Math.round(Number(meal.fat_g))}g
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="w-7 h-7 shrink-0" onClick={() => handleDeleteFood(meal.id)}>
                          <Trash2 className="w-3 h-3 text-muted-foreground" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground/50 text-center py-3">No items logged</p>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
};

export default NutritionTracker;
