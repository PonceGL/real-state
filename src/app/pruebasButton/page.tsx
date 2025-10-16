'use client'

import { Button } from "@/components/ui/button/index"



export default function PruebaButton() {
    return (
        <>
            <Button
                variant="default"
                size="movile"
            >
                Llamar (228) 210-7188
            </Button>
            <Button
                variant="whatsapp"
                size="movile"
            >
                whatsApp
            </Button>
            <Button
                variant="secondary"
                size="movile"
            >
                Ver Propiedades
            </Button>
            <Button
                variant="outline"
                size="movile"
            >
                Ver Todas Las Propiedades
            </Button>
        </>
    )
}
