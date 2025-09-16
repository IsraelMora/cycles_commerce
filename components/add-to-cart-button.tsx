"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface AddToCartButtonProps {
  product: Product
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon" | null | undefined
  className?: string
  showIcon?: boolean
}

export function AddToCartButton({
  product,
  variant = "default",
  size = "lg",
  className = "",
  showIcon = true,
}: AddToCartButtonProps) {
  const { dispatch } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 500))

    dispatch({
      type: "ADD_ITEM",
      payload: product,
    })

    setIsAdding(false)
    setJustAdded(true)

    // Reset success state after 2 seconds
    setTimeout(() => setJustAdded(false), 2000)
  }

  const getButtonText = () => {
    if (isAdding) return "Agregando..."
    if (justAdded) return "¡Agregado!"
    return "Añadir al Carrito"
  }

  const getIcon = () => {
    if (justAdded) return <Check className="h-4 w-4 mr-2" />
    return <ShoppingCart className="h-4 w-4 mr-2" />
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleAddToCart} disabled={isAdding}>
      {showIcon && getIcon()}
      {getButtonText()}
    </Button>
  )
}
