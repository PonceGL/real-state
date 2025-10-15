import { Metadata } from "next";

import { siteConfig } from "@/config/site";


export const metadata: Metadata = {
  title: `Admin | ${siteConfig.name}`,
  description: `Admin dashboard | ${siteConfig.description}`,
};

export default function Dashboard() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1>Este es el dashboard de administración</h1>
    </main>
  );
}
