'use client'

import { Input } from "@/components/ui/input"


export default function PruebaButton() {
    return (
        <>
            <Input type="email" placeholder="email" />
            <Input type="text" placeholder="Escribe..." />
            <Input type="tel" placeholder="123..." />
            <Input type="text" placeholder="123..." />
        </>
    )
}
