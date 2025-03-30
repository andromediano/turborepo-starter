import { helloRouter } from "./hello.router";
import { userRouter } from "./user.router";
import { createTRPCRouter } from "../trpc";

/**
 * Root Router(a.k.a. appRouter)
 *
 * This route is the hub route that tRPC will point to when trying to decide where to send a request.
 * In this example, I use the createRouter function we created previously and create a router with type safety.
 * I then merge in a new route that we will create in a second.
 * The first parameter of the merge function is the name of the route, the second is the router to use.
 * You can chain this with all the necessary routes.
 */
// export const appRouter = mergeRouters(helloRouter, userRouter);
export const appRouter = createTRPCRouter({
  hello: helloRouter,
  user: userRouter,
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
