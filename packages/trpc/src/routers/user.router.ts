import { z } from "zod";
import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from "../schema/user.schema";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@repo/database";

export const userRouter = createTRPCRouter({
  create: publicProcedure
    .input(createUserSchema)
    .mutation(async ({ input }) => {
      await prisma.user.create({
        data: input,
      });
    }),
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
  getAll: protectedProcedure
    .input(
      z.object({
        page: z.number().default(0),
        limit: z.number().default(10),
      }),
    )
    .query(async ({ input }) => {
      const { page, limit } = input;
      const users = await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        //where: {},
        orderBy: {
          createdAt: "desc",
        },
      });
      // 전체 데이터 수 조회 (총 페이지 수 계산용)
      const totalCount = await prisma.user.count();
      return {
        users,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      };
    }),
  getById: publicProcedure.input(z.string()).query(async ({ input }) => {
    return await prisma.user.findFirstOrThrow({
      where: { id: input },
    });
  }),
});
