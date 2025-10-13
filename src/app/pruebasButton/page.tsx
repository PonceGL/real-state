'use client'

import Button from "@/components/Button";

export default function PruebaButton() {
    return (
        <>
            <Button buttonClick={() => { console.log('en llamada...') }} text={"Llama"} />
            <Button buttonClick={() => { console.log('colgado') }} text={"cuelga"} />
        </>
    )
}
