import { LoginForm } from "@/components/loginform";
import { ExampleButton } from "@/components/ui/button/example";
import MountainIcon from "@/components/ui/icon/mountain";
import { PencilIcon } from "@/components/ui/icon/pencilicon";
import { ExampleInput } from "@/components/ui/input/example";
import { Wrapper } from "@/components/wrapper";

export default function ComponentsPage() {
  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <div className="w-full p-4 flex flex-col justify-center items-center gap-4">
        <h3 className="w-full text-left text-3xl font-bold">Button Variants</h3>
        <Wrapper>
          <ExampleButton />
        </Wrapper>
        <Wrapper isDarkBackground>
          <ExampleButton />
        </Wrapper>
      </div>
      <div className="w-full p-4 flex flex-col justify-center items-center gap-4">
        <h3 className="w-full text-left text-3xl font-bold">Input Variants</h3>
        <Wrapper>
          <ExampleInput />
        </Wrapper>
        <Wrapper isDarkBackground>
          <ExampleInput />
          <PencilIcon size="large" variant="danger" />
          <MountainIcon size="large" variant="danger" />
        </Wrapper>
      </div>
      <div className="w-full p-4 flex flex-col justify-center items-center gap-4">
        <h3 className="w-full text-left text-3xl font-bold">Login Form</h3>
        <Wrapper>
          <LoginForm />
        </Wrapper>
        <Wrapper isDarkBackground>
          <LoginForm isInDarkBackground />
        </Wrapper>
      </div>
    </main>
  );
}
