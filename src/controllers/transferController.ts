import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const transfer = async (req: Request, res: Response) => {
  const { fromId } = req.params;
  const { toAccountId, amount } = req.body;

  const transferAmount = parseFloat(amount);
  if (isNaN(transferAmount) || transferAmount <= 0) {
    return res.status(400).json({ error: 'Jumlah transfer tidak valid' });
  }

  try {
    
    const result = await prisma.$transaction(async (tx) => {
     
      const sender = await tx.account.findUnique({
        where: { id: Number(fromId) },
      });

      if (!sender) {
        return res.status(404).json({ error: 'Akun Pengirim tidak ditemukan' });
      }

      const recipient = await tx.account.findUnique({
        where: { id: Number(toAccountId) },
      });

      if (!recipient) {
        return res.status(404).json({ error: 'Akun Penerima tidak ditemukan' });
       
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

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat melakukan transfer' });
  }
};
