"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartDrawer } from "@/components/cart-drawer"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-2xl font-bold text-foreground">
              <span className="text-2xl text-primary">Mauri</span>Cycles
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
              Inicio
            </Link>
            <Link
              href="/store"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Tienda
            </Link>
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <CartDrawer />

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Inicio
              </Link>
              <Link href="/features" className="text-foreground hover:text-primary transition-colors font-medium">
                Características
              </Link>
              <Link href="/store" className="text-foreground hover:text-primary transition-colors font-medium">
                Tienda
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contacto
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
