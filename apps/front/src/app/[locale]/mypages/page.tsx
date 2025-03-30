import { AuthButton } from "@/components/AuthButton";
import { Greeting } from "./Greeting";

export default async function Page() {
  return (
    <main>
      <h1>Mypage</h1>
      <AuthButton />
      <Greeting />
    </main>
  );
}
