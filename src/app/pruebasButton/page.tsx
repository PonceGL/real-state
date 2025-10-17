'use client'

import ChevronRight from "@/components/icons/chevronright"
import IconEye from "@/components/icons/iconeye"
import Magnifier from "@/components/icons/magnifier"
import PhoneIcon from "@/components/icons/phoneicon"
import SendIcon from "@/components/icons/send"
import { Button } from "@/components/ui/button/index"




export default function PruebaButton() {
    return (
        <>
            <Button
                variant="default"
                size="movile"
            >
                <PhoneIcon /> Llamar (228) 210-7188
            </Button>
            <Button
                variant="default"
                size="movile"
            >
                <Magnifier /> Buscar
            </Button>
            <Button
                variant="default"
                size="movile"
            >
                <SendIcon /> Enviar
            </Button>
            <Button
                variant="default"
                size="movile"
            >
                <IconEye /> Ver Detalles <ChevronRight />
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
                Ver Todas Las Propiedades <ChevronRight color="#1062C6" />
            </Button>
        </>
    )
}
