'use client'

import Button from "@/components/Button";

export const PruebaButton = () => {
    return (
        <>
            <Button buttonClick={() => { console.log('en llamada...') }} text={"Llama"} />
            <Button buttonClick={() => { console.log('colgado') }} text={"cuelga"} />
        </>
    )
}
