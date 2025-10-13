import { defaultMetadata } from "@/config/site";

export const metadata = defaultMetadata;

'use client'

import Button from "@/components/Button";
export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Bienvenido a Next.js!</h1>
      <p>Página de inicio para a app.</p>
      <Button buttonClick={() => { console.log('en llamada...') }} text={"Llama"} />
      <Button buttonClick={() => { console.log('colgado') }} text={"cuelga"} />
    </main>
  );
}
