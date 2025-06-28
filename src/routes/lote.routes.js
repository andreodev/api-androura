const router = express.Router();
import express from "express"
import * as loteController from '../controllers/lote.controller.js'

router.post('/', loteController.createLote);
router.get('/', loteController.getAllLotes);
router.get('/:id', loteController.getLoteById);
router.put('/:id', loteController.updateLote);
router.delete('/:id', loteController.deleteLote);

export default router;