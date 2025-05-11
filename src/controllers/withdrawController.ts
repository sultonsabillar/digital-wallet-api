import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const withdraw = async (req: Request, res: Response) => {
  const { id } = req.params; 
  const { amount } = req.body;

  const withdrawAmount = parseFloat(amount);
  if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
    return res.status(400).json({ error: 'Jumlah penarikan tidak valid' });
  }

  try {

    const account = await prisma.account.findUnique({
      where: { id: Number(id) },
    });

    if (!account) {
      return res.status(404).json({ error: 'Akun tidak ditemukan' });
    }

    
    if (account.balance < withdrawAmount) {
      return res.status(400).json({ error: 'Saldo tidak cukup' });
    }

   
    const updatedAccount = await prisma.account.update({
      where: { id: Number(id) },
      data: { balance: account.balance - withdrawAmount },
    });

    await prisma.transaction.create({
      data: {
        amount: withdrawAmount,
        type: 'WITHDRAW',
        accountId: updatedAccount.id,
      },
    });

    return res.json({ balance: updatedAccount.balance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat melakukan penarikan' });
  }
};
