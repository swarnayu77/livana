import { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  AreaChart, Area,
} from "recharts";
import { TrendingUp, Flame, Beef, Wheat, Droplet } from "lucide-react";

type DayData = {
  day: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

const WeeklyTrendsChart = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWeeklyData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const weekStart = startOfDay(subDays(new Date(), 6)).toISOString();
    const todayEnd = endOfDay(new Date()).toISOString();

    const { data: logs } = await supabase
      .from("food_logs")
      .select("calories, protein_g, carbs_g, fat_g, logged_at")
      .eq("user_id", user.id)
      .gte("logged_at", weekStart)
      .lte("logged_at", todayEnd);

    const days: DayData[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = subDays(new Date(), i);
      const dateStr = format(d, "yyyy-MM-dd");
      const dayLogs = (logs ?? []).filter((l: any) => l.logged_at?.startsWith(dateStr));
      days.push({
        day: format(d, "EEE"),
        date: format(d, "MMM d"),
        calories: dayLogs.reduce((s: number, l: any) => s + Number(l.calories ?? 0), 0),
        protein: dayLogs.reduce((s: number, l: any) => s + Number(l.protein_g ?? 0), 0),
        carbs: dayLogs.reduce((s: number, l: any) => s + Number(l.carbs_g ?? 0), 0),
        fat: dayLogs.reduce((s: number, l: any) => s + Number(l.fat_g ?? 0), 0),
      });
    }
    setData(days);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchWeeklyData();
  }, [fetchWeeklyData]);

  const avgCalories = data.length ? Math.round(data.reduce((s, d) => s + d.calories, 0) / data.length) : 0;
  const avgProtein = data.length ? Math.round(data.reduce((s, d) => s + d.protein, 0) / data.length) : 0;
  const avgCarbs = data.length ? Math.round(data.reduce((s, d) => s + d.carbs, 0) / data.length) : 0;
  const avgFat = data.length ? Math.round(data.reduce((s, d) => s + d.fat, 0) / data.length) : 0;

  if (loading) {
    return (
      <Card className="glass-card rounded-2xl p-8 text-center">
        <span className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin inline-block" />
        <p className="text-xs text-muted-foreground mt-3">Loading weekly trends...</p>
      </Card>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-xl border border-border/50 bg-background/95 backdrop-blur-sm px-3 py-2.5 shadow-xl text-xs">
        <p className="font-semibold text-foreground mb-1.5">{payload[0]?.payload?.date}</p>
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center gap-2 py-0.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-muted-foreground capitalize">{p.dataKey}:</span>
            <span className="font-semibold text-foreground">
              {Math.round(p.value)}{p.dataKey === "calories" ? " cal" : "g"}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Averages row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Avg Cal", value: avgCalories, unit: "", icon: Flame, color: "text-primary" },
          { label: "Avg Protein", value: avgProtein, unit: "g", icon: Beef, color: "text-emerald-500" },
          { label: "Avg Carbs", value: avgCarbs, unit: "g", icon: Wheat, color: "text-sky-500" },
          { label: "Avg Fat", value: avgFat, unit: "g", icon: Droplet, color: "text-amber-500" },
        ].map((stat) => (
          <Card key={stat.label} className="glass-card rounded-2xl p-3 text-center">
            <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
            <p className="text-lg font-bold text-foreground">{stat.value}{stat.unit}</p>
            <p className="text-[9px] text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Calories trend */}
      <Card className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Calorie Trend</h3>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="calGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={40} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="calories" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#calGrad)" dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "hsl(var(--background))" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Macros stacked bar */}
      <Card className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Macro Breakdown</h3>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={40} unit="g" />
              <Tooltip content={<CustomTooltip />} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
              <Bar dataKey="protein" stackId="macros" fill="hsl(152, 70%, 45%)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="carbs" stackId="macros" fill="hsl(200, 70%, 50%)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="fat" stackId="macros" fill="hsl(40, 90%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default WeeklyTrendsChart;
