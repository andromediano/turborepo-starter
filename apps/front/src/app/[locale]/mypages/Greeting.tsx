"use client";

import {
  useQuery,
  //useQueryClient,
  //useSuspenseQuery,
} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function Greeting() {
  const trpc = useTRPC();

  const greeting = useQuery(trpc.hello.greet.queryOptions({ text: "world" }));
  //trpc.hello.greet.queryOptions({ text: "world xx" })
  if (!greeting.data) return <div>Loading...</div>;
  return <div>{greeting.data.greeting}</div>;
}
