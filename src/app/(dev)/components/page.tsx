import { LoginForm } from "@/components/loginform";
import { ExampleButton } from "@/components/ui/button/example";
import { CloseIcon } from "@/components/ui/icon/close";
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
          <CloseIcon size="large" variant="black" />
          <CloseIcon size="large" variant="danger" />
          <CloseIcon size="large" variant="default" />
          <CloseIcon size="large" variant="whatsapp" />
          <CloseIcon size="large" variant="warning" />
          <CloseIcon size="large" variant="white" />
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
