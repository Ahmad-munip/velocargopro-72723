import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 mb-4">
            Contact
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Besoin d'informations ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notre équipe est à votre écoute pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="shadow-elevation border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-glow transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                Contactez-nous
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Email</p>
                  <a href="mailto:contact@velocargopro.fr" className="text-primary hover:underline">
                    contact@velocargopro.fr
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="font-semibold text-lg">Horaires</p>
                  <p className="text-muted-foreground">Lundi - Vendredi : 9h - 18h</p>
                  <p className="text-muted-foreground">Samedi : 9h - 12h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elevation border-border/50 bg-gradient-primary/5 backdrop-blur-sm hover:shadow-glow transition-all duration-300 hover:scale-105">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Nos horaires
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Notre équipe est disponible pour répondre à vos questions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;