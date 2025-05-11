import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const balance = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    
    const account = await prisma.account.findUnique({
      where: { id: Number(id) },
    });

    if (!account) {
      return res.status(404).json({ error: 'Akun tidak ditemukan' });
    }

    const accountInfo = {
      name: account.name,
      email: account.email,
      balance: account.balance,
    };

    return res.json(accountInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil informasi akun' });
  }
};
