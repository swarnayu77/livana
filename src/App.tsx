import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MealPlans from "./pages/MealPlans";
import NutrientAnalysis from "./pages/NutrientAnalysis";
import Recipes from "./pages/Recipes";
import ProgressDashboard from "./pages/Progress";
import AICoach from "./pages/AICoach";
import Goals from "./pages/Goals";
import Auth from "./pages/Auth";
import FoodScanner from "./pages/FoodScanner";
import Consultation from "./pages/Consultation";
import NutritionistProfile from "./pages/NutritionistProfile";
import ConsultationDashboard from "./pages/ConsultationDashboard";
import Onboarding from "./pages/Onboarding";
import NutritionTracker from "./pages/NutritionTracker";
import HealthTwin from "./pages/HealthTwin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
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
            <Route path="/scanner" element={<FoodScanner />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/consultation/:id" element={<NutritionistProfile />} />
            <Route path="/consultation/dashboard" element={<ConsultationDashboard />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/tracker" element={<NutritionTracker />} />
            <Route path="/health-twin" element={<HealthTwin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
