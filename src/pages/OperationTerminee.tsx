import { CheckCircle2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OperationTerminee = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          src="/lovable-uploads/cargo-bike-demo.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          autoPlay
          playsInline
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle2 className="h-32 w-32 text-primary animate-bounce-slow" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse-soft" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">Opération</span> <span className="text-primary">terminée</span>
          </h1>

          {/* Message */}
          <div className="space-y-4">
            <p className="text-xl text-white/90 leading-relaxed font-medium">
              Malheureusement l'opération est terminée !
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Si vous avez signé votre devis avant le <span className="font-semibold text-primary">1/10/2025</span>, pas de panique, il a été pris en compte 😊
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              Vous pouvez suivre les différentes étapes et retrouver les spécifications de votre vélo ci-dessous
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="gradient-primary shadow-glow transition-bounce hover:scale-105"
              onClick={() => navigate('/produit')}
            >
              <Home className="h-5 w-5 mr-2" />
              Voir les étapes
            </Button>
          </div>

          {/* Additional Info */}
          <div className="pt-12 text-sm text-white/70">
            <p>Besoin d'aide ? Contactez-nous sur <a href="mailto:contact@velocargopro.fr" className="font-semibold text-primary hover:text-primary/80 transition-colors underline">contact@velocargopro.fr</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationTerminee;
