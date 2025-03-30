import { z } from "zod";
import { updateUserSchema, deleteUserSchema } from "../schema/user.schema";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@repo/database";

export const userRouter = createTRPCRouter({
  /*
  create: publicProcedure.input(createUserSchema).mutation(async ({ input }) => {
    await prisma.user.create({
      data: input,
    });
  }),
  */
  update: publicProcedure
    .input(updateUserSchema)
    .mutation(async ({ input }) => {
      const { id, email, name } = input;
      await prisma.user.update({
        where: { id },
        data: {
          email,
          name,
        },
      });
    }),
  delete: publicProcedure
    .input(deleteUserSchema)
    .mutation(async ({ input }) => {
      await prisma.user.delete({ where: { id: input.id } });
    }),
  getAll: protectedProcedure.query(async () => {
    return await prisma.user.findMany();
  }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.user.findFirstOrThrow({
      where: { id: input },
    });
  }),
});
