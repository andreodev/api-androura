import prisma from "../models/prisma.js"

export async function createRegistro(data) {
  const { loteId, mortas = 0, eliminadas = 0, ...rest } = data;

  // 1. Buscar o último registro do lote (mais recente)
  const ultimoRegistro = await prisma.registroDiario.findFirst({
    where: { loteId },
    orderBy: { data: 'desc' },
  });

  // 2. Se não existir, pegar o número inicial do lote
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

  // 3. Calcular novo total de aves
  const totalAves = totalAnterior - mortas - eliminadas;

  // 4. Criar o registro com totalAves calculado
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
