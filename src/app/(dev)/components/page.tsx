import { LoginForm } from "@/components/loginform";
import { ExampleButton } from "@/components/ui/button/example";
import { FilterIcon } from "@/components/ui/icon/filtericon";
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
          <FilterIcon size="large" variant="black" />
          <FilterIcon size="large" variant="danger" />
          <FilterIcon size="large" variant="default" />
          <FilterIcon size="large" variant="warning" />
          <FilterIcon size="large" variant="whatsapp" />
          <FilterIcon size="large" variant="white" />
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
