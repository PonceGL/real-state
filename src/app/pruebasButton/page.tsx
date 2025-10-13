'use client'

import Button from "@/components/Button";

export default function PruebaButton() {
    return (
        <>
            <Button stylePreset=" bg-[#1062C6] m-2" buttonClick={() => { console.log('en llamada...') }} text={"Llama"} />
            <Button stylePreset=" bg-[#198754] m-2" buttonClick={() => { console.log('colgado') }} text={"cuelga"} />
        </>
    )
}
