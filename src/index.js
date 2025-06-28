import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import loteRoutes from './routes/lote.routes.js';
import registroRoutes from './routes/registro.route.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/lotes', loteRoutes);
app.use('/registro', registroRoutes);

app.get('/', (req, res) => {
  res.send('API rodando!');
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
  });
}

export default app; 
