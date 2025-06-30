import * as registroService from '../services/registro.service.js';

import prisma from "../models/prisma.js";

export async function createRegistro(data) {
  const { loteId, mortas = 0, eliminadas = 0, ...rest } = data;

  const ultimoRegistro = await prisma.registroDiario.findFirst({
    where: { loteId },
    orderBy: { data: 'desc' },
  });

  let totalAnterior;
  if (ultimoRegistro) {
    totalAnterior = ultimoRegistro.totalAves;
  } else {
    const lote = await prisma.lote.findUnique({
      where: { id: loteId },
    });

    if (!lote) throw new Error("Lote não encontrado.");
    totalAnterior = lote.numeroAvesInicioMes;
  }

  const totalAves = totalAnterior - mortas - eliminadas;

  return prisma.registroDiario.create({
    data: {
      loteId,
      mortas,
      eliminadas,
      totalAves,
      ...rest,
    },
  });
}

export async function getAllRegistros(req, res) {
  try {
    const registros = await registroService.getAllRegistros();
    return res.json(registros);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getRegistroById(req, res) {
  try {
    const { id } = req.params;
    const registro = await registroService.getRegistroById(id);

    if (!registro) {
      return res.status(404).json({ error: 'Registro não encontrado' });
    }

    return res.json(registro);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function getRegistrosByLoteId(req, res) {
  try {
    const { loteId } = req.params;
    const registros = await registroService.getRegistrosByLoteId(loteId);
    return res.json(registros);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function updateRegistro(req, res) {
  try {
    const { id } = req.params;
    const registroAtualizado = await registroService.updateRegistro(id, req.body);
    return res.json(registroAtualizado);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function deleteRegistro(req, res) {
  try {
    const { id } = req.params;
    await registroService.deleteRegistro(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
