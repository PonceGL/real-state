import Link from "next/link";

import { defaultMetadata } from "@/config/site";

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="w-full p-4 bg-blue-600 text-white">
        <Link href="/">Home</Link>
      </header>
      {children}
    </>
  );
}
