import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import type { Session } from "@repo/auth";
import { auth } from "@repo/auth";

export const createTRPCContext = async (opts: {
  headers: Headers;
  session: Session | null;
}) => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
};

export const createContext = async () => {
  // const session = await getSession({ req: opts.req });
  const session = await auth();
  return {
    session,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
  /**
   * @see https://trpc.io/docs/server/error-formatting
   */
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

/**
 * Server Side Calls
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * Define Routers
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

// Base router and procedure helpers
//export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use((opts) => {
  const { ctx, next } = opts;
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: { ...ctx.session, user: ctx.session.user },
    },
  });
});
