import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import livanaLogo from "@/assets/livana-logo-new.png";

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <img src={livanaLogo} alt="LIVANA" className="h-7 w-7" />
              <span className="text-[15px] font-bold text-foreground tracking-[-0.02em]">LIVANA</span>
            </Link>
            <p className="text-[13px] text-muted-foreground leading-[1.7]">
              AI-powered nutrition intelligence for a healthier you.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: [
                { label: "Features", href: "/#features" },
                { label: "Meal Plans", href: "/meal-plans" },
                { label: "AI Coach", href: "/coach" },
              ]
            },
            {
              title: "Resources",
              links: [
                { label: "Recipes", href: "/recipes" },
                { label: "Goals", href: "/goals" },
                { label: "Progress", href: "/progress" },
              ]
            },
            {
              title: "Company",
              links: [
                { label: "Privacy", href: "#" },
                { label: "Terms", href: "#" },
                { label: "Contact", href: "#" },
              ]
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-semibold text-foreground mb-4 uppercase tracking-[0.12em]">{col.title}</h4>
              <div className="space-y-2.5">
                {col.links.map(link => (
                  link.href.startsWith("/#") || link.href === "#" ? (
                    <a key={link.label} href={link.href} className="block text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200">{link.label}</a>
                  ) : (
                    <Link key={link.label} to={link.href} className="block text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200">{link.label}</Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-muted-foreground">© 2026 LIVANA. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
            Made with <Heart className="w-3 h-3 text-primary fill-primary mx-0.5" /> for healthier living
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
