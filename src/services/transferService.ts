import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const transferService = async (fromId: number, toAccountId: number, transferAmount: number) => {
  return await prisma.$transaction(async (tx) => {
    const sender = await tx.account.findUnique({
      where: { id: fromId },
    });

    if (!sender) {
      throw new Error('Akun Pengirim tidak ditemukan');
    }

    const recipient = await tx.account.findUnique({
      where: { id: toAccountId },
    });

    if (!recipient) {
      throw new Error('Akun Penerima tidak ditemukan');
    }

    if (sender.balance < transferAmount) {
      throw new Error('Saldo pengirim tidak cukup');
    }

    await tx.account.update({
      where: { id: sender.id },
      data: { balance: sender.balance - transferAmount },
    });

    await tx.account.update({
      where: { id: recipient.id },
      data: { balance: recipient.balance + transferAmount },
    });

    await tx.transaction.create({
      data: {
        amount: transferAmount,
        type: 'TRANSFER_OUT',
        accountId: sender.id,
      },
    });

    await tx.transaction.create({
      data: {
        amount: transferAmount,
        type: 'TRANSFER_IN',
        accountId: recipient.id,
      },
    });

    return {
      fromBalance: sender.balance - transferAmount,
      toBalance: recipient.balance + transferAmount,
    };
  });
};
