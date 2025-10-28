import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";
const velocargoLogo = "/lovable-uploads/c6b34f92-a5b3-4d4b-8a6e-c6ab1ca44f14.png";

const Header = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-16">
          <div className="flex items-center">
            <img src={velocargoLogo} alt="VelocargoPro" className="h-16 md:h-20 w-auto" />
          </div>
          
          <nav className="hidden md:flex space-x-8 flex-1 ml-12">
            <a href="#services" className="text-muted-foreground hover:text-primary transition-smooth font-bold">
              Services
            </a>
            <a href="#services" className="text-muted-foreground hover:text-primary transition-smooth font-bold">
              Financement
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-smooth font-bold">
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="default" 
              size="sm" 
              className="gradient-primary shadow-glow animate-glow-pulse"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Demander un devis
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;