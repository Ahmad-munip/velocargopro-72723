import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PolitiqueConfidentialite = () => {
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
                Politique de Confidentialité
              </CardTitle>
              <p className="text-muted-foreground">
                Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Collecte des données personnelles</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  VelocargoPro collecte vos données personnelles dans le cadre de :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Demandes de devis pour vélos électriques professionnels</li>
                  <li>Études d'éligibilité aux financements CEE</li>
                  <li>Mise en relation avec nos partenaires</li>
                  <li>Envoi d'informations commerciales (avec votre consentement)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Données collectées</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Les données que nous collectons incluent :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Nom, prénom et coordonnées de contact</li>
                  <li>Informations sur votre entreprise</li>
                  <li>Besoins en mobilité électrique</li>
                  <li>Données de navigation sur notre site (cookies)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Utilisation des données</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Vos données sont utilisées pour :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Traiter vos demandes de devis et d'informations</li>
                  <li>Évaluer votre éligibilité aux aides CEE</li>
                  <li>Vous mettre en relation avec nos partenaires qualifiés</li>
                  <li>Améliorer nos services</li>
                  <li>Vous envoyer des communications marketing (avec consentement)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Partage des données</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nous partageons vos données uniquement avec nos partenaires qualifiés dans le cadre 
                  de votre demande de devis. Nous ne vendons jamais vos données à des tiers. 
                  Nos partenaires s'engagent à respecter la même politique de confidentialité.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Conservation des données</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Vos données sont conservées pendant 3 ans maximum à compter de notre dernier contact, 
                  sauf obligation légale contraire. Les données de prospects non convertis sont 
                  supprimées après 3 ans d'inactivité.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Vos droits</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Droit d'accès à vos données personnelles</li>
                  <li>Droit de rectification des données inexactes</li>
                  <li>Droit d'effacement (droit à l'oubli)</li>
                  <li>Droit à la portabilité de vos données</li>
                  <li>Droit d'opposition au traitement</li>
                  <li>Droit de retirer votre consentement</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Pour exercer ces droits, contactez-nous à : contact@velocargopro.fr
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Cookies</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Notre site utilise des cookies pour améliorer votre expérience de navigation 
                  et analyser le trafic. Vous pouvez configurer votre navigateur pour refuser 
                  les cookies, mais certaines fonctionnalités du site pourraient être limitées.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Sécurité</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                  pour protéger vos données contre la perte, l'utilisation abusive, l'accès non autorisé, 
                  la divulgation, l'altération ou la destruction.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Contact</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Pour toute question concernant cette politique de confidentialité ou le traitement 
                  de vos données personnelles, contactez-nous à : contact@velocargopro.fr
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;