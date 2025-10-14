'use client'

import Button from "@/components/Button";

export default function PruebaButton() {
    return (
        <>
            <Button stylePreset=" bg-[#1062C6] m-2" styleText="text-white" buttonClick={() => { console.log('Llamando') }} text={"Llamar (228) 210-7188"} />
            <Button stylePreset=" bg-white border-2 border-[#1062C6] m-2 " styleText="text-[#1062C6]" buttonClick={() => { console.log('Ver Todas las Propiedades') }} text={"Ver Todas las Propiedades"} />
            <Button stylePreset=" bg-[#198754] m-2" styleText="text-white" buttonClick={() => { console.log('WhatsApp') }} text={"WhatsApp"} />
        </>
    )
}
