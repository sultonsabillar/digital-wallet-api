import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const transaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    const account = await prisma.account.findUnique({
      where: { id: Number(id) },
    });

    if (!account) {
      return res.status(404).json({ error: 'Akun tidak ditemukan' });
    }
    const transactions = await prisma.transaction.findMany({
      where: { accountId: account.id },
      orderBy: { createdAt: 'desc' }, 
    });
    
    return res.json({ transactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil riwayat transaksi' });
  }
};
