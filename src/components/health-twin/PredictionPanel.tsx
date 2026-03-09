import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, Search, Zap, TrendingUp, Flame, Apple } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { HealthMetrics } from "@/hooks/use-health-twin";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

interface PredictionPanelProps {
  metrics: HealthMetrics;
}

type Prediction = {
  calorieImpact: number;
  proteinImpact: number;
  newBalance: number;
  energyEffect: string;
  weightEffect: string;
  tip: string;
};

const PredictionPanel = ({ metrics }: PredictionPanelProps) => {
  const { toast } = useToast();
  const [meal, setMeal] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const simulate = async () => {
    if (!meal.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          type: "health_twin_predict",
          messages: [{ role: "user", content: meal }],
          context: {
            caloriesConsumed: metrics.caloriesConsumed,
            calorieTarget: metrics.calorieTarget,
            proteinConsumed: metrics.proteinConsumed,
            proteinTarget: metrics.proteinTarget,
            metabolismRate: metrics.metabolismRate,
            healthScore: metrics.healthScore,
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to get prediction");

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        const cleaned = content.replace(/```json\n?/g, "").replace(/```/g, "").trim();
        setPrediction(JSON.parse(cleaned));
      }
    } catch (e) {
      toast({ title: "Error", description: "Could not simulate meal impact.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-bold text-sm">Meal Impact Simulator</h3>
          <p className="text-[11px] text-muted-foreground">See how a meal affects your body</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={meal}
            onChange={e => setMeal(e.target.value)}
            placeholder="e.g. Grilled chicken salad with rice"
            className="pl-9 bg-background/50 border-border/40 h-10"
            onKeyDown={e => e.key === "Enter" && simulate()}
          />
        </div>
        <Button variant="hero" size="sm" onClick={simulate} disabled={loading || !meal.trim()} className="h-10 px-4">
          {loading ? "Analyzing..." : "Simulate"}
        </Button>
      </div>

      {prediction && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-muted/30 p-3 flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-orange-400" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Calorie Impact</p>
                <p className="text-sm font-bold text-foreground">+{prediction.calorieImpact} kcal</p>
              </div>
            </div>
            <div className="rounded-xl bg-muted/30 p-3 flex items-center gap-2.5">
              <Apple className="w-4 h-4 text-primary" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Protein</p>
                <p className="text-sm font-bold text-foreground">+{prediction.proteinImpact}g</p>
              </div>
            </div>
            <div className="rounded-xl bg-muted/30 p-3 flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">New Balance</p>
                <p className="text-sm font-bold text-foreground">{prediction.newBalance > 0 ? "+" : ""}{prediction.newBalance} kcal</p>
              </div>
            </div>
            <div className="rounded-xl bg-muted/30 p-3 flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-yellow-400" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Energy</p>
                <p className="text-sm font-bold text-foreground">{prediction.energyEffect}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-primary/5 border border-primary/15 p-3">
            <p className="text-xs text-foreground leading-relaxed">💡 {prediction.tip}</p>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PredictionPanel;
