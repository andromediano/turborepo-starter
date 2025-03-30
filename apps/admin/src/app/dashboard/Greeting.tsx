"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function Greeting() {
  const trpc = useTRPC();
  const greeting = useQuery(trpc.hello.greet.queryOptions({ text: "world" }));
  if (!greeting.data) return <div>Loading...</div>;
  return <div>{greeting.data.greeting}</div>;
}
