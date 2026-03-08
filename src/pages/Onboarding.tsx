import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, User, Ruler, Weight, Target, Leaf, Activity } from "lucide-react";

const Onboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    age: "",
    gender: "",
    height_cm: "",
    weight_kg: "",
    fitness_goal: "",
    dietary_preference: "",
    allergies: "",
    activity_level: "",
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleFinish = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("profiles").update({
        full_name: form.full_name || null,
        age: form.age ? parseInt(form.age) : null,
        gender: form.gender || null,
        height_cm: form.height_cm ? parseFloat(form.height_cm) : null,
        weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
        fitness_goal: form.fitness_goal || null,
        dietary_preference: form.dietary_preference || null,
        allergies: form.allergies || null,
        activity_level: form.activity_level || null,
        onboarding_complete: true,
        updated_at: new Date().toISOString(),
      }).eq("id", user.id);

      if (error) throw error;

      // Also log initial weight
      if (form.weight_kg) {
        await supabase.from("weight_logs").insert({
          user_id: user.id,
          weight_kg: parseFloat(form.weight_kg),
        });
      }

      toast({ title: "Profile saved!", description: "Welcome to LIVANA! 🌿" });
      navigate("/tracker");
    } catch (error) {
      toast({ title: "Error", description: "Failed to save profile", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const steps = [
    {
      icon: User,
      title: "About You",
      content: (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Full Name</Label>
            <Input placeholder="Your name" value={form.full_name} onChange={(e) => update("full_name", e.target.value)} className="rounded-xl bg-secondary/30" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Age</Label>
              <Input type="number" placeholder="28" value={form.age} onChange={(e) => update("age", e.target.value)} className="rounded-xl bg-secondary/30" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Gender</Label>
              <Select value={form.gender} onValueChange={(v) => update("gender", v)}>
                <SelectTrigger className="rounded-xl bg-secondary/30"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Ruler,
      title: "Body Measurements",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Height (cm)</Label>
            <Input type="number" placeholder="170" value={form.height_cm} onChange={(e) => update("height_cm", e.target.value)} className="rounded-xl bg-secondary/30" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Weight (kg)</Label>
            <Input type="number" placeholder="68" value={form.weight_kg} onChange={(e) => update("weight_kg", e.target.value)} className="rounded-xl bg-secondary/30" />
          </div>
        </div>
      ),
    },
    {
      icon: Target,
      title: "Your Goals",
      content: (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Fitness Goal</Label>
            <Select value={form.fitness_goal} onValueChange={(v) => update("fitness_goal", v)}>
              <SelectTrigger className="rounded-xl bg-secondary/30"><SelectValue placeholder="Select goal" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="lose_weight">Lose Weight</SelectItem>
                <SelectItem value="gain_muscle">Gain Muscle</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="improve_health">Improve Health</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Activity Level</Label>
            <Select value={form.activity_level} onValueChange={(v) => update("activity_level", v)}>
              <SelectTrigger className="rounded-xl bg-secondary/30"><SelectValue placeholder="Select level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Lightly Active</SelectItem>
                <SelectItem value="moderate">Moderately Active</SelectItem>
                <SelectItem value="active">Very Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      icon: Leaf,
      title: "Diet Preferences",
      content: (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs">Dietary Preference</Label>
            <Select value={form.dietary_preference} onValueChange={(v) => update("dietary_preference", v)}>
              <SelectTrigger className="rounded-xl bg-secondary/30"><SelectValue placeholder="Select preference" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
                <SelectItem value="paleo">Paleo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Allergies / Food Restrictions</Label>
            <Textarea placeholder="e.g. Gluten, dairy, nuts..." value={form.allergies} onChange={(e) => update("allergies", e.target.value)} className="rounded-xl bg-secondary/30 min-h-[80px]" />
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];

  return (
    <PageLayout title="Welcome to LIVANA" subtitle="Let's set up your health profile to personalize your experience.">
      <div className="max-w-lg mx-auto">
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? "bg-primary" : "bg-secondary"}`} />
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 animate-fade-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
              <currentStep.icon className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">{currentStep.title}</h2>
          </div>

          {currentStep.content}

          <div className="flex items-center gap-3 mt-6">
            {step > 0 && (
              <Button variant="ghost" onClick={() => setStep(step - 1)} className="rounded-full">
                Back
              </Button>
            )}
            <Button
              className="flex-1 rounded-xl h-11"
              onClick={() => {
                if (step < steps.length - 1) setStep(step + 1);
                else handleFinish();
              }}
              disabled={saving}
            >
              {step < steps.length - 1 ? (
                <>Next <ArrowRight className="w-4 h-4 ml-1" /></>
              ) : saving ? "Saving..." : "Complete Setup"}
            </Button>
          </div>
        </div>

        <button
          onClick={() => {
            handleFinish();
          }}
          className="block mx-auto mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip for now
        </button>
      </div>
    </PageLayout>
  );
};

export default Onboarding;
