import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export type HealthMetrics = {
  healthScore: number;
  calorieBalance: number;
  calorieTarget: number;
  caloriesConsumed: number;
  metabolismRate: number;
  nutritionScore: number;
  energyLevel: number;
  waterProgress: number;
  waterTarget: number;
  proteinConsumed: number;
  proteinTarget: number;
  carbsConsumed: number;
  carbsTarget: number;
  fatConsumed: number;
  fatTarget: number;
  fiberConsumed: number;
  weightTrend: { date: string; weight: number }[];
  calorieTrend: { date: string; calories: number }[];
  weeklyWeightChange: number;
  surplus: boolean;
  workoutsBurned: number;
  workoutsToday: number;
  workoutDuration: number;
  netCalories: number;
  todayFoods: { food_name: string; meal_type: string; calories: number; protein_g: number; carbs_g: number; fat_g: number; logged_at: string }[];
  todayWorkouts: { exercise_name: string; workout_type: string; duration_min: number; calories_burned: number; sets: number | null; reps: number | null; weight_kg: number | null }[];
};

export function useHealthTwin() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [foodLogs, setFoodLogs] = useState<any[]>([]);
  const [waterLogs, setWaterLogs] = useState<any[]>([]);
  const [weightLogs, setWeightLogs] = useState<any[]>([]);
  const [workoutLogs, setWorkoutLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const fetchAll = async () => {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0];
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

      const [profileRes, foodRes, waterRes, weightRes, workoutRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("food_logs").select("*").eq("user_id", user.id).gte("logged_at", weekAgo).order("logged_at", { ascending: true }),
        supabase.from("water_logs").select("*").eq("user_id", user.id).gte("logged_at", today).order("logged_at", { ascending: true }),
        supabase.from("weight_logs").select("*").eq("user_id", user.id).order("logged_at", { ascending: false }).limit(30),
        supabase.from("workout_logs").select("*").eq("user_id", user.id).gte("logged_at", weekAgo).order("logged_at", { ascending: false }),
      ]);

      setProfile(profileRes.data);
      setFoodLogs(foodRes.data ?? []);
      setWaterLogs(waterRes.data ?? []);
      setWeightLogs(weightRes.data ?? []);
      setWorkoutLogs(workoutRes.data ?? []);
      setLoading(false);
    };

    fetchAll();
  }, [user]);

  const metrics = useMemo<HealthMetrics>(() => {
    const p = profile;
    const calorieTarget = p?.daily_calorie_target ?? 2000;
    const proteinTarget = p?.daily_protein_target ?? 100;
    const carbsTarget = p?.daily_carbs_target ?? 250;
    const fatTarget = p?.daily_fat_target ?? 65;
    const waterTarget = p?.daily_water_target ?? 8;

    const today = new Date().toISOString().split("T")[0];
    const todayFood = foodLogs.filter(f => f.logged_at?.startsWith(today));
    const caloriesConsumed = todayFood.reduce((s, f) => s + (f.calories ?? 0), 0);
    const proteinConsumed = todayFood.reduce((s, f) => s + (f.protein_g ?? 0), 0);
    const carbsConsumed = todayFood.reduce((s, f) => s + (f.carbs_g ?? 0), 0);
    const fatConsumed = todayFood.reduce((s, f) => s + (f.fat_g ?? 0), 0);
    const fiberConsumed = todayFood.reduce((s, f) => s + (f.fiber_g ?? 0), 0);
    const waterProgress = waterLogs.reduce((s, w) => s + (w.glasses ?? 0), 0);

    // Today's workouts
    const todayWorkoutsRaw = workoutLogs.filter(w => w.logged_at?.startsWith(today));
    const workoutsBurned = todayWorkoutsRaw.reduce((s, w) => s + (w.calories_burned ?? 0), 0);
    const workoutDuration = todayWorkoutsRaw.reduce((s, w) => s + (w.duration_min ?? 0), 0);
    const netCalories = caloriesConsumed - workoutsBurned;

    // Metabolism estimate (Mifflin-St Jeor)
    const w = p?.weight_kg ?? 70;
    const h = p?.height_cm ?? 170;
    const age = p?.age ?? 30;
    const gender = p?.gender ?? "male";
    let bmr = 10 * w + 6.25 * h - 5 * age;
    bmr = gender === "female" ? bmr - 161 : bmr + 5;
    const activityMultiplier: Record<string, number> = {
      sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
    };
    const metabolismRate = Math.round(bmr * (activityMultiplier[p?.activity_level ?? "moderate"] ?? 1.55));

    const calorieBalance = caloriesConsumed - calorieTarget;
    const surplus = calorieBalance > 0;

    const proteinRatio = Math.min(proteinConsumed / proteinTarget, 1.2);
    const carbsRatio = Math.min(carbsConsumed / carbsTarget, 1.2);
    const fatRatio = Math.min(fatConsumed / fatTarget, 1.2);
    const calRatio = calorieTarget > 0 ? Math.min(caloriesConsumed / calorieTarget, 1.2) : 0;
    const nutritionScore = Math.round(
      (1 - Math.abs(1 - proteinRatio) * 0.3 - Math.abs(1 - carbsRatio) * 0.2 - Math.abs(1 - fatRatio) * 0.2 - Math.abs(1 - calRatio) * 0.3) * 100
    );

    const workoutBonus = workoutsBurned > 0 ? 10 : 0;
    const energyLevel = Math.max(20, Math.min(100, Math.round(
      60 + (calRatio > 0.5 ? 15 : -10) + (proteinRatio > 0.5 ? 10 : -5) + (waterProgress >= waterTarget * 0.5 ? 15 : -10) + workoutBonus
    )));

    const healthScore = Math.max(0, Math.min(100, Math.round(
      nutritionScore * 0.35 + energyLevel * 0.25 + Math.min(waterProgress / waterTarget, 1) * 100 * 0.2 + (workoutsBurned > 0 ? 20 : 0)
    )));

    const weightTrend = [...weightLogs].reverse().map(w => ({
      date: new Date(w.logged_at).toLocaleDateString("en", { month: "short", day: "numeric" }),
      weight: Number(w.weight_kg),
    }));

    const weeklyWeightChange = weightLogs.length >= 2
      ? Number(weightLogs[0].weight_kg) - Number(weightLogs[weightLogs.length - 1].weight_kg)
      : 0;

    const calorieTrend: { date: string; calories: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en", { weekday: "short" });
      const dayCalories = foodLogs.filter(f => f.logged_at?.startsWith(dateStr)).reduce((s, f) => s + (f.calories ?? 0), 0);
      calorieTrend.push({ date: label, calories: dayCalories });
    }

    const todayFoods = todayFood.map(f => ({
      food_name: f.food_name, meal_type: f.meal_type, calories: f.calories ?? 0,
      protein_g: f.protein_g ?? 0, carbs_g: f.carbs_g ?? 0, fat_g: f.fat_g ?? 0, logged_at: f.logged_at,
    }));

    const todayWorkouts = todayWorkoutsRaw.map(w => ({
      exercise_name: w.exercise_name, workout_type: w.workout_type,
      duration_min: w.duration_min ?? 0, calories_burned: w.calories_burned ?? 0,
      sets: w.sets, reps: w.reps, weight_kg: w.weight_kg,
    }));

    return {
      healthScore, calorieBalance, calorieTarget, caloriesConsumed, metabolismRate,
      nutritionScore: Math.max(0, nutritionScore), energyLevel, waterProgress, waterTarget,
      proteinConsumed, proteinTarget, carbsConsumed, carbsTarget, fatConsumed, fatTarget,
      fiberConsumed, weightTrend, calorieTrend, weeklyWeightChange, surplus,
      workoutsBurned, workoutsToday: todayWorkoutsRaw.length, workoutDuration, netCalories,
      todayFoods, todayWorkouts,
    };
  }, [profile, foodLogs, waterLogs, weightLogs, workoutLogs]);

  return { metrics, loading, profile };
}
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [foodLogs, setFoodLogs] = useState<any[]>([]);
  const [waterLogs, setWaterLogs] = useState<any[]>([]);
  const [weightLogs, setWeightLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    const fetchAll = async () => {
      setLoading(true);
      const today = new Date().toISOString().split("T")[0];
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

      const [profileRes, foodRes, waterRes, weightRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("food_logs").select("*").eq("user_id", user.id).gte("logged_at", weekAgo).order("logged_at", { ascending: true }),
        supabase.from("water_logs").select("*").eq("user_id", user.id).gte("logged_at", today).order("logged_at", { ascending: true }),
        supabase.from("weight_logs").select("*").eq("user_id", user.id).order("logged_at", { ascending: false }).limit(30),
      ]);

      setProfile(profileRes.data);
      setFoodLogs(foodRes.data ?? []);
      setWaterLogs(waterRes.data ?? []);
      setWeightLogs(weightRes.data ?? []);
      setLoading(false);
    };

    fetchAll();
  }, [user]);

  const metrics = useMemo<HealthMetrics>(() => {
    const p = profile;
    const calorieTarget = p?.daily_calorie_target ?? 2000;
    const proteinTarget = p?.daily_protein_target ?? 100;
    const carbsTarget = p?.daily_carbs_target ?? 250;
    const fatTarget = p?.daily_fat_target ?? 65;
    const waterTarget = p?.daily_water_target ?? 8;

    // Today's food
    const today = new Date().toISOString().split("T")[0];
    const todayFood = foodLogs.filter(f => f.logged_at?.startsWith(today));
    const caloriesConsumed = todayFood.reduce((s, f) => s + (f.calories ?? 0), 0);
    const proteinConsumed = todayFood.reduce((s, f) => s + (f.protein_g ?? 0), 0);
    const carbsConsumed = todayFood.reduce((s, f) => s + (f.carbs_g ?? 0), 0);
    const fatConsumed = todayFood.reduce((s, f) => s + (f.fat_g ?? 0), 0);
    const fiberConsumed = todayFood.reduce((s, f) => s + (f.fiber_g ?? 0), 0);
    const waterProgress = waterLogs.reduce((s, w) => s + (w.glasses ?? 0), 0);

    // Metabolism estimate (Mifflin-St Jeor)
    const w = p?.weight_kg ?? 70;
    const h = p?.height_cm ?? 170;
    const age = p?.age ?? 30;
    const gender = p?.gender ?? "male";
    let bmr = 10 * w + 6.25 * h - 5 * age;
    bmr = gender === "female" ? bmr - 161 : bmr + 5;
    const activityMultiplier: Record<string, number> = {
      sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9,
    };
    const metabolismRate = Math.round(bmr * (activityMultiplier[p?.activity_level ?? "moderate"] ?? 1.55));

    // Calorie balance
    const calorieBalance = caloriesConsumed - calorieTarget;
    const surplus = calorieBalance > 0;

    // Nutrition score (how close to targets)
    const proteinRatio = Math.min(proteinConsumed / proteinTarget, 1.2);
    const carbsRatio = Math.min(carbsConsumed / carbsTarget, 1.2);
    const fatRatio = Math.min(fatConsumed / fatTarget, 1.2);
    const calRatio = calorieTarget > 0 ? Math.min(caloriesConsumed / calorieTarget, 1.2) : 0;
    const nutritionScore = Math.round(
      (1 - Math.abs(1 - proteinRatio) * 0.3 - Math.abs(1 - carbsRatio) * 0.2 - Math.abs(1 - fatRatio) * 0.2 - Math.abs(1 - calRatio) * 0.3) * 100
    );

    // Energy level prediction (based on intake adequacy)
    const energyLevel = Math.max(20, Math.min(100, Math.round(
      60 + (calRatio > 0.5 ? 15 : -10) + (proteinRatio > 0.5 ? 10 : -5) + (waterProgress >= waterTarget * 0.5 ? 15 : -10)
    )));

    // Health score composite
    const healthScore = Math.max(0, Math.min(100, Math.round(
      nutritionScore * 0.4 + energyLevel * 0.3 + Math.min(waterProgress / waterTarget, 1) * 100 * 0.3
    )));

    // Weight trend
    const weightTrend = [...weightLogs].reverse().map(w => ({
      date: new Date(w.logged_at).toLocaleDateString("en", { month: "short", day: "numeric" }),
      weight: Number(w.weight_kg),
    }));

    // Weekly weight change
    const weeklyWeightChange = weightLogs.length >= 2
      ? Number(weightLogs[0].weight_kg) - Number(weightLogs[weightLogs.length - 1].weight_kg)
      : 0;

    // Calorie trend (last 7 days)
    const calorieTrend: { date: string; calories: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en", { weekday: "short" });
      const dayCalories = foodLogs.filter(f => f.logged_at?.startsWith(dateStr)).reduce((s, f) => s + (f.calories ?? 0), 0);
      calorieTrend.push({ date: label, calories: dayCalories });
    }

    return {
      healthScore, calorieBalance, calorieTarget, caloriesConsumed, metabolismRate,
      nutritionScore: Math.max(0, nutritionScore), energyLevel, waterProgress, waterTarget,
      proteinConsumed, proteinTarget, carbsConsumed, carbsTarget, fatConsumed, fatTarget,
      fiberConsumed, weightTrend, calorieTrend, weeklyWeightChange, surplus,
    };
  }, [profile, foodLogs, waterLogs, weightLogs]);

  return { metrics, loading, profile };
}
