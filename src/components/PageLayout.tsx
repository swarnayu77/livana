import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import livanaLogo from "@/assets/livana-logo.png";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const PageLayout = ({ children, title, subtitle }: PageLayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Back & Logo */}
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/" className="flex items-center gap-2 group">
                <img 
                  src={livanaLogo} 
                  alt="LIVANA" 
                  className="h-8 lg:h-10 w-auto transition-transform duration-300 group-hover:scale-105" 
                />
                <span className="text-lg lg:text-xl font-bold text-gradient">LIVANA</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/tracker" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Tracker
              </Link>
              <Link to="/coach" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                AI Coach
              </Link>
              <Link to="/consultation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Consultation
              </Link>
              <Link to="/scanner" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Scanner
              </Link>
            </nav>

            {/* Auth */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {user ? (
                <>
                  <Link to="/tracker">
                    <Button variant="ghost" size="sm" className="text-sm rounded-full gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{user.email?.split("@")[0]}</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="rounded-full" onClick={handleSignOut}>
                    <LogOut className="w-3.5 h-3.5" />
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button variant="hero" size="sm">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="pt-24 lg:pt-28 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground text-lg max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          {children}
        </div>
      </main>

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default PageLayout;
