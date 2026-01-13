import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  UtensilsCrossed
} from "lucide-react";
import mealBowl from "@/assets/meal-bowl.jpg";

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

const recipes = [
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
  },
  {
    id: 4,
    name: "Thai Coconut Curry",
    image: mealBowl,
    category: "dinner",
    prepTime: 15,
    cookTime: 25,
    calories: 550,
    servings: 4,
    difficulty: "Medium",
    tags: ["Vegetarian", "Dairy-Free", "Vegan"],
    ingredients: [
      "1 block extra-firm tofu, cubed",
      "1 can coconut milk",
      "2 tbsp Thai red curry paste",
      "2 cups mixed vegetables",
      "1 red bell pepper, sliced",
      "2 cups jasmine rice, cooked",
      "Fresh basil and lime for serving"
    ],
    instructions: [
      "Press tofu and cut into cubes.",
      "Heat oil in a large pan, crisp tofu on all sides. Set aside.",
      "In the same pan, add curry paste and cook 1 minute.",
      "Pour in coconut milk and stir well.",
      "Add vegetables and simmer until tender, about 10 minutes.",
      "Return tofu to pan, warm through.",
      "Serve over rice with fresh basil and lime wedges."
    ],
    nutrition: { protein: 18, carbs: 55, fat: 28, fiber: 6 },
    liked: false
  },
  {
    id: 5,
    name: "Avocado Chicken Wrap",
    image: mealBowl,
    category: "lunch",
    prepTime: 10,
    cookTime: 10,
    calories: 450,
    servings: 2,
    difficulty: "Easy",
    tags: ["Quick & Easy", "High Protein"],
    ingredients: [
      "2 whole wheat tortillas",
      "2 grilled chicken breasts, sliced",
      "1 large avocado, mashed",
      "1 cup mixed greens",
      "1/2 cup cherry tomatoes, halved",
      "2 tbsp Greek yogurt",
      "Salt, pepper, lime juice"
    ],
    instructions: [
      "Grill chicken breasts until cooked through, then slice.",
      "Mash avocado with lime juice, salt, and pepper.",
      "Spread avocado mixture on tortillas.",
      "Add a layer of Greek yogurt.",
      "Top with sliced chicken, greens, and tomatoes.",
      "Roll tightly, cut in half, and serve."
    ],
    nutrition: { protein: 38, carbs: 35, fat: 18, fiber: 10 },
    liked: false
  },
  {
    id: 6,
    name: "Zucchini Noodles Primavera",
    image: mealBowl,
    category: "dinner",
    prepTime: 15,
    cookTime: 10,
    calories: 280,
    servings: 2,
    difficulty: "Easy",
    tags: ["Low Carb", "Vegetarian", "Keto", "Gluten-Free"],
    ingredients: [
      "4 medium zucchini, spiralized",
      "1 cup cherry tomatoes, halved",
      "4 cloves garlic, minced",
      "1/4 cup parmesan cheese, grated",
      "Fresh basil leaves",
      "2 tbsp olive oil",
      "Red pepper flakes"
    ],
    instructions: [
      "Spiralize zucchini into noodles.",
      "Heat olive oil in a large pan over medium heat.",
      "Add garlic and cook until fragrant, about 1 minute.",
      "Add cherry tomatoes and cook until slightly softened.",
      "Toss in zucchini noodles and cook 2-3 minutes until just tender.",
      "Remove from heat, add parmesan, basil, and red pepper flakes.",
      "Season with salt and pepper, serve immediately."
    ],
    nutrition: { protein: 12, carbs: 18, fat: 18, fiber: 6 },
    liked: true
  },
  {
    id: 7,
    name: "Berry Protein Smoothie Bowl",
    image: mealBowl,
    category: "breakfast",
    prepTime: 5,
    cookTime: 0,
    calories: 320,
    servings: 1,
    difficulty: "Easy",
    tags: ["Quick & Easy", "High Protein", "Vegetarian"],
    ingredients: [
      "1 cup frozen mixed berries",
      "1 frozen banana",
      "1 scoop protein powder",
      "1/2 cup almond milk",
      "Toppings: granola, fresh berries, coconut flakes, chia seeds"
    ],
    instructions: [
      "Add frozen berries, banana, protein powder, and almond milk to blender.",
      "Blend until thick and smooth (add more milk if needed).",
      "Pour into a bowl.",
      "Arrange toppings in rows: granola, fresh berries, coconut, chia.",
      "Serve immediately and enjoy!"
    ],
    nutrition: { protein: 28, carbs: 42, fat: 8, fiber: 8 },
    liked: false
  },
  {
    id: 8,
    name: "Greek Stuffed Peppers",
    image: mealBowl,
    category: "dinner",
    prepTime: 20,
    cookTime: 35,
    calories: 420,
    servings: 4,
    difficulty: "Medium",
    tags: ["High Protein", "Gluten-Free"],
    ingredients: [
      "4 large bell peppers",
      "1 lb ground turkey",
      "1 cup cooked rice",
      "1 can diced tomatoes",
      "1/2 cup feta cheese",
      "1 tsp dried oregano",
      "Fresh parsley"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "Cut tops off peppers and remove seeds.",
      "Brown ground turkey in a pan, drain excess fat.",
      "Mix turkey with rice, half the tomatoes, oregano, salt, and pepper.",
      "Stuff peppers with mixture and place in baking dish.",
      "Pour remaining tomatoes around peppers.",
      "Bake 35 minutes, top with feta last 5 minutes.",
      "Garnish with parsley and serve."
    ],
    nutrition: { protein: 32, carbs: 28, fat: 18, fiber: 5 },
    liked: false
  }
];

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<number[]>(
    recipes.filter(r => r.liked).map(r => r.id)
  );
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);

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

  return (
    <PageLayout 
      title="Recipe Suggestions" 
      subtitle="Discover healthy, delicious recipes tailored to your dietary preferences and available ingredients."
    >
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
          <Button variant="hero" className="gap-2 h-12">
            <Sparkles className="w-4 h-4" />
            Generate Recipe
          </Button>
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    <p className="text-xs text-muted-foreground">Level</p>
                  </div>
                </div>

                {/* Nutrition */}
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <h4 className="font-semibold mb-3">Nutrition per Serving</h4>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-primary">{recipe.nutrition.protein}g</p>
                      <p className="text-xs text-muted-foreground">Protein</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary">{recipe.nutrition.carbs}g</p>
                      <p className="text-xs text-muted-foreground">Carbs</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary">{recipe.nutrition.fat}g</p>
                      <p className="text-xs text-muted-foreground">Fat</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary">{recipe.nutrition.fiber}g</p>
                      <p className="text-xs text-muted-foreground">Fiber</p>
                    </div>
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-primary" />
                    Ingredients
                  </h4>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Instructions
                  </h4>
                  <ol className="space-y-3">
                    {recipe.instructions.map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-medium shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm text-muted-foreground">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex gap-3">
                  <Button variant="hero" className="flex-1 gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Add to Meal Plan
                  </Button>
                  <Button variant="glass" size="icon" onClick={(e) => toggleLike(recipe.id, e)}>
                    <Heart className={`w-5 h-5 ${likedRecipes.includes(recipe.id) ? "fill-primary text-primary" : ""}`} />
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-16">
          <ChefHat className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground mb-4">No recipes found. Try a different search or filter.</p>
          <Button variant="glass" onClick={() => { setSearchQuery(""); setSelectedFilters([]); setSelectedCategory("all"); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </PageLayout>
  );
};

export default Recipes;
