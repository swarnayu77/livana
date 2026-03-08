import { useState } from "react";
import { CreditCard, Wallet, Smartphone, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
  amount: number;
  onSuccess: () => void;
};

const methods = [
  { id: "card", label: "Credit / Debit Card", icon: CreditCard },
  { id: "upi", label: "UPI Payment", icon: Smartphone },
  { id: "wallet", label: "Wallet", icon: Wallet },
] as const;

const MockPayment = ({ amount, onSuccess }: Props) => {
  const [method, setMethod] = useState<string>("card");
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
          <CreditCard className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Secure Payment</h3>
          <p className="text-xs text-muted-foreground">Complete payment to confirm your appointment</p>
        </div>
      </div>

      {/* Amount */}
      <div className="text-center py-4 mb-5 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-xs text-muted-foreground mb-1">Consultation Fee</p>
        <p className="text-3xl font-bold text-foreground">${amount}</p>
      </div>

      {/* Methods */}
      <div className="space-y-2 mb-5">
        {methods.map((m) => (
          <button
            key={m.id}
            onClick={() => setMethod(m.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left",
              method === m.id
                ? "border-primary bg-primary/5"
                : "border-border/50 hover:border-border"
            )}
          >
            <m.icon className={cn("w-5 h-5", method === m.id ? "text-primary" : "text-muted-foreground")} />
            <span className={cn("text-sm font-medium", method === m.id ? "text-foreground" : "text-muted-foreground")}>
              {m.label}
            </span>
            <div className={cn("ml-auto w-4 h-4 rounded-full border-2 transition-all", method === m.id ? "border-primary bg-primary" : "border-border")} />
          </button>
        ))}
      </div>

      {/* Mock card fields */}
      {method === "card" && (
        <div className="space-y-3 mb-5">
          <div className="space-y-1.5">
            <Label className="text-xs">Card Number</Label>
            <Input placeholder="4242 4242 4242 4242" className="rounded-xl bg-secondary/30" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Expiry</Label>
              <Input placeholder="MM/YY" className="rounded-xl bg-secondary/30" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">CVV</Label>
              <Input placeholder="•••" className="rounded-xl bg-secondary/30" />
            </div>
          </div>
        </div>
      )}

      {method === "upi" && (
        <div className="space-y-1.5 mb-5">
          <Label className="text-xs">UPI ID</Label>
          <Input placeholder="yourname@upi" className="rounded-xl bg-secondary/30" />
        </div>
      )}

      <Button className="w-full rounded-xl h-11" onClick={handlePay} disabled={processing}>
        {processing ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          `Pay $${amount}`
        )}
      </Button>

      <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-muted-foreground">
        <Shield className="w-3 h-3" /> Secured with 256-bit encryption
      </div>
    </div>
  );
};

export default MockPayment;

export const PaymentSuccess = ({ onContinue }: { onContinue: () => void }) => (
  <div className="glass-card rounded-2xl p-8 text-center">
    <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4 animate-scale-in">
      <CheckCircle2 className="w-8 h-8 text-primary" />
    </div>
    <h3 className="text-xl font-bold text-foreground mb-1">Payment Successful!</h3>
    <p className="text-sm text-muted-foreground mb-6">Your consultation has been confirmed. You'll receive a confirmation email shortly.</p>
    <Button className="rounded-full px-8" onClick={onContinue}>
      View Appointment
    </Button>
  </div>
);
