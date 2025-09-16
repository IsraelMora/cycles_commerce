"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Search, Filter } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

const allProducts = [
  {
    id: "1",
    name: "Aerodynamic Pro TT",
    price: 4299,
    originalPrice: 4999,
    image: "/aerodynamic-time-trial-bike-black-carbon.jpg",
    category: "Time Trial",
    brand: "Bayker Pro",
    isNew: true,
    discount: 14,
  },
  {
    id: "2",
    name: "Carbon Speed Elite",
    price: 3599,
    image: "/carbon-road-bike-red-and-black.jpg",
    category: "Road",
    brand: "Bayker Elite",
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
    brand: "Bayker Beast",
    isNew: true,
    discount: 12,
  },
  {
    id: "4",
    name: "Urban Commuter Pro",
    price: 1899,
    image: "/urban-commuter-bike-sleek-design.jpg",
    category: "Urban",
    brand: "Bayker City",
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
    brand: "Bayker Trail",
    isNew: false,
    discount: 13,
  },
  {
    id: "6",
    name: "Electric Speedster",
    price: 3999,
    image: "/electric-bike.png",
    category: "Electric",
    brand: "Bayker E-Power",
    isNew: true,
    discount: 0,
  },
  {
    id: "7",
    name: "Racing Champion",
    price: 6299,
    originalPrice: 6999,
    image: "/professional-racing-bike-carbon-fiber.jpg",
    category: "Road",
    brand: "Bayker Pro",
    isNew: true,
    discount: 10,
  },
  {
    id: "8",
    name: "Gravel Adventure",
    price: 2999,
    image: "/gravel-bike-adventure-ready.jpg",
    category: "Gravel",
    brand: "Bayker Adventure",
    isNew: false,
    discount: 0,
  },
]

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [products] = useState(allProducts)
  const { dispatch } = useCart()
  const [addingToCart, setAddingToCart] = useState<string | null>(null)

  const categories = ["all", "Road", "Triathlon", "Mountain", "Urban", "Electric", "Time Trial", "Gravel"]

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "all" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const handleAddToCart = async (product: (typeof allProducts)[0]) => {
    setAddingToCart(product.id)

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
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Tienda de Bicicletas</h1>
          <p className="text-muted-foreground text-lg">
            Descubre nuestra colección disponible de bicicletas
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar bicicletas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "Todas las categorías" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">{filteredProducts.length} productos encontrados</p>
                {/* <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Más filtros
                </Button> */}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-border">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-primary text-primary-foreground">Nuevo</Badge>}
                    {product.discount > 0 && <Badge variant="destructive">-{product.discount}%</Badge>}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>

                  {/* Quick Add to Cart */}
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

                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{product.brand}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">€{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        €{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            Cargar Más Productos
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
