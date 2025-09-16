"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QrCode, MessageCircle, X } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

interface CheckoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CheckoutDialog({ open, onOpenChange }: CheckoutDialogProps) {
  const { state } = useCart()
  const [showQR, setShowQR] = useState(false)

  const whatsappMessage = `Hola! Me interesa comprar los siguientes productos:%0A%0A${state.items
    .map((item) => `• ${item.name} (${item.quantity}x) - €${(item.price * item.quantity).toLocaleString()}`)
    .join("%0A")}%0A%0ATotal: €${state.total.toLocaleString()}`

  const whatsappUrl = `https://wa.me/1234567890?text=${whatsappMessage}`

  const handleWhatsAppRedirect = () => {
    window.open(whatsappUrl, "_blank")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Finalizar Compra
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>Completa tu pedido contactándonos por WhatsApp</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <div className="space-y-2">
            <h4 className="font-medium">Resumen del pedido:</h4>
            {state.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>€{(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span className="text-primary">€{state.total.toLocaleString()}</span>
            </div>
          </div>

          {!showQR ? (
            <div className="space-y-4">
              <Button className="w-full" size="lg" onClick={handleWhatsAppRedirect}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Contactar por WhatsApp
              </Button>

              <div className="text-center">
                <span className="text-sm text-muted-foreground">o</span>
              </div>

              <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowQR(true)}>
                <QrCode className="h-4 w-4 mr-2" />
                Mostrar Código QR
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-white p-4 rounded-lg inline-block">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(whatsappUrl)}`}
                  alt="QR Code para WhatsApp"
                  className="w-48 h-48"
                />
              </div>
              <p className="text-sm text-muted-foreground">Escanea el código QR para abrir WhatsApp</p>
              <Button variant="outline" onClick={() => setShowQR(false)} className="bg-transparent">
                Volver
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
