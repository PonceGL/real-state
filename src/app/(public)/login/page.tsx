import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/loginForm";
import { defaultMetadata } from "@/config/site";
import { getUser } from "@/lib/dal";

export const metadata = defaultMetadata;

export default async function LoginPage() {
  const user = await getUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <section className="w-full p-5 flex flex-col justify-center items-center border border-pink-500">
      <LoginForm />
    </section>
  );
}
