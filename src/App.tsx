import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MealPlans from "./pages/MealPlans";
import NutrientAnalysis from "./pages/NutrientAnalysis";
import Recipes from "./pages/Recipes";
import ProgressDashboard from "./pages/Progress";
import AICoach from "./pages/AICoach";
import Goals from "./pages/Goals";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/meal-plans" element={<MealPlans />} />
          <Route path="/nutrient-analysis" element={<NutrientAnalysis />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/progress" element={<ProgressDashboard />} />
          <Route path="/coach" element={<AICoach />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/auth" element={<Auth />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
