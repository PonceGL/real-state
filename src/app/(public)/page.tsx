import { defaultMetadata } from "@/config/site";

export const metadata = defaultMetadata;

export default function Home() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Bienvenido a Next.js!</h1>
      <p>Página de inicio para a app.</p>
    </main>
  );
}
