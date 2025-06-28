import prisma from "../models/prisma.js"

export async function createRegistro(data) {
  return prisma.registroDiario.create({ data });
}

export async function getAllRegistros() {
  return prisma.registroDiario.findMany();
}

export async function getRegistroById(id) {
  return prisma.registroDiario.findUnique({ where: { id } });
}

export async function getRegistrosByLoteId(loteId) {
  return prisma.registroDiario.findMany({
    where: { loteId },
  });
}

export async function updateRegistro(id, data) {
  return prisma.registroDiario.update({
    where: { id },
    data,
  });
}

export async function deleteRegistro(id) {
  return prisma.registroDiario.delete({ where: { id } });
}
