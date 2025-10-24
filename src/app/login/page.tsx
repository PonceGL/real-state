import { redirect } from "next/navigation";

import { Logo } from "@/components/icons/logo";
import { LoginForm } from "@/components/loginform";
import { defaultMetadata } from "@/config/site";
import { ADMIN_DASHBOARD } from "@/constants/routes";
import { getUser } from "@/lib/dal";

export const metadata = defaultMetadata;

export default async function LoginPage() {
  const user = await getUser().catch(() => null);
  if (user) {
    redirect(ADMIN_DASHBOARD);
  }

  return (
    <main className="w-dvw min-h-dvh p-5 py-32 gap-8 grid grid-cols-1 grid-rows-[1fr_2fr] place-items-center">
      <span className="w-28 md:w-40 lg:w-52">
        <Logo />
      </span>
      <div className="w-full h-full flex justify-center items-start">
        <LoginForm />
      </div>
    </main>
  );
}
