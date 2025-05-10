import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';  

const prisma = new PrismaClient(); 

export const registerAccount = async (req: Request, res: Response) => {

  const { name, email } = req.body;

  try {
  
    const account = await prisma.account.create({
      data: { 
        name,    
        email,  
      },
    });

    res.json(account);  

  } catch (error) {
    res.status(400).json({ error: 'Error registering account' });
  }
};
