import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
//import { getLogger } from '@/lib/logger';
import { appRouter, createContext } from "@repo/trpc";

//const logger = getLogger('trpc');

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    //createContext: () => {},
    createContext: async () => await createContext(),
    //onError: (opts) => logger.error(`Error occured at ${opts.path}`),
  });

export { handler as GET, handler as POST };
