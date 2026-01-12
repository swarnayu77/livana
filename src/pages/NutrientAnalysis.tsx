import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Sparkles, 
  Flame, 
  Beef, 
  Wheat, 
  Droplet,
  Leaf,
  Zap,
  Heart
} from "lucide-react";

const NutrientAnalysis = () => {
  const [mealInput, setMealInput] = useState("");
  const [analysis, setAnalysis] = useState<null | {
    name: string;
    calories: number;
    macros: { protein: number; carbs: number; fat: number; fiber: number };
    insights: string[];
    suggestions: string[];
    score: number;
  }>(null);

  const handleAnalyze = () => {
    // Simulated analysis result
    setAnalysis({
      name: "Grilled Chicken Salad with Quinoa",
      calories: 485,
      macros: { protein: 38, carbs: 42, fat: 18, fiber: 8 },
      insights: [
        "High protein content - great for muscle recovery",
        "Good fiber intake from quinoa and vegetables",
        "Moderate fat from olive oil dressing"
      ],
      suggestions: [
        "Add avocado for healthy fats and vitamin E",
        "Include more leafy greens for iron",
        "Consider adding chickpeas for extra protein"
      ],
      score: 85
    });
  };

  return (
    <PageLayout 
      title="Smart Nutrient Analysis" 
      subtitle="Analyze any meal for detailed nutritional breakdown with AI-powered insights."
    >
      {/* Input Section */}
      <Card className="glass mb-8">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Describe your meal or paste a recipe
              </label>
              <Textarea
                placeholder="E.g., Grilled chicken breast with quinoa, mixed greens, cherry tomatoes, cucumber, and olive oil dressing..."
                value={mealInput}
                onChange={(e) => setMealInput(e.target.value)}
                className="min-h-[120px] bg-muted/50 border-border/50 focus:border-primary"
              />
            </div>
            <Button 
              variant="hero" 
              className="gap-2"
              onClick={handleAnalyze}
            >
              <Sparkles className="w-4 h-4" />
              Analyze with AI
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6 animate-slide-up">
          {/* Score Card */}
          <Card className="glass overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{analysis.name}</h3>
                  <div className="flex items-center gap-2 text-3xl font-bold text-primary">
                    <Flame className="w-7 h-7" />
                    {analysis.calories} kcal
                  </div>
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center glow-primary">
                    <span className="text-2xl font-bold">{analysis.score}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Health Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Macros Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="glass group hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-4 text-center">
                <Beef className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                <p className="text-2xl font-bold">{analysis.macros.protein}g</p>
                <p className="text-sm text-muted-foreground">Protein</p>
              </CardContent>
            </Card>
            <Card className="glass group hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-4 text-center">
                <Wheat className="w-8 h-8 mx-auto mb-2 text-accent group-hover:scale-110 transition-transform" />
                <p className="text-2xl font-bold">{analysis.macros.carbs}g</p>
                <p className="text-sm text-muted-foreground">Carbs</p>
              </CardContent>
            </Card>
            <Card className="glass group hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-4 text-center">
                <Droplet className="w-8 h-8 mx-auto mb-2 text-secondary group-hover:scale-110 transition-transform" />
                <p className="text-2xl font-bold">{analysis.macros.fat}g</p>
                <p className="text-sm text-muted-foreground">Fat</p>
              </CardContent>
            </Card>
            <Card className="glass group hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer">
              <CardContent className="p-4 text-center">
                <Leaf className="w-8 h-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
                <p className="text-2xl font-bold">{analysis.macros.fiber}g</p>
                <p className="text-sm text-muted-foreground">Fiber</p>
              </CardContent>
            </Card>
          </div>

          {/* Insights & Suggestions */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5 text-primary" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysis.insights.map((insight, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                    <p className="text-muted-foreground">{insight}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5 text-accent" />
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {analysis.suggestions.map((suggestion, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                    <p className="text-muted-foreground">{suggestion}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default NutrientAnalysis;
