import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown,
  Flame, 
  Target,
  Trophy,
  Calendar,
  Droplet,
  Moon,
  Footprints
} from "lucide-react";

const stats = [
  {
    label: "Daily Calories",
    value: "1,850",
    target: "2,000",
    progress: 92,
    trend: "up",
    icon: Flame
  },
  {
    label: "Protein Intake",
    value: "120g",
    target: "140g",
    progress: 86,
    trend: "up",
    icon: Target
  },
  {
    label: "Water Intake",
    value: "2.5L",
    target: "3L",
    progress: 83,
    trend: "up",
    icon: Droplet
  },
  {
    label: "Sleep Quality",
    value: "7.5h",
    target: "8h",
    progress: 94,
    trend: "up",
    icon: Moon
  }
];

const weeklyData = [
  { day: "Mon", calories: 1850, protein: 125, target: 2000 },
  { day: "Tue", calories: 1920, protein: 130, target: 2000 },
  { day: "Wed", calories: 1780, protein: 118, target: 2000 },
  { day: "Thu", calories: 1950, protein: 135, target: 2000 },
  { day: "Fri", calories: 2100, protein: 142, target: 2000 },
  { day: "Sat", calories: 1650, protein: 110, target: 2000 },
  { day: "Sun", calories: 1850, protein: 120, target: 2000 }
];

const achievements = [
  { name: "7-Day Streak", description: "Logged meals for 7 consecutive days", completed: true },
  { name: "Protein Champion", description: "Hit protein goal 5 days in a row", completed: true },
  { name: "Hydration Hero", description: "Drink 3L water daily for a week", completed: false },
  { name: "Veggie Lover", description: "Eat 5 servings of vegetables daily", completed: false }
];

const ProgressDashboard = () => {
  const maxCalories = Math.max(...weeklyData.map(d => d.calories));

  return (
    <PageLayout 
      title="Progress Dashboard" 
      subtitle="Track your nutrition journey with insights and adaptive recommendations."
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass group hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-primary" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-destructive" />
                )}
              </div>
              <p className="text-2xl font-bold mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground mb-2">of {stat.target}</p>
              <ProgressBar value={stat.progress} className="h-1.5" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Weekly Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between h-48 gap-2">
              {weeklyData.map((day, i) => {
                const height = (day.calories / maxCalories) * 100;
                const isToday = i === weeklyData.length - 1;
                return (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative" style={{ height: '160px' }}>
                      <div 
                        className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer ${
                          isToday ? 'bg-primary glow-primary' : 'bg-primary/50'
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      <div 
                        className="absolute bottom-0 w-full border-t-2 border-dashed border-accent/50"
                        style={{ bottom: `${(day.target / maxCalories) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs ${isToday ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                      {day.day}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-primary" />
                <span className="text-muted-foreground">Calories</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 border-t-2 border-dashed border-accent/50" />
                <span className="text-muted-foreground">Target</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.name}
                className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer hover:scale-102 ${
                  achievement.completed 
                    ? 'bg-primary/10 border-primary/30' 
                    : 'bg-muted/30 border-border/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    achievement.completed ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {achievement.completed ? (
                      <Trophy className="w-4 h-4" />
                    ) : (
                      <Target className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className={`font-medium text-sm ${achievement.completed ? 'text-primary' : ''}`}>
                      {achievement.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Encouragement */}
      <Card className="glass mt-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <CardContent className="p-6 relative">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Footprints className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Great progress this week! 🎉</h3>
              <p className="text-muted-foreground">
                You've consistently hit your protein goals. Keep up the momentum!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default ProgressDashboard;
