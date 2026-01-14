import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User,
  Eye,
  EyeOff,
  Sparkles,
  Chrome,
  Phone,
  ArrowRight
} from "lucide-react";
import livanaLogo from "@/assets/livana-logo.png";

// Validation schemas
const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const phoneSchema = z.object({
  phone: z.string().trim().min(10, { message: "Please enter a valid phone number" }),
});

const otpSchema = z.object({
  otp: z.string().length(6, { message: "Please enter the 6-digit code" }),
});

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(searchParams.get("mode") === "signup");
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
    agreeTerms: false
  });

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneAuth = async () => {
    setIsLoading(true);
    
    try {
      // Validate phone number
      const result = phoneSchema.safeParse({ phone: formData.phone });
      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }

      // Format phone number with country code if not present
      let phoneNumber = formData.phone.trim();
      if (!phoneNumber.startsWith('+')) {
        phoneNumber = '+1' + phoneNumber; // Default to US country code
      }

      if (!showOtpInput) {
        // Send OTP
        const { error } = await supabase.auth.signInWithOtp({
          phone: phoneNumber,
        });
        
        if (error) throw error;
        
        setShowOtpInput(true);
        toast({
          title: "Code Sent!",
          description: "Check your phone for the verification code.",
        });
      } else {
        // Verify OTP
        const otpResult = otpSchema.safeParse({ otp: formData.otp });
        if (!otpResult.success) {
          throw new Error(otpResult.error.errors[0].message);
        }

        const { error } = await supabase.auth.verifyOtp({
          phone: phoneNumber,
          token: formData.otp,
          type: 'sms'
        });
        
        if (error) throw error;
        
        toast({
          title: "Success!",
          description: "You're now signed in.",
        });
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Phone authentication failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate email and password
      const result = emailSchema.safeParse({ 
        email: formData.email, 
        password: formData.password 
      });
      if (!result.success) {
        throw new Error(result.error.errors[0].message);
      }

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              full_name: formData.name
            }
          }
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Check your email to verify your account.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) throw error;
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="p-4">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img 
                src={livanaLogo} 
                alt="LIVANA" 
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105" 
              />
              <span className="text-2xl font-heading font-bold text-gradient">LIVANA</span>
            </Link>
            <p className="text-muted-foreground mt-2">
              {isSignUp ? "Start your health journey today" : "Welcome back"}
            </p>
          </div>

          {/* Auth Card */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-center font-heading">
                {isSignUp ? "Create Account" : "Sign In"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Auth Method Tabs */}
              <Tabs value={authMethod} onValueChange={(v) => setAuthMethod(v as "email" | "phone")} className="mb-6">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                  <TabsTrigger value="email" className="gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </TabsTrigger>
                </TabsList>

                {/* Email Auth */}
                <TabsContent value="email">
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    {isSignUp && (
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="pl-10 pr-10 bg-muted/50 border-border/50 focus:border-primary"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {isSignUp && (
                      <div className="flex items-start gap-2">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeTerms}
                          onCheckedChange={(checked) => 
                            setFormData({ ...formData, agreeTerms: checked as boolean })
                          }
                        />
                        <Label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
                          I agree to the Terms of Service and Privacy Policy
                        </Label>
                      </div>
                    )}

                    {!isSignUp && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox id="remember" />
                          <Label htmlFor="remember" className="text-sm text-muted-foreground">
                            Remember me
                          </Label>
                        </div>
                        <button type="button" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </button>
                      </div>
                    )}

                    <Button type="submit" variant="hero" className="w-full gap-2" disabled={isLoading}>
                      <Sparkles className="w-4 h-4" />
                      {isLoading ? "Please wait..." : (isSignUp ? "Create Account" : "Sign In")}
                    </Button>
                  </form>
                </TabsContent>

                {/* Phone Auth */}
                <TabsContent value="phone">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
                          disabled={showOtpInput}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Include country code (e.g., +1 for US)
                      </p>
                    </div>

                    {showOtpInput && (
                      <div className="space-y-2 animate-slide-up">
                        <Label htmlFor="otp">Verification Code</Label>
                        <Input
                          id="otp"
                          type="text"
                          placeholder="000000"
                          maxLength={6}
                          value={formData.otp}
                          onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                          className="text-center text-2xl tracking-widest bg-muted/50 border-border/50 focus:border-primary"
                        />
                        <p className="text-xs text-muted-foreground text-center">
                          Enter the 6-digit code sent to your phone
                        </p>
                      </div>
                    )}

                    <Button 
                      type="button" 
                      variant="hero" 
                      className="w-full gap-2" 
                      disabled={isLoading}
                      onClick={handlePhoneAuth}
                    >
                      {showOtpInput ? (
                        <>
                          <Sparkles className="w-4 h-4" />
                          {isLoading ? "Verifying..." : "Verify Code"}
                        </>
                      ) : (
                        <>
                          <ArrowRight className="w-4 h-4" />
                          {isLoading ? "Sending..." : "Send Code"}
                        </>
                      )}
                    </Button>

                    {showOtpInput && (
                      <button
                        type="button"
                        onClick={() => {
                          setShowOtpInput(false);
                          setFormData({ ...formData, otp: "" });
                        }}
                        className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Use a different phone number
                      </button>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Divider */}
              <div className="relative my-6">
                <Separator className="bg-border/50" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 text-xs text-muted-foreground">
                  or continue with
                </span>
              </div>

              {/* Google Sign In */}
              <Button 
                type="button"
                variant="glass" 
                className="w-full gap-3 hover:border-primary/40"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                <Chrome className="w-5 h-5" />
                Continue with Google
              </Button>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  {isSignUp ? "Already have an account? " : "Don't have an account? "}
                </span>
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:underline font-medium"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Auth;
