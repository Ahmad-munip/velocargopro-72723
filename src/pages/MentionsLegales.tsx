import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>

          <Card className="shadow-elevation">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">
                Mentions Légales
              </CardTitle>
              <p className="text-muted-foreground">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Informations légales</h2>
                <div className="space-y-3 text-muted-foreground">
                  <p><strong>Dénomination sociale :</strong> VelocargoPro</p>
                  <p><strong>Activité :</strong> Courtage et conseil en mobilité électrique professionnelle</p>
                  <p><strong>Contact :</strong> contact@velocargopro.fr</p>
                  <p><strong>Territoire d'intervention :</strong> France</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Objet du site</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le site VelocargoPro.fr est un site d'information et de mise en relation pour les professionnels 
                  souhaitant s'équiper de vélos électriques cargo en France. 
                  Nous proposons un service de conseil et d'accompagnement pour l'obtention de financements CEE 
                  (Certificats d'Économies d'Énergie).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Propriété intellectuelle</h2>
                <p className="text-muted-foreground leading-relaxed">
                  L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels) 
                  est la propriété exclusive de VelocargoPro, à l'exception des marques, logos ou contenus 
                  appartenant à d'autres sociétés partenaires ou tiers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Responsabilité</h2>
                <p className="text-muted-foreground leading-relaxed">
                  VelocargoPro s'efforce de fournir des informations aussi précises que possible. 
                  Toutefois, il ne pourra être tenu responsable des omissions, des inexactitudes et des 
                  carences dans la mise à jour, qu'elles soient de son fait ou du fait des tiers partenaires 
                  qui lui fournissent ces informations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Liens hypertextes</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. 
                  VelocargoPro ne dispose d'aucun moyen pour contrôler le contenu de ces sites et n'assume 
                  aucune responsabilité de ce fait.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Droit applicable</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le présent site est soumis au droit français. En cas de litige, les tribunaux français 
                  seront seuls compétents.
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;