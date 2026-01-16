import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Clock, 
  Flame, 
  Search,
  ChefHat,
  Heart,
  Users,
  Sparkles,
  Filter,
  BookOpen,
  CheckCircle2,
  Timer,
  UtensilsCrossed,
  Loader2,
  Bot
} from "lucide-react";
import mealBowl from "@/assets/meal-bowl.jpg";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const categories = [
  { id: "all", label: "All Recipes" },
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snacks", label: "Snacks" },
  { id: "desserts", label: "Healthy Desserts" }
];

const dietFilters = [
  "High Protein", "Low Carb", "Vegetarian", "Vegan", 
  "Gluten-Free", "Dairy-Free", "Keto", "Quick & Easy"
];

const defaultRecipes = [
  {
    id: 1,
    name: "Mediterranean Buddha Bowl",
    image: mealBowl,
    category: "lunch",
    prepTime: 15,
    cookTime: 20,
    calories: 520,
    servings: 2,
    difficulty: "Easy",
    tags: ["High Protein", "Gluten-Free"],
    ingredients: [
      "1 cup quinoa, cooked",
      "1 can chickpeas, drained",
      "1 cucumber, diced",
      "1 cup cherry tomatoes, halved",
      "1/2 cup feta cheese, crumbled",
      "1/4 cup kalamata olives",
      "Fresh parsley",
      "Lemon tahini dressing"
    ],
    instructions: [
      "Cook quinoa according to package directions and let cool slightly.",
      "Drain and rinse chickpeas, then season with salt, pepper, and cumin.",
      "Dice cucumber and halve cherry tomatoes.",
      "Arrange quinoa in bowls and top with chickpeas, cucumber, tomatoes.",
      "Add crumbled feta and olives.",
      "Drizzle with lemon tahini dressing and garnish with fresh parsley."
    ],
    nutrition: { protein: 28, carbs: 52, fat: 22, fiber: 12 },
    liked: true
  },
  {
    id: 2,
    name: "Grilled Salmon with Asparagus",
    image: mealBowl,
    category: "dinner",
    prepTime: 10,
    cookTime: 15,
    calories: 480,
    servings: 2,
    difficulty: "Medium",
    tags: ["Omega-3", "Low Carb", "Keto"],
    ingredients: [
      "2 salmon fillets (6 oz each)",
      "1 bunch asparagus, trimmed",
      "2 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 lemon, zested and juiced",
      "Fresh dill",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Preheat grill to medium-high heat.",
      "Season salmon with salt, pepper, lemon zest, and half the lemon juice.",
      "Toss asparagus with olive oil, garlic, salt, and pepper.",
      "Grill salmon skin-side down for 4-5 minutes per side.",
      "Grill asparagus for 3-4 minutes, turning occasionally.",
      "Serve salmon over asparagus, drizzle with remaining lemon juice and garnish with dill."
    ],
    nutrition: { protein: 42, carbs: 8, fat: 28, fiber: 4 },
    liked: false
  },
  {
    id: 3,
    name: "Overnight Protein Oats",
    image: mealBowl,
    category: "breakfast",
    prepTime: 5,
    cookTime: 0,
    calories: 380,
    servings: 1,
    difficulty: "Easy",
    tags: ["Meal Prep", "High Fiber", "Quick & Easy"],
    ingredients: [
      "1/2 cup rolled oats",
      "1 scoop vanilla protein powder",
      "1/2 cup Greek yogurt",
      "1/2 cup almond milk",
      "1 tbsp chia seeds",
      "1/2 cup mixed berries",
      "1 tbsp honey or maple syrup",
      "Sliced almonds for topping"
    ],
    instructions: [
      "In a jar or container, combine oats, protein powder, and chia seeds.",
      "Add Greek yogurt and almond milk, stir well.",
      "Add honey and mix until combined.",
      "Top with berries but don't stir.",
      "Cover and refrigerate overnight (at least 4 hours).",
      "In the morning, add more milk if desired and top with almonds."
    ],
    nutrition: { protein: 32, carbs: 45, fat: 12, fiber: 8 },
    liked: true
  }
];

