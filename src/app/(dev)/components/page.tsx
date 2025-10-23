import { ExampleIcons } from "@/components/icons/example";
import { LoginForm } from "@/components/loginform";
import { ExampleButton } from "@/components/ui/button/example";
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
      <div className="w-full p-4 flex flex-col justify-center items-center gap-4 text-amber-300">
        <h3 className="w-full text-left text-3xl font-bold">Icon Form</h3>
        <Wrapper>
          <ExampleIcons />
        </Wrapper>
        <Wrapper isDarkBackground>
          <ExampleIcons />
        </Wrapper>
      </div>
    </main>
  );
}
