import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Zap, Leaf, Euro, Play, Check, Clock, FileText, Truck } from "lucide-react";
import { useState } from "react";
const velocargoLogo = "/lovable-uploads/c6b34f92-a5b3-4d4b-8a6e-c6ab1ca44f14.png";
const heroBike = "/lovable-uploads/cargo-bike-final.png";

// Images de la galerie
const bikeImages = [
  { src: "/lovable-uploads/bike-full-view-1.jpg", alt: "Vélo-cargo électrique vue complète" },
  { src: "/lovable-uploads/bike-full-view-2.jpg", alt: "Vélo-cargo électrique en forêt" },
  { src: "/lovable-uploads/bike-full-view-3.jpg", alt: "Vélo-cargo électrique sur route" },
  { src: "/lovable-uploads/bike-full-view-4.jpg", alt: "Vélo-cargo électrique angle différent" },
  { src: "/lovable-uploads/bike-full-view-5.jpg", alt: "Vélo-cargo électrique dans la nature" },
  { src: "/lovable-uploads/bike-full-view-6.jpg", alt: "Vélo-cargo électrique sur parking" },
  { src: "/lovable-uploads/bike-detail-handlebar.jpg", alt: "Détail guidon et commandes" },
  { src: "/lovable-uploads/bike-display-screen.jpg", alt: "Écran de contrôle" },
  { src: "/lovable-uploads/bike-wheel-detail.jpg", alt: "Détail roue et transmission" }
];

