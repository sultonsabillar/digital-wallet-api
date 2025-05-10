import { Request, Response } from 'express';
import { PrismaClient, Account } from '@prisma/client';

const prisma = new PrismaClient();

export const deposit = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount } = req.body;

  const depositAmount = parseFloat(amount);
  if (isNaN(depositAmount) || depositAmount <= 0) {
    return res.status(400).json({ error: 'Jumlah deposit tidak valid' });
  }

  try {
    const account = await prisma.account.findUnique({
      where: { id: Number(id) },
    });

    if (!account) {
      return res.status(404).json({ error: 'Akun tidak ditemukan' });
    }

    const updatedAccount: Account = await prisma.account.update({
      where: { id: Number(id) },
      data: { balance: account.balance + depositAmount },
    });

    await prisma.transaction.create({
      data: {
        amount: depositAmount,
        type: 'DEPOSIT',
        accountId: updatedAccount.id,
      },
    });

    return res.json({ balance: updatedAccount.balance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat melakukan deposit' });
  }
};
