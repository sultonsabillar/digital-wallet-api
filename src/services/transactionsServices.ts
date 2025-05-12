import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const transactionsService = async (accountId: number) => {
  try {
    
    const transactions = await prisma.transaction.findMany({
      where: { accountId: accountId },
      orderBy: { createdAt: 'desc' }, 
    });

    return transactions; 
  } catch (error) {
    throw error;
  }
};
