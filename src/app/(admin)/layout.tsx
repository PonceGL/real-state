import Link from "next/link";
import { redirect } from "next/navigation";

import { defaultMetadata } from "@/config/site";
import { getUser } from "@/lib/dal";


export const metadata = defaultMetadata;

export default async  function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  return (
    <>
      <header className="w-full p-4 bg-gray-700 text-white">
        <Link href="/">Admin Home</Link>
      </header>
      {children}
    </>
  );
}
