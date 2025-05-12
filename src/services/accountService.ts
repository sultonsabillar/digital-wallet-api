import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAccount = async (name: string, email: string) => {
  try {
    const account = await prisma.account.create({
      data: { 
        name, 
        email },
    });
    return account;
  } catch (error) {
    throw error;
  }
};
