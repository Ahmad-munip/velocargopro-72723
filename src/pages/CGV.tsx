import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CGV = () => {
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
                Conditions Générales d'Utilisation
              </CardTitle>
              <p className="text-muted-foreground">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Objet et champ d'application</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation du service 
                  de mise en relation proposé par VelocargoPro pour l'acquisition de vélos électriques 
                  professionnels en France. Ce service comprend l'accompagnement 
                  pour l'obtention de financements CEE et la mise en relation avec des fournisseurs qualifiés.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description du service</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  VelocargoPro propose un service gratuit de :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Conseil et accompagnement pour l'éligibilité aux aides CEE</li>
                  <li>Mise en relation avec des fournisseurs de vélos électriques qualifiés</li>
                  <li>Assistance dans le montage des dossiers de financement</li>
                  <li>Suivi personnalisé de votre projet de mobilité électrique</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  <strong>Important :</strong> VelocargoPro ne vend pas directement de vélos électriques. 
                  Nous sommes un intermédiaire qui facilite la mise en relation.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Utilisation du service</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  L'utilisation de notre service implique :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>La fourniture d'informations exactes et complètes sur votre entreprise</li>
                  <li>L'acceptation d'être contacté par nos partenaires qualifiés</li>
                  <li>Le respect des conditions d'éligibilité aux aides CEE</li>
                  <li>La bonne foi dans vos démarches d'acquisition</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Éligibilité et conditions</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Notre service s'adresse uniquement aux :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Entreprises situées en France</li>
                  <li>Professionnels ayant un besoin réel de mobilité électrique</li>
                  <li>Structures éligibles aux dispositifs CEE</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  L'éligibilité finale aux aides CEE est déterminée par les organismes compétents.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Obligations de VelocargoPro</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  VelocargoPro s'engage à :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Fournir des informations exactes sur les dispositifs d'aide</li>
                  <li>Mettre en relation avec des partenaires qualifiés et vérifiés</li>
                  <li>Respecter la confidentialité de vos données</li>
                  <li>Vous accompagner dans vos démarches sans frais</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Responsabilité et limites</h2>
                <p className="text-muted-foreground leading-relaxed">
                  VelocargoPro ne peut être tenu responsable de :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-3">
                  <li>L'obtention effective des aides CEE (soumise à conditions)</li>
                  <li>Les conditions commerciales proposées par nos partenaires</li>
                  <li>La qualité des produits livrés par les fournisseurs</li>
                  <li>Les délais de traitement des dossiers par les organismes</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Notre responsabilité se limite au service de mise en relation et d'accompagnement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Données personnelles</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Le traitement de vos données personnelles est régi par notre Politique de Confidentialité. 
                  En utilisant notre service, vous acceptez le partage de vos informations avec nos 
                  partenaires dans le cadre de votre demande.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Modification des CGU</h2>
                <p className="text-muted-foreground leading-relaxed">
                  VelocargoPro se réserve le droit de modifier les présentes CGU à tout moment. 
                  Les nouvelles conditions seront applicables dès leur publication sur le site. 
                  Il est recommandé de consulter régulièrement cette page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Résiliation</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vous pouvez cesser d'utiliser notre service à tout moment en nous contactant à 
                  contact@velocargopro.fr. VelocargoPro peut également suspendre l'accès au service 
                  en cas de non-respect des présentes conditions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Droit applicable et litiges</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Les présentes CGU sont soumises au droit français. En cas de litige, nous privilégions 
                  la résolution amiable. À défaut, les tribunaux français seront compétents.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pour toute question concernant ces conditions d'utilisation : contact@velocargopro.fr
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CGV;