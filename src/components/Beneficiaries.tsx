import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Briefcase, Factory, TreePine, HeartHandshake } from "lucide-react";

const Beneficiaries = () => {
  const beneficiaryTypes = [
    {
      icon: <Building className="h-8 w-8" />,
      title: "Entreprises",
      description: "PME, startups, grandes entreprises souhaitant moderniser leur mobilité"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collectivités",
      description: "Mairies, régions, départements pour leurs services publics"
    },
    {
      icon: <HeartHandshake className="h-8 w-8" />,
      title: "Établissements publics",
      description: "Hôpitaux, écoles, administrations et services publics"
    },
    {
      icon: <TreePine className="h-8 w-8" />,
      title: "Associations",
      description: "Associations à but non lucratif et organisations caritatives"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Artisans",
      description: "Professionnels indépendants et artisans en déplacement"
    },
    {
      icon: <Factory className="h-8 w-8" />,
      title: "Zones industrielles",
      description: "Parcs d'activités, zones commerciales et industrielles"
    }
  ];

  return (
    <section className="py-12 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20 mb-6 text-lg py-2 px-4">
            Éligibilité
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Quels professionnels peuvent bénéficier de{" "}
            <span className="text-primary">vélos-cargo électriques ?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Les vélos-cargo électriques s'adressent à un large panel de professionnels : 
            entreprises, collectivités, établissements publics, associations, artisans, 
            zones industrielles ou commerciales…
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {beneficiaryTypes.map((type, index) => (
            <Card
              key={type.title}
              className="shadow-elevation hover:shadow-glow transition-bounce hover:scale-105 border-border/50 bg-card/50 backdrop-blur-sm group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
                  {type.icon}
                </div>
                <CardTitle className="text-lg font-bold">
                  {type.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {type.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-gradient-secondary/10 rounded-2xl p-8 max-w-4xl mx-auto border border-secondary/10">
            <h3 className="text-xl font-bold mb-4 text-foreground">
              Une solution 100% financée pour tous
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Toute structure souhaitant réduire son empreinte carbone et optimiser 
              le déplacement de ses salariés peut profiter de cette solution{" "}
              <span className="font-semibold text-primary">100% financée</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Beneficiaries;