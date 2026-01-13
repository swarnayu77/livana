import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Sparkles, 
  Flame, 
  Beef, 
  Wheat, 
  Droplet,
  Leaf,
  Zap,
  Heart,
  Loader2
} from "lucide-react";

type Analysis = {
  name: string;
  calories: number;
  macros: { protein: number; carbs: number; fat: number; fiber: number };
  insights: string[];
  suggestions: string[];
  score: number;
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const NutrientAnalysis = () => {
  const { toast } = useToast();
  const [mealInput, setMealInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const handleAnalyze = async () => {
    if (!mealInput.trim()) {
      toast({
        title: "Please describe a meal",
        description: "Enter what you ate or a recipe to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setAnalysis(null);

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: `Analyze this meal: ${mealInput}` }],
          type: "analysis",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze meal");
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error("No analysis returned");
      }

      // Parse the JSON response
      const parsed = JSON.parse(content);
      setAnalysis(parsed);
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Could not analyze the meal",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading || !mealInput.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze with AI
                </>
              )}
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
