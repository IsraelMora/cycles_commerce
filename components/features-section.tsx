"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Award, Truck } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Tecnología Avanzada",
    description: "Componentes de última generación para máximo rendimiento",
  },

  {
    icon: Award,
    title: "Calidad Certificada",
    description: "Certificamos calidad y seguridad",
  },
  {
    icon: Truck,
    title: "Envío Gratuito",
    description: "Envío gratuito en pedidos a pedios cercano",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            ¿Por Qué Elegir Mauricycles?
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {" "}
            Nos comprometemos a ofrecer la mejor experiencia en bicicletas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center border-border hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
