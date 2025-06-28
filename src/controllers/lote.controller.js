import * as loteService from "../services/lote.service.js"

export async function createLote(req, res) {
  try {
    const lote = await loteService.createLote(req.body);
    res.status(201).json(lote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllLotes(req, res) {
  try {
    const lotes = await loteService.getAllLotes();
    res.json(lotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getLoteById(req, res) {
  try {
    const { id } = req.params;
    const lote = await loteService.getLoteById(id);
    if (!lote) {
      return res.status(404).json({ error: "Lote não encontrado" });
    }
    res.json(lote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateLote(req, res) {
  try {
    const { id } = req.params;
    const loteAtualizado = await loteService.updateLote(id, req.body);
    res.json(loteAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteLote(req, res) {
  try {
    const { id } = req.params;
    await loteService.deleteLote(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

