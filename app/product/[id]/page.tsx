"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ShoppingCart, Star } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import { useParams } from "next/navigation"

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
    description:
      "Bicicleta de triatlón aerodinámica diseñada para máximo rendimiento. Cuadro de fibra de carbono ultraligero con geometría optimizada para posición aerodinámica.",
    features: [
      "Cuadro de fibra de carbono",
      "Ruedas aerodinámicas",
      "Cambios electrónicos",
      "Frenos de disco hidráulicos",
    ],
    specifications: {
      Peso: "7.2 kg",
      Material: "Fibra de carbono",
      Tallas: "S, M, L, XL",
    },
  },
  {
    id: "2",
    name: "Carbon Speed Elite",
    price: 3599,
    image: "/carbon-road-bike-red-and-black.jpg",
    category: "Road",
    isNew: false,
    discount: 0,
    description: "Bicicleta de carretera de alto rendimiento con cuadro de carbono y componentes de primera calidad.",
    features: ["Cuadro de carbono", "Grupo Shimano Ultegra", "Ruedas de carbono", "Manillar integrado"],
    specifications: {
      Peso: "8.1 kg",
      Material: "Fibra de carbono",
      Tallas: "S, M, L",
    },
  },
  // Add more products as needed...
]

export default function ProductDetail() {
  const params = useParams()
  const { dispatch } = useCart()
  const [addingToCart, setAddingToCart] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Link href="/store">
            <Button>Volver a la tienda</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = async () => {
    setAddingToCart(true)
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

    setAddingToCart(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/store">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a la tienda
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.isNew && <Badge className="bg-primary text-primary-foreground">Nuevo</Badge>}
                {product.discount > 0 && <Badge variant="destructive">-{product.discount}%</Badge>}
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>

              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">€{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    €{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Características</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={addingToCart}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              {addingToCart ? "Agregando..." : "Añadir al Carrito"}
            </Button>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Especificaciones</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
