import express from 'express';
import * as registroController from '../controllers/registro.controller.js';

const router = express.Router();

router.post('/', registroController.createRegistro);
router.get('/por-data', registroController.getRegistrosPorMesAno); // 👈 aqui, antes do :id
router.get('/lote/:loteId', registroController.getRegistrosByLoteId);
router.get('/', registroController.getAllRegistros);
router.get('/:id', registroController.getRegistroById);
router.put('/:id', registroController.updateRegistro);
router.delete('/:id', registroController.deleteRegistro);

export default router;
