import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createContext = () => {
  return { prisma };
};

export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

export type Context = ReturnType<typeof createContext>;
