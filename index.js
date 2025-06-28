import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import loteRoutes from './src/routes/lote.routes.js'; // importe o arquivo correto
import registroRoutes from './src/routes/registro.route.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/lotes', loteRoutes);
app.use('/registro', registroRoutes);

app.get('/', (req, res) => {
  res.send('API rodando!');
});

const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
