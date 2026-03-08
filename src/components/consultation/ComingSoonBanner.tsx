import { useState } from "react";
import { X, Sparkles } from "lucide-react";

const ComingSoonBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative mb-8 rounded-2xl overflow-hidden glass-card border-primary/20">
      <div className="absolute inset-0 radial-glow-intense pointer-events-none" />
      <div className="relative flex items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Online Consultation — Coming Soon</p>
            <p className="text-xs text-muted-foreground">Live video consultations with certified nutritionists launching soon. Explore the preview below!</p>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

export default ComingSoonBanner;
