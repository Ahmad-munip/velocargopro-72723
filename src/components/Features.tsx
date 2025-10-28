import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Shield, Wrench, Truck, Euro, Leaf } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Euro className="h-8 w-8" />,
      title: "Financement 100% CEE",
      description: "Bénéficiez d'un financement intégral grâce aux Certificats d'Économies d'Énergie. Aucun frais à votre charge.",
      color: "primary"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Performance électrique",
      description: "Moteur haute performance, batterie longue durée, assistance jusqu'à 25 km/h pour tous vos déplacements professionnels.",
      color: "secondary"
    },
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Usage professionnel",
      description: "Conçu pour les livraisons, déplacements urbains et usage intensif. Porte-bagages renforcé et capacité de charge optimisée.",
      color: "primary"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Garantie étendue",
      description: "Garantie constructeur 2 ans et service après-vente dédié pour votre tranquillité.",
      color: "secondary"
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: "Service après-vente",
      description: "Service après-vente disponible en cas de problème. Support technique pour votre tranquillité.",
      color: "primary"
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Impact environnemental",
      description: "Réduisez votre empreinte carbone de 80% par rapport aux véhicules thermiques. Contribuez aux objectifs RSE de votre entreprise.",
      color: "secondary"
    }
  ];

  return (
    <section id="services" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-6 text-lg py-2 px-4">
            Nos Services
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Une solution complète pour votre{" "}
            <span className="text-primary">mobilité professionnelle</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            De l'obtention du financement CEE à la livraison de votre vélo électrique, 
            nous vous accompagnons dans toutes les étapes de votre projet de mobilité durable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="shadow-elevation hover:shadow-glow transition-bounce hover:scale-105 border-border/50 bg-card/50 backdrop-blur-sm group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth ${
                  feature.color === 'primary' 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-secondary/10 text-secondary'
                }`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;