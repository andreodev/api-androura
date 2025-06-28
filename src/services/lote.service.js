import prisma from "../models/prisma.js"

export async function createLote(data) {
  return prisma.lote.create({ data });
}

export async function getAllLotes() {
  return prisma.lote.findMany();
}

export async function getLoteById(id) {
  return prisma.lote.findUnique({ where: { id } });
}

export async function updateLote(id, data) {
  return prisma.lote.update({
    where: { id },
    data
  });
}

export async function deleteLote(id) {
  return prisma.lote.delete({ where: { id } });
}