type Recipe = typeof defaultRecipes[0];

type GeneratedRecipe = {
  name: string;
  prepTime: number;
  cookTime: number;
  calories: number;
  servings: number;
  difficulty: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  nutrition: { protein: number; carbs: number; fat: number; fiber: number };
};

const Recipes = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<number[]>(
    defaultRecipes.filter(r => r.liked).map(r => r.id)
  );
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState(defaultRecipes);
  
  // AI Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipePrompt, setRecipePrompt] = useState("");
  const [generatedRecipe, setGeneratedRecipe] = useState<GeneratedRecipe | null>(null);

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedRecipes(prev => 
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory;
    
    const matchesFilters = selectedFilters.length === 0 || 
      selectedFilters.some(filter => recipe.tags.includes(filter));

    return matchesSearch && matchesCategory && matchesFilters;
  });

  const generateRecipe = async () => {
    if (!recipePrompt.trim()) {
      toast({
        title: "Please describe a recipe",
        description: "Enter what kind of recipe you want to create",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedRecipe(null);

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ 
            role: "user", 
            content: `Create a detailed recipe for: ${recipePrompt}

Return ONLY a JSON object with this structure:
{
  "name": "recipe name",
  "prepTime": minutes as number,
  "cookTime": minutes as number,
  "calories": number,
  "servings": number,
  "difficulty": "Easy/Medium/Hard",
  "tags": ["tag1", "tag2"],
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": ["step 1", "step 2"],
  "nutrition": { "protein": grams, "carbs": grams, "fat": grams, "fiber": grams }
}

Return ONLY the JSON object, no other text.`
          }],
          type: "analysis",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate recipe");
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error("No recipe returned");
      }

      const parsed = JSON.parse(content);
      setGeneratedRecipe(parsed);
      toast({
        title: "Recipe created! 🍳",
        description: `${parsed.name} is ready`,
      });
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "Could not generate recipe",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageLayout 
      title="AI Recipe Generator" 
      subtitle="Discover and create healthy recipes with AI-powered suggestions tailored to your preferences."
    >
      {/* AI Recipe Generator */}
      <Card className="glass mb-8 border-primary/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">AI Recipe Creator</h3>
              <p className="text-sm text-muted-foreground">Describe any dish and AI will create a complete recipe</p>
            </div>
          </div>
          <Textarea
            placeholder="E.g., high protein chicken stir-fry with vegetables, keto-friendly salmon dinner, quick vegetarian pasta..."
            value={recipePrompt}
            onChange={(e) => setRecipePrompt(e.target.value)}
            className="min-h-[80px] bg-muted/50 border-border/50 focus:border-primary mb-4"
          />
          <Button 
            variant="hero" 
            className="gap-2"
            onClick={generateRecipe}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Recipe...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Recipe
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Recipe Display */}
      {generatedRecipe && (
        <Card className="glass mb-8 border-primary/30 animate-slide-up">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-primary">{generatedRecipe.name}</h3>
              <Badge className="bg-primary/20 text-primary">AI Generated</Badge>
            </div>
            
            {/* Quick Info */}
            <div className="grid grid-cols-4 gap-4 mb-6 text-center">
              <div className="p-3 rounded-lg bg-muted/50">
                <Timer className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium">{generatedRecipe.prepTime + generatedRecipe.cookTime} min</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <Flame className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium">{generatedRecipe.calories}</p>
                <p className="text-xs text-muted-foreground">Calories</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium">{generatedRecipe.servings}</p>
                <p className="text-xs text-muted-foreground">Servings</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <ChefHat className="w-5 h-5 mx-auto mb-1 text-primary" />
                <p className="text-sm font-medium">{generatedRecipe.difficulty}</p>
                <p className="text-xs text-muted-foreground">Difficulty</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {generatedRecipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Ingredients */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-primary" />
                  Ingredients
                </h4>
                <ul className="space-y-2">
                  {generatedRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  Instructions
                </h4>
                <ol className="space-y-3">
                  {generatedRecipe.instructions.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-medium">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Nutrition */}
            <div className="mt-6 pt-6 border-t border-border/50">
              <h4 className="font-semibold mb-3">Nutrition per Serving</h4>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-primary">{generatedRecipe.nutrition.protein}g</p>
                  <p className="text-xs text-muted-foreground">Protein</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-accent">{generatedRecipe.nutrition.carbs}g</p>
                  <p className="text-xs text-muted-foreground">Carbs</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-secondary">{generatedRecipe.nutrition.fat}g</p>
                  <p className="text-xs text-muted-foreground">Fat</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-primary">{generatedRecipe.nutrition.fiber}g</p>
                  <p className="text-xs text-muted-foreground">Fiber</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search & Filters */}
      <div className="space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by recipe, ingredient, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50 focus:border-primary h-12"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "hero" : "glass"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </ScrollArea>

        {/* Diet Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {dietFilters.map((filter) => (
            <Badge
              key={filter}
              variant={selectedFilters.includes(filter) ? "default" : "outline"}
              className={`cursor-pointer transition-all hover:scale-105 ${
                selectedFilters.includes(filter) 
                  ? "bg-primary hover:bg-primary/90" 
                  : "hover:border-primary/50"
              }`}
              onClick={() => toggleFilter(filter)}
            >
              {filter}
            </Badge>
          ))}
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Dialog key={recipe.id}>
            <DialogTrigger asChild>
              <Card 
                className="glass overflow-hidden group hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
                onClick={() => setSelectedRecipe(recipe)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <button 
                    onClick={(e) => toggleLike(recipe.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors z-10"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-colors ${
                        likedRecipes.includes(recipe.id) 
                          ? "fill-primary text-primary" 
                          : "text-foreground"
                      }`} 
                    />
                  </button>
                  <Badge className="absolute bottom-3 left-3 bg-primary/90">
                    {recipe.difficulty}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {recipe.name}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {recipe.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {recipe.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{recipe.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.prepTime + recipe.cookTime} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-primary" />
                      {recipe.calories} kcal
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {recipe.servings}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass">
              <DialogHeader>
                <DialogTitle className="text-2xl">{recipe.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <img 
                  src={recipe.image} 
                  alt={recipe.name}
                  className="w-full h-56 object-cover rounded-xl"
                />
                
                {/* Quick Info */}
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <Timer className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-sm font-medium">{recipe.prepTime + recipe.cookTime} min</p>
                    <p className="text-xs text-muted-foreground">Total Time</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <Flame className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-sm font-medium">{recipe.calories}</p>
                    <p className="text-xs text-muted-foreground">Calories</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-sm font-medium">{recipe.servings}</p>
                    <p className="text-xs text-muted-foreground">Servings</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <ChefHat className="w-5 h-5 mx-auto mb-1 text-primary" />
                    <p className="text-sm font-medium">{recipe.difficulty}</p>
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <UtensilsCrossed className="w-4 h-4 text-primary" />
                      Ingredients
                    </h4>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      Instructions
                    </h4>
                    <ol className="space-y-3">
                      {recipe.instructions.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 text-xs font-medium">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-semibold mb-3">Nutrition per Serving</h4>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-primary">{recipe.nutrition.protein}g</p>
                      <p className="text-xs text-muted-foreground">Protein</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-accent">{recipe.nutrition.carbs}g</p>
                      <p className="text-xs text-muted-foreground">Carbs</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-secondary">{recipe.nutrition.fat}g</p>
                      <p className="text-xs text-muted-foreground">Fat</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary">{recipe.nutrition.fiber}g</p>
                      <p className="text-xs text-muted-foreground">Fiber</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </PageLayout>
  );
};

export default Recipes;
