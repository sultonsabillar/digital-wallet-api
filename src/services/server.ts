import express from 'express';
import accountRoutes from '../routes/accountRoutes';  
import depositRoutes from '../routes/depositRoutes'; 
import balanceRoutes from '../routes/balanceRoutes';
import withdrawRoutes from '../routes/withdrawRoutes';
import transferRoutes from '../routes/transferRoutes';
import transactionsRoutes from '../routes/transactionsRoutes'

export const app = express();
const PORT = 3000;

app.use(express.json());  

app.use('/api/accounts', accountRoutes);

app.use('/api/accounts', depositRoutes); 

app.use('/api/accounts', balanceRoutes);

app.use('/api/accounts', withdrawRoutes);

app.use('/api/accounts', transferRoutes);

app.use('/api/accounts', transactionsRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