const Hero = () => {
  // État pour gérer le média sélectionné (vidéo ou image)
  const [selectedMedia, setSelectedMedia] = useState<{ type: 'video' | 'image', src: string }>({ 
    type: 'video', 
    src: '/lovable-uploads/cargo-bike-demo.mp4' 
  });

  const handleImageClick = (imageSrc: string) => {
    setSelectedMedia({ type: 'image', src: imageSrc });
  };

  const handleVideoClick = () => {
    setSelectedMedia({ type: 'video', src: '/lovable-uploads/cargo-bike-demo.mp4' });
  };


  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background to-muted/50">
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/10 animate-float" />
        <div className="absolute top-40 left-10 w-24 h-24 rounded-lg bg-secondary/10 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 right-32 w-16 h-40 rounded-full bg-primary-light/10 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-20 w-20 h-20 rounded-lg bg-secondary-light/10 animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="relative">
          <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold text-center">
              Les prochaines étapes de votre commande
            </h2>
          </div>
          <div className="relative z-10">
            {/* Média principal (vidéo ou image) */}
            <div className="w-full max-w-2xl mx-auto relative mb-6">
              {selectedMedia.type === 'video' ? (
                <video
                  src={selectedMedia.src}
                  className="w-full drop-shadow-2xl animate-float rounded-2xl"
                  loop
                  muted
                  autoPlay
                  playsInline
                />
              ) : (
                <img
                  src={selectedMedia.src}
                  alt="Vélo-cargo électrique"
                  className="w-full drop-shadow-2xl animate-float rounded-2xl object-cover aspect-video"
                />
              )}
            </div>

            {/* Carrousel de miniatures */}
            <div className="w-full max-w-2xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {/* Miniature vidéo */}
                  <CarouselItem className="pl-2 md:pl-4 basis-1/3 md:basis-1/4">
                    <div className="p-1">
                      <div 
                        className={`relative aspect-square rounded-lg overflow-hidden bg-card border transition-all duration-300 cursor-pointer group ${
                          selectedMedia.type === 'video' ? 'border-primary' : 'border-border/20 hover:border-primary/30'
                        }`}
                        onClick={handleVideoClick}
                      >
                        <video
                          src="/lovable-uploads/cargo-bike-demo.mp4"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="h-6 w-6 text-white drop-shadow-lg" fill="currentColor" />
                        </div>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </CarouselItem>
                  {/* Miniatures images */}
                  {bikeImages.map((image, index) => (
                    <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/3 md:basis-1/4">
                      <div className="p-1">
                        <div 
                          className={`relative aspect-square rounded-lg overflow-hidden bg-card border transition-all duration-300 cursor-pointer group ${
                            selectedMedia.type === 'image' && selectedMedia.src === image.src ? 'border-primary' : 'border-border/20 hover:border-primary/30'
                          }`}
                          onClick={() => handleImageClick(image.src)}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
            
            {/* Badge promotionnel animé */}
            <div className="absolute top-4 -left-8 z-20">
              <div className="bg-primary text-primary-foreground rounded-full px-4 py-2 shadow-glow animate-pulse text-sm font-bold text-center min-w-[120px] border-2 border-primary-light">
                <div className="text-base font-black">Opération</div>
                <div className="text-base font-black">terminée</div>
              </div>
            </div>
          </div>
          
          {/* Glow effect behind bike */}
          <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl scale-110 animate-pulse-soft" />
          
          {/* Lightning bolt decorations */}
          <div className="absolute top-10 right-10 text-primary/30">
            <Zap className="h-8 w-8 animate-pulse" />
          </div>
          <div className="absolute bottom-20 left-10 text-secondary/30">
            <Zap className="h-6 w-6 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>

          {/* Specifications */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 shadow-elevation overflow-hidden">
              <button 
                className="w-full px-6 py-4 text-left bg-primary/5 hover:bg-primary/10 transition-smooth flex items-center justify-between group"
                onClick={(e) => {
                  const content = e.currentTarget.nextElementSibling as HTMLElement;
                  const isOpen = content.style.maxHeight !== '0px' && content.style.maxHeight !== '';
                  if (isOpen) {
                    content.style.maxHeight = '0px';
                    content.style.opacity = '0';
                  } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                  }
                }}
              >
                <span className="font-semibold text-foreground">📋 Spécifications techniques</span>
                <Zap className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              </button>
              
              <div 
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{ maxHeight: '0px', opacity: '0' }}
              >
                <div className="p-6 space-y-6">
                  <div>
                    <h4 className="font-bold text-primary mb-3 flex items-center">
                      <Zap className="h-4 w-4 mr-2" />
                      MOTEUR & BATTERIE
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                      <li>• Moteur : 250W</li>
                      <li>• Batterie : 36V 11.6Ah 417Wh</li>
                      <li>• Temps de recharge : 6-7h</li>
                      <li>• Autonomie : 40-50 km</li>
                      <li>• Vitesse maximale : 25km/h</li>
                      <li>• Modes d'assistance : 3 niveaux sélectionnables</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-secondary mb-3">CARACTÉRISTIQUES</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                      <li>• Dimensions : 1720mm × 1280mm × 540mm</li>
                      <li>• Poids à vide : 31kg</li>
                      <li>• Charge maximale : 175kg (conducteur inclus)</li>
                      <li>• Pente maximale : 15%</li>
                      <li>• Matériau du cadre : Acier carbone haute résistance</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-primary mb-3">ÉQUIPEMENTS</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-6">
                      <li>• Freins à disque</li>
                      <li>• Transmission : Shimano 7 vitesses</li>
                      <li>• Roues : 20 pouces</li>
                      <li>• Suspension : Avant</li>
                    </ul>
                  </div>
                  
                  <div className="text-xs text-muted-foreground italic pt-4 border-t border-border/30">
                    Normes : EN 17860 - NF EN 15194 | Durée de vie : 6 ans | Conforme CEE TRA-EQ-131
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 w-fit text-sm px-3 py-1">
            <Zap className="h-3 w-3 mr-2" />
            Suivi de votre commande
          </Badge>
          
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-6">
              Votre vélo-cargo{" "}
              <span className="text-primary">électrique</span>
            </h1>
          </div>

          {/* Timeline des étapes */}
          <div className="space-y-4">
            {/* Étape 1 - Prise de commande (Complétée) */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-glow">
                  <Check className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="w-0.5 h-12 bg-primary/30 mt-2" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-foreground">Prise de commande</h3>
                <p className="text-sm text-muted-foreground mt-1">Votre commande a été enregistrée avec succès</p>
              </div>
            </div>

            {/* Étape 2 - Immatriculation (En cours) */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center animate-pulse">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="w-0.5 h-12 bg-border/30 mt-2" />
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-foreground">Enregistrement sur le fichier FNUCI</h3>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                    En cours
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Votre vélo est en cours d'enregistrement sur le fichier FNUCI</p>
              </div>
            </div>

            {/* Étape 3 - Demande de documents */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="w-0.5 h-12 bg-border/30 mt-2" />
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-muted-foreground">Demande de documents</h3>
                <p className="text-sm text-muted-foreground/70 mt-1">Documents à fournir pour finaliser le dossier</p>
              </div>
            </div>

            {/* Étape 4 - Validation et livraison */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-muted border-2 border-border flex items-center justify-center">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg font-bold text-muted-foreground">Validation et livraison</h3>
                <p className="text-sm text-muted-foreground/70 mt-1">Livraison de votre vélo-cargo électrique</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;