import { useState, useRef, useCallback } from "react";
import { Camera, Upload, X, Loader2, Flame, Beef, Wheat, Droplets, Leaf, Sparkles, ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface ScanResult {
  name: string;
  calories: number;
  macros: { protein: number; carbs: number; fat: number; fiber: number };
  items: string[];
  healthScore: number;
  insights: string[];
  suggestions: string[];
}

const FoodScanner = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { toast } = useToast();

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    setCameraActive(false);
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      setStream(mediaStream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch {
      toast({ title: "Camera Error", description: "Could not access camera. Try uploading an image instead.", variant: "destructive" });
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
    setImagePreview(dataUrl);
    stopCamera();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Please upload an image under 10MB.", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const analyzeImage = async () => {
    if (!imagePreview) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { type: "scan", imageBase64: imagePreview },
      });

      if (error) throw error;

      const content = data?.choices?.[0]?.message?.content;
      if (!content) throw new Error("No response from AI");

      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed: ScanResult = JSON.parse(cleaned);
      setResult(parsed);
    } catch (e: any) {
      console.error("Scan error:", e);
      toast({ title: "Analysis Failed", description: e?.message || "Could not analyze the image. Please try again.", variant: "destructive" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImagePreview(null);
    setResult(null);
    stopCamera();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-primary";
    if (score >= 50) return "text-yellow-400";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 75) return "Excellent";
    if (score >= 50) return "Good";
    if (score >= 25) return "Fair";
    return "Poor";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-2xl font-display font-bold text-foreground">Food Scanner</h1>
            </div>
            <p className="text-sm text-muted-foreground">Scan any food with your camera or upload a photo for instant nutrition analysis.</p>
          </div>

          {/* Capture Area */}
          {!imagePreview && !cameraActive && (
            <div className="space-y-4">
              <button
                onClick={startCamera}
                className="w-full p-10 rounded-2xl border-2 border-dashed border-border/40 hover:border-primary/40 bg-card/20 hover:bg-card/40 transition-all duration-300 flex flex-col items-center gap-4 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">Open Camera</p>
                  <p className="text-xs text-muted-foreground mt-1">Point at your food and snap a photo</p>
                </div>
              </button>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border/30" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border/30" />
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-6 rounded-2xl border border-border/25 hover:border-primary/30 bg-card/20 hover:bg-card/40 transition-all duration-300 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-foreground text-sm">Upload Photo</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG up to 10MB</p>
                </div>
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </div>
          )}

          {/* Camera View */}
          {cameraActive && (
            <div className="relative rounded-2xl overflow-hidden bg-muted/20">
              <video ref={videoRef} autoPlay playsInline muted className="w-full aspect-[4/3] object-cover" />
              <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-4">
                <Button variant="glass" size="icon" onClick={stopCamera}>
                  <X className="w-5 h-5" />
                </Button>
                <button onClick={capturePhoto} className="w-16 h-16 rounded-full border-4 border-primary bg-primary/20 hover:bg-primary/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary" />
                </button>
                <div className="w-10" /> {/* spacer */}
              </div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />

          {/* Image Preview */}
          {imagePreview && !result && (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden">
                <img src={imagePreview} alt="Food preview" className="w-full aspect-[4/3] object-cover" />
                <button onClick={reset} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                  <X className="w-4 h-4 text-foreground" />
                </button>
              </div>
              <Button onClick={analyzeImage} disabled={isAnalyzing} variant="hero" size="lg" className="w-full rounded-xl">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Analyze Food
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Results */}
          {result && (
            <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
              {/* Food image + name */}
              {imagePreview && (
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={imagePreview} alt={result.name} className="w-full aspect-[16/9] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-xl font-bold text-foreground">{result.name}</h2>
                    {result.items.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">{result.items.join(" · ")}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Calories + Health Score */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card/30 border-border/25">
                  <CardContent className="p-5 text-center">
                    <Flame className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <p className="text-3xl font-bold text-foreground">{result.calories}</p>
                    <p className="text-xs text-muted-foreground mt-1">Calories</p>
                  </CardContent>
                </Card>
                <Card className="bg-card/30 border-border/25">
                  <CardContent className="p-5 text-center">
                    <Sparkles className={`w-6 h-6 mx-auto mb-2 ${getScoreColor(result.healthScore)}`} />
                    <p className={`text-3xl font-bold ${getScoreColor(result.healthScore)}`}>{result.healthScore}</p>
                    <p className="text-xs text-muted-foreground mt-1">Health Score · {getScoreLabel(result.healthScore)}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Macros */}
              <Card className="bg-card/30 border-border/25">
                <CardContent className="p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">Macronutrients</h3>
                  {[
                    { label: "Protein", value: result.macros.protein, icon: Beef, color: "text-blue-400", bg: "bg-blue-400" },
                    { label: "Carbs", value: result.macros.carbs, icon: Wheat, color: "text-amber-400", bg: "bg-amber-400" },
                    { label: "Fat", value: result.macros.fat, icon: Droplets, color: "text-rose-400", bg: "bg-rose-400" },
                    { label: "Fiber", value: result.macros.fiber, icon: Leaf, color: "text-primary", bg: "bg-primary" },
                  ].map((macro) => {
                    const total = result.macros.protein + result.macros.carbs + result.macros.fat + result.macros.fiber;
                    const pct = total > 0 ? (macro.value / total) * 100 : 0;
                    return (
                      <div key={macro.label} className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <macro.icon className={`w-4 h-4 ${macro.color}`} />
                            <span className="text-sm text-foreground">{macro.label}</span>
                          </div>
                          <span className="text-sm font-semibold text-foreground">{macro.value}g</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                          <div className={`h-full rounded-full ${macro.bg} transition-all duration-700`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Insights */}
              {result.insights.length > 0 && (
                <Card className="bg-card/30 border-border/25">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Insights</h3>
                    <ul className="space-y-2">
                      {result.insights.map((insight, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Suggestions */}
              {result.suggestions.length > 0 && (
                <Card className="bg-primary/5 border-primary/15">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-primary mb-3">💡 Suggestions</h3>
                    <ul className="space-y-2">
                      {result.suggestions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0 mt-1.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Scan Again */}
              <Button onClick={reset} variant="outline" size="lg" className="w-full rounded-xl">
                <RotateCcw className="w-4 h-4 mr-2" />
                Scan Another Food
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FoodScanner;
