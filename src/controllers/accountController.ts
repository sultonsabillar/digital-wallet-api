import { Request, Response } from 'express';
import { createAccount } from '../services/accountService';

export const registerAccount = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!nameRegex.test(name)) {
    return res.status(400).json({ error: 'Nama hanya boleh mengandung huruf dan spasi' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Email harus mengandung simbol "@"' });
  }

  try {
    const account = await createAccount(name, email);
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: `nama atau email sudah terpakai` });
  }
};
