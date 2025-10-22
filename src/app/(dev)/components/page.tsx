import { LoginForm } from "@/components/loginform";
import { ExampleButton } from "@/components/ui/button/example";
import { DocsIcon } from "@/components/ui/icon/docsicon";
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
          <DocsIcon size="large" variant="black" />
          <DocsIcon size="large" variant="danger" />
          <DocsIcon size="large" variant="default" />
          <DocsIcon size="large" variant="warning" />
          <DocsIcon size="large" variant="whatsapp" />
          <DocsIcon size="large" variant="white" />
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
