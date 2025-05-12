import { PrismaClient, Account } from '@prisma/client';

const prisma = new PrismaClient();

export const withdrawService = async (accountId: number, withdrawAmount: number) => {
  try {

    const account = await prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new Error('Akun tidak ditemukan');
    }

    if (account.balance < withdrawAmount) {
      throw new Error('Saldo tidak cukup');
    }

    const updatedAccount: Account = await prisma.account.update({
      where: { id: accountId },
      data: { balance: account.balance - withdrawAmount },
    });

    await prisma.transaction.create({
      data: {
        amount: withdrawAmount,
        type: 'WITHDRAW',
        accountId: updatedAccount.id,
      },
    });

    return updatedAccount.balance;
  } catch (error) {
    throw error;
  }
};
