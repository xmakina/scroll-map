import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export type PrismaConfig = {
  datasourceUrl: string;
};

export const prisma = globalForPrisma.prisma || new PrismaClient();

// eslint-disable-next-line no-process-env
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
