import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Clock, 
  Flame, 
  Search,
  ChefHat,
  Heart,
  Users,
  Sparkles
} from "lucide-react";
import mealBowl from "@/assets/meal-bowl.jpg";

const recipes = [
  {
    id: 1,
    name: "Mediterranean Buddha Bowl",
    image: mealBowl,
    prepTime: 15,
    cookTime: 20,
    calories: 520,
    servings: 2,
    difficulty: "Easy",
    tags: ["High Protein", "Gluten-Free"],
    ingredients: ["Quinoa", "Chickpeas", "Cucumber", "Tomatoes", "Feta"],
    liked: true
  },
  {
    id: 2,
    name: "Grilled Salmon with Asparagus",
    image: mealBowl,
    prepTime: 10,
    cookTime: 15,
    calories: 480,
    servings: 2,
    difficulty: "Medium",
    tags: ["Omega-3", "Low Carb", "Keto"],
    ingredients: ["Salmon", "Asparagus", "Lemon", "Garlic", "Olive Oil"],
    liked: false
  },
  {
    id: 3,
    name: "Overnight Protein Oats",
    image: mealBowl,
    prepTime: 5,
    cookTime: 0,
    calories: 380,
    servings: 1,
    difficulty: "Easy",
    tags: ["Meal Prep", "High Fiber"],
    ingredients: ["Oats", "Greek Yogurt", "Protein Powder", "Berries", "Honey"],
    liked: true
  },
  {
    id: 4,
    name: "Thai Coconut Curry",
    image: mealBowl,
    prepTime: 15,
    cookTime: 25,
    calories: 550,
    servings: 4,
    difficulty: "Medium",
    tags: ["Vegetarian", "Dairy-Free"],
    ingredients: ["Tofu", "Coconut Milk", "Thai Curry Paste", "Vegetables", "Rice"],
    liked: false
  },
  {
    id: 5,
    name: "Avocado Chicken Wrap",
    image: mealBowl,
    prepTime: 10,
    cookTime: 10,
    calories: 450,
    servings: 2,
    difficulty: "Easy",
    tags: ["Quick", "High Protein"],
    ingredients: ["Chicken Breast", "Avocado", "Whole Wheat Wrap", "Lettuce", "Tomato"],
    liked: false
  },
  {
    id: 6,
    name: "Zucchini Noodles Primavera",
    image: mealBowl,
    prepTime: 15,
    cookTime: 10,
    calories: 280,
    servings: 2,
    difficulty: "Easy",
    tags: ["Low Carb", "Vegetarian", "Keto"],
    ingredients: ["Zucchini", "Cherry Tomatoes", "Garlic", "Parmesan", "Basil"],
    liked: true
  }
];

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [likedRecipes, setLikedRecipes] = useState<number[]>(
    recipes.filter(r => r.liked).map(r => r.id)
  );

  const toggleLike = (id: number) => {
    setLikedRecipes(prev => 
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <PageLayout 
      title="Recipe Suggestions" 
      subtitle="Discover healthy, delicious recipes tailored to your dietary preferences and available ingredients."
    >
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by recipe, ingredient, or tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
          />
        </div>
        <Button variant="hero" className="gap-2">
          <Sparkles className="w-4 h-4" />
          Generate Recipe
        </Button>
      </div>

      {/* Recipes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Card 
            key={recipe.id} 
            className="glass overflow-hidden group hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(recipe.id);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
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
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {recipe.name}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-3">
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
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-16">
          <ChefHat className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">No recipes found. Try a different search.</p>
        </div>
      )}
    </PageLayout>
  );
};

export default Recipes;
