import { Request, Response } from 'express';
import { transactionsService } from '../services/transactionsServices';
import { toZonedTime, format } from 'date-fns-tz';

export const transaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
  
    const transactions = await transactionsService(Number(id));
    
    const timeZone = 'Asia/Jakarta';
   
    const formattedTransactions = transactions.map(transaction => {
     
      const zonedDate = toZonedTime(transaction.createdAt, timeZone);
     
      const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ss'); 

      return {
        ...transaction,
        createdAt: formattedDate, 
      };
    });

    if (formattedTransactions.length === 0) {
      return res.status(404).json({ error: 'Tidak ada transaksi ditemukan untuk akun ini' });
    }

    return res.json({ transactions: formattedTransactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan saat mengambil riwayat transaksi' });
  }
};
