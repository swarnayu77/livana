import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import HealthForm from "@/components/consultation/HealthForm";
import MockPayment, { PaymentSuccess } from "@/components/consultation/MockPayment";
import { nutritionists, mockReviews } from "@/data/consultationMockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Star,
  BadgeCheck,
  Globe,
  Clock,
  Calendar,
  Video,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "profile" | "schedule" | "health" | "payment" | "success";

const NutritionistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const n = nutritionists.find((x) => x.id === id);
  const [step, setStep] = useState<Step>("profile");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!n) {
    return (
      <PageLayout title="Not Found" subtitle="Nutritionist not found.">
        <Button variant="ghost" onClick={() => navigate("/consultation")}>
          ← Back to Consultation
        </Button>
      </PageLayout>
    );
  }

  const currentSlots = n.availability.find((a) => a.day === selectedDay)?.slots || [];

  const stepLabels = ["Profile", "Schedule", "Health Form", "Payment"];
  const stepIndex = ["profile", "schedule", "health", "payment", "success"].indexOf(step);

  return (
    <PageLayout title={n.name} subtitle={n.qualification}>
      {/* Progress steps */}
      {step !== "success" && (
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                  i <= stepIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                <span className="w-4 h-4 rounded-full bg-background/20 flex items-center justify-center text-[10px]">
                  {i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </div>
              {i < stepLabels.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              )}
            </div>
          ))}
        </div>
      )}

      {step === "success" && (
        <PaymentSuccess onContinue={() => navigate("/consultation/dashboard")} />
      )}

      {step === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main profile */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex gap-5">
                <div className="relative shrink-0">
                  <img src={n.photo} alt={n.name} className="w-24 h-24 rounded-2xl object-cover" />
                  {n.verified && (
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                      <BadgeCheck className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground">{n.name}</h2>
                  <p className="text-sm text-muted-foreground">{n.qualification}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="text-sm font-semibold">{n.rating}</span>
                    <span className="text-xs text-muted-foreground">({n.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {n.yearsExperience} years</span>
                    <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {n.languages.join(", ")}</span>
                    <span className="flex items-center gap-1"><Video className="w-3 h-3" /> Online</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{n.bio}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {n.specializations.map((s) => (
                  <Badge key={s} variant="secondary" className="rounded-full text-xs">{s}</Badge>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-xs text-muted-foreground mb-2">Certifications</p>
                <div className="flex flex-wrap gap-2">
                  {n.certifications.map((c) => (
                    <Badge key={c} variant="outline" className="rounded-full text-[10px] px-2.5">{c}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Patient Reviews</h3>
              <div className="space-y-4">
                {mockReviews.map((r) => (
                  <div key={r.id} className="flex gap-3 pb-4 border-b border-border/30 last:border-0 last:pb-0">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-secondary text-xs">{r.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">{r.user}</p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-primary fill-primary" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{r.comment}</p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">{r.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold text-foreground">${n.price}</p>
              <p className="text-xs text-muted-foreground mb-5">per consultation</p>
              <Button className="w-full rounded-xl h-11" onClick={() => setStep("schedule")}>
                Book Consultation <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="glass-card rounded-2xl p-5">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                <Calendar className="w-4 h-4 inline mr-1.5 text-primary" />
                Availability
              </h4>
              <div className="space-y-2">
                {n.availability.map((a) => (
                  <div key={a.day} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{a.day}</span>
                    <span className="text-foreground font-medium">{a.slots.length} slots</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {step === "schedule" && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-foreground mb-1">Select a Day</h3>
            <p className="text-xs text-muted-foreground mb-4">Choose from available consultation days</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {n.availability.map((a) => (
                <button
                  key={a.day}
                  onClick={() => { setSelectedDay(a.day); setSelectedSlot(null); }}
                  className={cn(
                    "p-3 rounded-xl border text-sm font-medium transition-all",
                    selectedDay === a.day
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/50 text-muted-foreground hover:border-border"
                  )}
                >
                  {a.day}
                  <span className="block text-[10px] mt-0.5 opacity-70">{a.slots.length} slots</span>
                </button>
              ))}
            </div>
          </div>

          {selectedDay && (
            <div className="glass-card rounded-2xl p-6 animate-fade-up">
              <h3 className="font-semibold text-foreground mb-1">Select a Time</h3>
              <p className="text-xs text-muted-foreground mb-4">{selectedDay} — available slots</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {currentSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={cn(
                      "p-3 rounded-xl border text-sm font-medium transition-all",
                      selectedSlot === slot
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border/50 text-muted-foreground hover:border-border"
                    )}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <Button variant="ghost" onClick={() => setStep("profile")} className="rounded-full">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Button
              className="flex-1 rounded-xl h-11"
              disabled={!selectedDay || !selectedSlot}
              onClick={() => setStep("health")}
            >
              Continue to Health Form <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {step === "health" && (
        <div className="max-w-2xl mx-auto space-y-4">
          <HealthForm onSubmit={() => setStep("payment")} />
          <Button variant="ghost" onClick={() => setStep("schedule")} className="rounded-full">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
        </div>
      )}

      {step === "payment" && (
        <div className="max-w-md mx-auto space-y-4">
          <MockPayment amount={n.price} onSuccess={() => setStep("success")} />
          <Button variant="ghost" onClick={() => setStep("health")} className="rounded-full">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
        </div>
      )}
    </PageLayout>
  );
};

export default NutritionistProfile;
