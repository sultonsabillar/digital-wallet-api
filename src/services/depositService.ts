import { PrismaClient, Account } from '@prisma/client';

const prisma = new PrismaClient();

export const depositService = async (accountId: number, amount: number) => {
  try {

    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new Error('Akun tidak ditemukan');
    }

    const updatedAccount: Account = await prisma.account.update({
      where: { id: accountId },
      data: { balance: account.balance + amount },
    });

    await prisma.transaction.create({
      data: {
        amount: amount,
        type: 'DEPOSIT',
        accountId: updatedAccount.id,
      },
    });

    return updatedAccount.balance;
  } catch (error) {
    throw error;
    
  }
};
