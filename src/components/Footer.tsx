import { Separator } from "@/components/ui/separator";
import { Zap, Leaf, Mail, Phone, MapPin } from "lucide-react";
const velocargoLogo = "/lovable-uploads/c6b34f92-a5b3-4d4b-8a6e-c6ab1ca44f14.png";

const Footer = () => {
  return (
    <footer className="bg-muted/50 text-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center">
            <img src={velocargoLogo} alt="VelocargoPro" className="h-16 w-auto" />
          </div>
          
          <div className="flex items-center space-x-3">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground/80">contact@velocargopro.fr</span>
          </div>

          <Separator className="my-6 bg-muted-foreground/20 max-w-md" />

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 text-sm text-muted-foreground/60">
            <div>© 2024 VelocargoPro</div>
            <a href="/mentions-legales" className="hover:text-primary transition-smooth">Mentions légales</a>
            <a href="/politique-confidentialite" className="hover:text-primary transition-smooth">Confidentialité</a>
            <a href="/cgv" className="hover:text-primary transition-smooth">CGU</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;