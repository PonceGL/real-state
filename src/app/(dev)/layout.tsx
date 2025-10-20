import Link from "next/link";

export default function DevLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="w-full p-4 bg-blue-400 text-white">
        <Link href="/">Home</Link>
      </header>
      {children}
    </>
  );
}
