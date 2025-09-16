import Link from "next/link"
import { Facebook, Instagram, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          {/* Brand */}
          <div className="flex flex-col justify-center space-y-4">
            <Link href="/" className="flex items-center space-x-2 justify-center">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-2xl font-bold">
                <span className="text-primary">Mauri</span>cycles
              </span>
            </Link>
            <p className="text-background/70 text-sm text-center">
              Tu tienda especializada en bicicletas. Calidad, rendimiento y pasión por el ciclismo.
            </p>
            <div className="flex space-x-4 justify-center">
              <Link href="#" className="text-background/70 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/mauricycles/" className="text-background/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
             <Link href="https://wa.me/584125554985?text=Hola%2C%20estoy%20interesado%20en%20sus%20bicicletas.%20%C2%BFPodr%C3%ADan%20darme%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20modelos%20disponibles%3F" className="text-background/70 hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
              </Link>

            </div>
          </div>

          
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/70 text-sm">© 2024 Mauricycles. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
