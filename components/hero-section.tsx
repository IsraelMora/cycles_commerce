"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import Link from "next/link"

export function HeroSection() {
  const { dispatch } = useCart()
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const featuredBike = {
    id: "hero-bike",
    name: "SMART KM 1.8 HOWERLI",
    price: 5299,
    image: "/aerodynamic-triathlon-bike-black-and-red.jpg",
    category: "Contrarreloj",
  }

  return (
    <section className="relative min-h-screen  overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-muted-foreground font-medium tracking-wide uppercase">Inicia Hoy</p>
              <h1 className="text-5xl lg:text-7xl font-black text-foreground leading-tight">
                Tu Bicicleta
                <br />
                <span className="text-4xl lg:text-6xl">Tu vida en movimiento</span>
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/store">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? "Agregando..." : "Comprar Ahora"}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Bike Image */}
          <div className="relative">
            <div className="relative -z-10">
              <img
                src="images\cycle_red_rin20.jpg"
                alt="Bicicleta Smart KM 1.8 Howerli"
                className="w-full h-[40rem] object-cover border-2 border-border"
              />
            </div>

            {/* Specs */}
            <div className="absolute top-20 right-0 bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-foreground">Acero</div>
              <div className="text-sm text-muted-foreground">Material</div>
            </div>

            <div className="absolute bottom-20 right-10 bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-primary">07</div>
              <div className="text-sm text-muted-foreground">Velocidades</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-foreground text-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">


            <div className="text-center">
              <div className="text-4xl font-bold opacity-30">Desplázate</div>
              <div className="w-6 h-6 border-2 border-background/30 rounded-full mx-auto mt-2 flex items-center justify-center">
                <div className="w-2 h-2 bg-background/30 rounded-full"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
