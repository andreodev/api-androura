import express from 'express';
import * as registroController from '../controllers/registro.controller.js';

const router = express.Router();

router.post('/', registroController.createRegistro);
router.get('/', registroController.getAllRegistros);
router.get('/:id', registroController.getRegistroById);
router.get('/lote/:loteId', registroController.getRegistrosByLoteId);
router.put('/:id', registroController.updateRegistro);
router.delete('/:id', registroController.deleteRegistro);
router.get('/registros/por-data', registroController.getRegistrosPorMesAno);

export default router;
