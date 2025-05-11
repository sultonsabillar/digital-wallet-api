import express from 'express';
import accountRoutes from '../routes/accountRoutes';  // Rute untuk akun
import depositRoutes from '../routes/depositRoutes';  // Rute untuk transaksi deposit
import balanceRoutes from '../routes/balanceRoutes';
import { withdraw } from '../controllers/withdrawController';
import withdrawRoutes from '../routes/withdrawRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());  

app.use('/api/accounts', accountRoutes);

app.use('/api/accounts', depositRoutes); 

app.use('/api/accounts', balanceRoutes);

app.use('/api/accounts', withdrawRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
