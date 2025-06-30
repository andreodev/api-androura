import prisma from "../models/prisma.js"

export async function createRegistro(data) {
  const { loteId, mortas = 0, eliminadas = 0, data: dataRegistro, ...rest } = data;

  const ultimoRegistro = await prisma.registroDiario.findFirst({
    where: { loteId },
    orderBy: { data: 'desc' },
  });

  let totalAnterior;
  if (ultimoRegistro) {
    totalAnterior = ultimoRegistro.totalAves;
  } else {
    const lote = await prisma.lote.findUnique({ where: { id: loteId } });
    if (!lote) throw new Error("Lote não encontrado.");
    totalAnterior = lote.numeroAvesInicioMes;
  }

  const totalAves = totalAnterior - mortas - eliminadas;

  // 1. Cria o registro
 const registro = await prisma.registroDiario.create({
  data: {
    loteId,
    mortas,
    eliminadas,
    totalAves,
    data: new Date(dataRegistro), // usa a data enviada pelo front
    ...rest,
  },
});

  // 2. Atualiza o campo de avesAtuais no lote
  await prisma.lote.update({
    where: { id: loteId },
    data: {
      avesAtuais: totalAves,
    },
  });

  return registro;
}



export async function getAllRegistros() {
  return prisma.registroDiario.findMany();
}

export async function getRegistrosByMesAno(mes, ano) {
  const mesInt = parseInt(mes);
  const anoInt = parseInt(ano);

  // Início do mês (UTC)
  const inicio = new Date(Date.UTC(anoInt, mesInt, 1));

  // Início do próximo mês (UTC)
  const fim = new Date(Date.UTC(anoInt, mesInt + 1, 1));

  return prisma.registroDiario.findMany({
    where: {
      data: {
        gte: inicio,
        lt: fim,
      },
    },
    orderBy: { data: 'asc' },
  });
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
