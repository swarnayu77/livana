import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardList } from "lucide-react";

type Props = {
  onSubmit: () => void;
};

const HealthForm = ({ onSubmit }: Props) => {
  const [form, setForm] = useState({
    age: "",
    height: "",
    weight: "",
    goal: "",
    conditions: "",
    allergies: "",
    diet: "",
    activity: "",
  });

  const update = (key: string, value: string) => setForm((p) => ({ ...p, [key]: value }));

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Pre-Consultation Health Form</h3>
          <p className="text-xs text-muted-foreground">This info helps your nutritionist prepare for your session</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs">Age</Label>
          <Input placeholder="e.g. 28" value={form.age} onChange={(e) => update("age", e.target.value)} className="rounded-xl bg-secondary/30" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Height (cm)</Label>
          <Input placeholder="e.g. 170" value={form.height} onChange={(e) => update("height", e.target.value)} className="rounded-xl bg-secondary/30" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Weight (kg)</Label>
          <Input placeholder="e.g. 68" value={form.weight} onChange={(e) => update("weight", e.target.value)} className="rounded-xl bg-secondary/30" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Activity Level</Label>
          <Select value={form.activity} onValueChange={(v) => update("activity", v)}>
            <SelectTrigger className="rounded-xl bg-secondary/30">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary</SelectItem>
              <SelectItem value="light">Lightly Active</SelectItem>
              <SelectItem value="moderate">Moderately Active</SelectItem>
              <SelectItem value="active">Very Active</SelectItem>
              <SelectItem value="extreme">Extremely Active</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <Label className="text-xs">Fitness Goals</Label>
          <Select value={form.goal} onValueChange={(v) => update("goal", v)}>
            <SelectTrigger className="rounded-xl bg-secondary/30">
              <SelectValue placeholder="Select your primary goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lose">Lose Weight</SelectItem>
              <SelectItem value="gain">Gain Muscle</SelectItem>
              <SelectItem value="maintain">Maintain Weight</SelectItem>
              <SelectItem value="health">Improve Overall Health</SelectItem>
              <SelectItem value="condition">Manage a Condition</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Medical Conditions</Label>
          <Textarea placeholder="e.g. Diabetes, thyroid issues..." value={form.conditions} onChange={(e) => update("conditions", e.target.value)} className="rounded-xl bg-secondary/30 min-h-[80px]" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">Allergies</Label>
          <Textarea placeholder="e.g. Gluten, dairy, nuts..." value={form.allergies} onChange={(e) => update("allergies", e.target.value)} className="rounded-xl bg-secondary/30 min-h-[80px]" />
        </div>
        <div className="sm:col-span-2 space-y-1.5">
          <Label className="text-xs">Current Diet Habits</Label>
          <Textarea placeholder="Describe your typical daily meals..." value={form.diet} onChange={(e) => update("diet", e.target.value)} className="rounded-xl bg-secondary/30 min-h-[80px]" />
        </div>
      </div>

      <Button className="w-full mt-6 rounded-xl h-11" onClick={onSubmit}>
        Submit & Continue to Payment
      </Button>
    </div>
  );
};

export default HealthForm;
