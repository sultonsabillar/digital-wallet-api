import express from 'express';
import chalk from 'chalk'
import accountRoutes from './src/routes/accountRoutes';  
import depositRoutes from './src/routes/depositRoutes'; 
import balanceRoutes from './src/routes/balanceRoutes';
import withdrawRoutes from './src/routes/withdrawRoutes';
import transferRoutes from './src/routes/transferRoutes';
import transactionsRoutes from './src/routes/transactionsRoutes';

export const app = express();
const PORT = 3000;

app.use(express.json());  

app.use('/api/accounts', accountRoutes);

app.use('/api/accounts', depositRoutes); 

app.use('/api/accounts', balanceRoutes);

app.use('/api/accounts', withdrawRoutes);

app.use('/api/accounts', transferRoutes);

app.use('/api/accounts', transactionsRoutes);

app.listen(PORT, () => {
  console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
});
