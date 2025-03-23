// 아래 에러가 보인다면 `pnpm turbo db:generate`를 실행하자!! 그 다음이 `turbo build`
// ‼️ Module '"@prisma/client"' has no exported member 'PrismaClient'.
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
