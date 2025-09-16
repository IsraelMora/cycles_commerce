"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useState } from "react"
import Link from "next/link"

const products = [
  {
    id: "1",
    name: "Aerodynamic Pro TT",
    price: 4299,
    originalPrice: 4999,
    image: "/aerodynamic-time-trial-bike-black-carbon.jpg",
    category: "Time Trial",
    isNew: true,
    discount: 14,
  },
  {
    id: "2",
    name: "Carbon Speed Elite",
    price: 3599,
    image: "/carbon-road-bike-red-and-black.jpg",
    category: "Road",
    isNew: false,
    discount: 0,
  },
  {
    id: "3",
    name: "Triathlon Beast X1",
    price: 5299,
    originalPrice: 5999,
    image: "/triathlon-bike-aerodynamic-red.jpg",
    category: "Triathlon",
    isNew: true,
    discount: 12,
  },
  {
    id: "4",
    name: "Urban Commuter Pro",
    price: 1899,
    image: "/urban-commuter-bike-sleek-design.jpg",
    category: "Urban",
    isNew: false,
    discount: 0,
  },
  {
    id: "5",
    name: "Mountain Explorer",
    price: 2799,
    originalPrice: 3199,
    image: "/mountain-bike-trail.png",
    category: "Mountain",
    isNew: false,
    discount: 13,
  },
  {
    id: "6",
    name: "Electric Speedster",
    price: 3999,
    image: "/electric-bike.png",
    category: "Electric",
    isNew: true,
    discount: 0,
  },
]

export function ProductGrid() {
  const { dispatch } = useCart()
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  const handleAddToCart = async (product: (typeof products)[0]) => {
    setAddingToCart(product.id)

    // Simulate loading state
    await new Promise((resolve) => setTimeout(resolve, 500))

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      },
    })

    setAddingToCart(null)
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Nuestra Colección</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Descubre nuestra selección de bicicletas, diseñadas para el rendimiento y la velocidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-border">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                  </Link>

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-primary text-primary-foreground">Nuevo</Badge>}
                    {product.discount > 0 && <Badge variant="destructive">-{product.discount}%</Badge>}
                  </div>

                  <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart === product.id}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {addingToCart === product.id ? "Agregando..." : "Añadir al Carrito"}
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>

                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">€{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        €{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/store">
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              Ver Todos los Productos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
