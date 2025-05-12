import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const balanceService = async (accountId: number) => {
  try {
    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new Error('Akun tidak ditemukan');
    }

    return {
      name: account.name,
      email: account.email,
      balance: account.balance,
    };
  } catch (error) {
    throw error;
  }
};
