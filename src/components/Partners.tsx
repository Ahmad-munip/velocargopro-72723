import { Badge } from "@/components/ui/badge";
import ecoledLogo from "@/assets/partners/ecoled-logo.png";
import axdisLogo from "@/assets/partners/axdis-logo.jpg";
import thaleosLogo from "@/assets/partners/thaleos-logo.png";

const Partners = () => {
  const partners = [
    { name: "Ecoled Europe", industry: "Technologie", logo: ecoledLogo },
    { name: "Thaleos", industry: "Logistique", logo: thaleosLogo },
    { name: "Axdis Pro", industry: "Urbanisme", logo: axdisLogo }
  ];

  return (
    <section id="partenaires" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-6">
            Nos Partenaires
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ces entreprises innovantes roulent vers un{" "}
            <span className="text-primary">futur plus vert</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Rejoignez des centaines d'entreprises qui ont fait le choix de la mobilité électrique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="bg-card rounded-xl p-6 shadow-elevation hover:shadow-glow transition-bounce hover:scale-105 text-center group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-24 h-24 bg-card rounded-lg mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-smooth border border-border/20">
                {partner.logo ? (
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="w-20 h-20 object-contain"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    {partner.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-sm mb-1 text-card-foreground">
                {partner.name}
              </h3>
              <p className="text-xs text-muted-foreground">
                {partner.industry}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Vous représentez une entreprise ? Découvrez nos solutions sur-mesure
          </p>
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
              +500 entreprises nous font confiance
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;