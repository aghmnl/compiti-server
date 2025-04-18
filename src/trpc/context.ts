import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Prisma is a singleton, so we create it once

export const createContext = () => {
  return { prisma };
};

export const disconnectPrisma = async () => {
  await prisma.$disconnect();
};

export type Context = ReturnType<typeof createContext>;
