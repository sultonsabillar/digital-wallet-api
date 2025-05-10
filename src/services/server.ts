import express from 'express';
import accountRoutes from '../routes/accountRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/accounts', accountRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
