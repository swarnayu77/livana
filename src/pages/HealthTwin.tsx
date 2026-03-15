import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useHealthTwin } from "@/hooks/use-health-twin";
import HealthScoreRing from "@/components/health-twin/HealthScoreRing";
import MetricCard from "@/components/health-twin/MetricCard";
import MacroBar from "@/components/health-twin/MacroBar";
import InsightCard from "@/components/health-twin/InsightCard";
import PredictionPanel from "@/components/health-twin/PredictionPanel";
import { Link } from "react-router-dom";
import {
  Flame, Zap, Droplets, TrendingUp, TrendingDown, Activity,
  Heart, Brain, Scale, Sparkles, Shield, AlertTriangle,
  ChevronRight, ArrowRight, Dumbbell, Utensils, Coffee, Sun, Moon, Apple,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, CartesianGrid, BarChart, Bar } from "recharts";

const mealIcons: Record<string, any> = {
  breakfast: Coffee, lunch: Sun, dinner: Moon, snack: Apple,
};

const HealthTwin = () => {
  const { user } = useAuth();
  const { metrics, loading } = useHealthTwin();
  const [aiInsights, setAiInsights] = useState<{ text: string; type: "positive" | "warning" | "info"; icon: string }[]>([]);
  const [insightsLoading, setInsightsLoading] = useState(false);

  useEffect(() => {
    if (loading || !user) return;
    generateInsights();
  }, [loading, user]);

  const generateInsights = async () => {
    setInsightsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          type: "health_twin_insights",
          messages: [{ role: "user", content: "Generate insights" }],
          context: {
            healthScore: metrics.healthScore,
            caloriesConsumed: metrics.caloriesConsumed,
            calorieTarget: metrics.calorieTarget,
            proteinConsumed: metrics.proteinConsumed,
            proteinTarget: metrics.proteinTarget,
            carbsConsumed: metrics.carbsConsumed,
            carbsTarget: metrics.carbsTarget,
            fatConsumed: metrics.fatConsumed,
            fatTarget: metrics.fatTarget,
            waterProgress: metrics.waterProgress,
            waterTarget: metrics.waterTarget,
            metabolismRate: metrics.metabolismRate,
            energyLevel: metrics.energyLevel,
            weeklyWeightChange: metrics.weeklyWeightChange,
            workoutsBurned: metrics.workoutsBurned,
            workoutsToday: metrics.workoutsToday,
            netCalories: metrics.netCalories,
          },
        }),
      });

      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        const cleaned = content.replace(/```json\n?/g, "").replace(/```/g, "").trim();
        setAiInsights(JSON.parse(cleaned));
      }
    } catch {
      setAiInsights([
        { text: `Your estimated metabolism burns ~${metrics.metabolismRate} calories daily.`, type: "info", icon: "flame" },
        { text: metrics.surplus ? "You're in a calorie surplus today. Consider lighter meals." : "You're in a calorie deficit. Great for weight loss goals!", type: metrics.surplus ? "warning" : "positive", icon: "trending" },
        { text: metrics.workoutsBurned > 0 ? `Great job! You've burned ${metrics.workoutsBurned} cal through exercise.` : "No workouts today. A 30-min walk can burn ~150 cal.", type: metrics.workoutsBurned > 0 ? "positive" : "info", icon: "zap" },
        { text: metrics.waterProgress < metrics.waterTarget ? "Drink more water to boost energy and metabolism." : "Great hydration today!", type: metrics.waterProgress < metrics.waterTarget ? "warning" : "positive", icon: "droplets" },
      ]);
    } finally {
      setInsightsLoading(false);
    }
  };

  const getInsightIcon = (icon: string) => {
    switch (icon) {
      case "flame": return Flame;
      case "trending": return TrendingUp;
      case "droplets": return Droplets;
      case "heart": return Heart;
      case "brain": return Brain;
      case "shield": return Shield;
      case "alert": return AlertTriangle;
      case "zap": return Zap;
      case "dumbbell": return Dumbbell;
      default: return Sparkles;
    }
  };

  if (!user) {
    return (
      <PageLayout title="AI Health Twin" subtitle="Your digital health model">
        <div className="max-w-lg mx-auto text-center py-20">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-3">Sign in to access your Health Twin</h2>
          <p className="text-muted-foreground mb-6">Your AI Health Twin analyzes your data to predict how nutrition choices affect your body.</p>
          <Link to="/auth">
            <Button variant="hero" className="gap-2">
              <ArrowRight className="w-4 h-4" /> Get Started
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  if (loading) {
    return (
      <PageLayout title="AI Health Twin" subtitle="Analyzing your health data...">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-muted/50 rounded w-1/2 mb-3" />
              <div className="h-8 bg-muted/50 rounded w-3/4" />
            </div>
          ))}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="AI Health Twin"
      subtitle="Your digital body model — real-time insights powered by AI"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero Score Section */}
        <div className="glass rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0" />
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <HealthScoreRing score={metrics.healthScore} size={170} sublabel="Health Score" />
              <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20 mt-2">
                <Activity className="w-3 h-3 mr-1" /> AI Analyzed
              </Badge>
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <HealthScoreRing score={metrics.nutritionScore} size={72} strokeWidth={5} label={`${metrics.nutritionScore}`} color="hsl(var(--primary))" />
                <span className="text-[11px] text-muted-foreground font-medium">Nutrition</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <HealthScoreRing score={metrics.energyLevel} size={72} strokeWidth={5} label={`${metrics.energyLevel}`} color="hsl(45 100% 50%)" />
                <span className="text-[11px] text-muted-foreground font-medium">Energy</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <HealthScoreRing score={Math.min((metrics.waterProgress / metrics.waterTarget) * 100, 100)} size={72} strokeWidth={5} label={`${metrics.waterProgress}`} color="hsl(200 80% 55%)" />
                <span className="text-[11px] text-muted-foreground font-medium">Hydration</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <HealthScoreRing score={Math.min((metrics.workoutsBurned / 500) * 100, 100)} size={72} strokeWidth={5} label={`${metrics.workoutsBurned}`} color="hsl(0 80% 55%)" />
                <span className="text-[11px] text-muted-foreground font-medium">Burned</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <MetricCard icon={Flame} label="Calories" value={`${metrics.caloriesConsumed}`} subtitle={`of ${metrics.calorieTarget} kcal`} accent trend={metrics.surplus ? "up" : "down"} trendValue={`${Math.abs(metrics.calorieBalance)} kcal`} />
          <MetricCard icon={Activity} label="Metabolism" value={`${metrics.metabolismRate}`} subtitle="kcal/day (TDEE)" />
          <MetricCard icon={Scale} label="Weight Trend" value={metrics.weeklyWeightChange !== 0 ? `${metrics.weeklyWeightChange > 0 ? "+" : ""}${metrics.weeklyWeightChange.toFixed(1)} kg` : "—"} subtitle="This period" trend={metrics.weeklyWeightChange > 0 ? "up" : metrics.weeklyWeightChange < 0 ? "down" : "neutral"} trendValue="weekly" />
          <MetricCard icon={Dumbbell} label="Workouts" value={`${metrics.workoutsToday}`} subtitle={`${metrics.workoutDuration} min • ${metrics.workoutsBurned} cal`} />
          <MetricCard icon={Zap} label="Net Calories" value={`${Math.round(metrics.netCalories)}`} subtitle="eaten − burned" trend={metrics.netCalories > metrics.calorieTarget ? "up" : "down"} trendValue={metrics.netCalories > metrics.calorieTarget ? "over" : "under"} />
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Macros & Charts */}
          <div className="space-y-6 lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Macro Breakdown */}
              <Card className="glass p-5">
                <h3 className="font-heading font-bold text-sm mb-4 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  Macronutrient Balance
                </h3>
                <div className="space-y-4">
                  <MacroBar label="Protein" current={metrics.proteinConsumed} target={metrics.proteinTarget} color="hsl(var(--primary))" />
                  <MacroBar label="Carbs" current={metrics.carbsConsumed} target={metrics.carbsTarget} color="hsl(45 100% 50%)" />
                  <MacroBar label="Fat" current={metrics.fatConsumed} target={metrics.fatTarget} color="hsl(0 80% 55%)" />
                  <MacroBar label="Fiber" current={metrics.fiberConsumed} target={30} color="hsl(200 80% 55%)" />
                </div>
              </Card>

              {/* Today's Food Log */}
              <Card className="glass p-5">
                <h3 className="font-heading font-bold text-sm mb-4 flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-primary" />
                  Today's Food Log
                </h3>
                {metrics.todayFoods.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {metrics.todayFoods.map((food, i) => {
                      const MealIcon = mealIcons[food.meal_type] || Utensils;
                      return (
                        <div key={i} className="flex items-center gap-2.5 py-1.5 px-2.5 rounded-lg bg-secondary/20">
                          <MealIcon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-foreground truncate">{food.food_name}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {food.calories} cal • P:{food.protein_g}g C:{food.carbs_g}g F:{food.fat_g}g
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Utensils className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">No food logged today</p>
                    <Link to="/tracker">
                      <Button variant="ghost" size="sm" className="text-xs mt-2">Go to Tracker</Button>
                    </Link>
                  </div>
                )}
              </Card>
            </div>

            {/* Calorie Trend Chart */}
            <Card className="glass p-5">
              <h3 className="font-heading font-bold text-sm mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                7-Day Calorie Trend
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metrics.calorieTrend}>
                    <defs>
                      <linearGradient id="calorieGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={40} />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: 12 }} />
                    <Area type="monotone" dataKey="calories" stroke="hsl(var(--primary))" fill="url(#calorieGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Today's Workouts */}
            <Card className="glass p-5">
              <h3 className="font-heading font-bold text-sm mb-4 flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-primary" />
                Today's Workouts
                {metrics.workoutsToday > 0 && (
                  <Badge variant="secondary" className="text-[10px] ml-auto">{metrics.workoutsBurned} cal burned</Badge>
                )}
              </h3>
              {metrics.todayWorkouts.length > 0 ? (
                <div className="space-y-2">
                  {metrics.todayWorkouts.map((w, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-secondary/20">
                      <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                        <Dumbbell className="w-4 h-4 text-destructive" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">{w.exercise_name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {w.workout_type}{w.duration_min > 0 && ` • ${w.duration_min} min`}
                          {w.calories_burned > 0 && ` • ${w.calories_burned} cal`}
                          {w.sets && w.reps && ` • ${w.sets}×${w.reps}`}
                          {w.weight_kg && ` @ ${w.weight_kg}kg`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Dumbbell className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">No workouts today</p>
                  <Link to="/tracker">
                    <Button variant="ghost" size="sm" className="text-xs mt-2">Log a Workout</Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Meal Impact Simulator */}
            <PredictionPanel metrics={metrics} />

            {/* AI Insights */}
            <Card className="glass p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-sm flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  AI Health Insights
                </h3>
                <Button variant="ghost" size="sm" className="text-xs h-7" onClick={generateInsights} disabled={insightsLoading}>
                  {insightsLoading ? "Analyzing..." : "Refresh"}
                </Button>
              </div>
              <div className="space-y-2">
                {insightsLoading ? (
                  [...Array(4)].map((_, i) => (
                    <div key={i} className="h-14 bg-muted/30 rounded-xl animate-pulse" />
                  ))
                ) : (
                  aiInsights.map((insight, i) => (
                    <InsightCard key={i} icon={getInsightIcon(insight.icon)} text={insight.text} type={insight.type} />
                  ))
                )}
              </div>
            </Card>

            {/* Weight Trend */}
            {metrics.weightTrend.length > 1 && (
              <Card className="glass p-5">
                <h3 className="font-heading font-bold text-sm mb-4 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" />
                  Weight Progress
                </h3>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={metrics.weightTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis domain={["dataMin - 1", "dataMax + 1"]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={35} />
                      <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: 12 }} />
                      <Line type="monotone" dataKey="weight" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* CTA to Coach */}
        <Card className="glass p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm">Need personalized advice?</p>
              <p className="text-xs text-muted-foreground">Chat with Mr. Livana for tailored nutrition coaching</p>
            </div>
          </div>
          <Link to="/coach">
            <Button variant="hero" size="sm" className="gap-1.5">
              Talk to Mr. Livana <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </Card>
      </div>
    </PageLayout>
  );
};

export default HealthTwin;