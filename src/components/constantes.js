import db from "../db";

export const eliminarUltimaUnidad = async (ruta) => {
  // Buscar todas las unidades con la ruta dada, sin importar el tipo
  const ultimaUnidad = await db.unidades
    .where("ruta")
    .equals(ruta)
    .reverse()
    .first(); // Última unidad registrada para esa ruta

  if (ultimaUnidad) {
    await db.unidades.delete(ultimaUnidad.id);
    return true;
  }

  return false;
};

export const buscarUnidadYRelacionadas = async () => {
  // Paso 1: Obtener la última unidad en calicapan tipo blanco
  const ultimaCalicapan = await db.unidades
    .where({ ruta: "calicapan", tipo: "blanco" })
    .sortBy("id")
    .then((lista) => lista.at(-1));

  if (!ultimaCalicapan) return null;

  const { numeroUnidad } = ultimaCalicapan;

  // Paso 2: Buscar todas las unidades en tequimila tipo blanco
  const tequimilaBlanco = await db.unidades
    .where({ ruta: "tequimila", tipo: "blanco" })
    .sortBy("id");

  if (!tequimilaBlanco.length) return null;

  // Paso 3: Encontrar la unidad con mismo numeroUnidad y mayor id
  const coincidencias = tequimilaBlanco.filter(
    (u) => u.numeroUnidad === numeroUnidad
  );

  if (!coincidencias.length) return null;

  const unidadCoincidenteMasReciente = coincidencias.at(-1); // la de mayor id

  // Paso 4: Obtener su índice en el array completo de tequimila
  const indice = tequimilaBlanco.findIndex(
    (u) => u.id === unidadCoincidenteMasReciente.id
  );

  if (indice === -1) return null;

  // Paso 5: Devolver esa unidad y las 2 siguientes (por orden de id)
  const resultado = tequimilaBlanco.slice(indice, indice + 3);

  return resultado;
};

export const buscarSanIsidroParaPrediccion = async () => {
  // Paso 1: Obtener la última unidad en "sosa escuela" tipo blanco
  const unidadesSanIsidroBlanco = await db.unidades
    .where({ ruta: "san isidro", tipo: "blanco" })
    .sortBy("id");

  if (!unidadesSanIsidroBlanco.length) return null;

  const ultimaUnidad = unidadesSanIsidroBlanco.at(-1); // la de mayor id
  const { numeroUnidad } = ultimaUnidad;

  // Paso 2: Buscar todas las unidades con ese numeroUnidad
  const coincidencias = unidadesSanIsidroBlanco.filter(
    (u) => u.numeroUnidad === numeroUnidad
  );

  if (coincidencias.length < 2) return null; // No hay penúltima

  // Paso 3: Obtener la penúltima (por orden de id)
  const penultima = coincidencias[coincidencias.length - 2];

  // Paso 4: Buscar su índice en el arreglo general
  const indice = unidadesSanIsidroBlanco.findIndex((u) => u.id === penultima.id);

  if (indice === -1) return null;

  // Paso 5: Obtener esa unidad y las 2 siguientes
  const resultado = unidadesSanIsidroBlanco.slice(indice, indice + 3);

  return resultado;
};

export const buscarSosaParaPrediccion = async () => {
  // Paso 1: Obtener la última unidad en "sosa escuela" tipo blanco
  const unidadesSosaBlanco = await db.unidades
    .where({ ruta: "sosa escuela", tipo: "blanco" })
    .sortBy("id");

  if (!unidadesSosaBlanco.length) return null;

  const ultimaUnidad = unidadesSosaBlanco.at(-1); // la de mayor id
  const { numeroUnidad } = ultimaUnidad;

  // Paso 2: Buscar todas las unidades con ese numeroUnidad
  const coincidencias = unidadesSosaBlanco.filter(
    (u) => u.numeroUnidad === numeroUnidad
  );

  if (coincidencias.length < 2) return null; // No hay penúltima

  // Paso 3: Obtener la penúltima (por orden de id)
  const penultima = coincidencias[coincidencias.length - 2];

  // Paso 4: Buscar su índice en el arreglo general
  const indice = unidadesSosaBlanco.findIndex((u) => u.id === penultima.id);

  if (indice === -1) return null;

  // Paso 5: Obtener esa unidad y las 2 siguientes
  const resultado = unidadesSosaBlanco.slice(indice, indice + 3);

  return resultado;
};

export const obtenerSosaDel9Al12 = async () => {
  const unidades = await db.unidades
    .where({ ruta: "sosa escuela", tipo: "blanco" })
    .sortBy("id");

  if (unidades.length < 12) return [];

  // Última posición
  const ultimoIndice = unidades.length - 1;

  // Aproximadamente 80 minutos atrás
  const indiceBase = ultimoIndice - 11;

  if (indiceBase < 0) return [];

  // Tomar 4 registros desde ahí
  const resultado = unidades.slice(indiceBase, indiceBase + 4);

  return resultado;
};

export const obtenerLomaDel4Al7 = async () => {
  const unidades = await db.unidades
    .where({ ruta: "loma", tipo: "blanco" })
    .sortBy("id");

  if (unidades.length < 7) return [];

  // Última posición
  const ultimoIndice = unidades.length - 1;

  // Aproximadamente 60 minutos atrás
  const indiceBase = ultimoIndice - 6;

  if (indiceBase < 0) return [];

  // Tomar 4 registros desde ahí
  const resultado = unidades.slice(indiceBase, indiceBase + 4);

  return resultado;
};

export const buscarLomaSosaParaPrediccion = async () => {
  // Paso 1: Obtener la última unidad en sosa tipo blanco
  const ultimaSosa = await db.unidades
    .where({ ruta: "sosa escuela", tipo: "blanco" })
    .sortBy("id")
    .then((lista) => lista.at(-1));

  if (!ultimaSosa) return null;

  const { numeroUnidad } = ultimaSosa;

  // Paso 2: Buscar todas las unidades en tequimila tipo blanco
  const lomaBlanco = await db.unidades
    .where({ ruta: "loma", tipo: "blanco" })
    .sortBy("id");

  if (!lomaBlanco.length) return null;

  // Paso 3: Encontrar la unidad con mismo numeroUnidad y mayor id
  const coincidencias = lomaBlanco.filter(
    (u) => u.numeroUnidad === numeroUnidad
  );

  if (!coincidencias.length) return null;

  const unidadCoincidenteMasReciente = coincidencias.at(-1); // la de mayor id

  // Paso 4: Obtener su índice en el array completo de tequimila
  const indice = lomaBlanco.findIndex(
    (u) => u.id === unidadCoincidenteMasReciente.id
  );

  if (indice === -1) return null;

  // Paso 5: Devolver esa unidad y las 2 siguientes (por orden de id)
  const resultado = lomaBlanco.slice(indice, indice + 3);

  return resultado;
};

export const buscarSosaLomaParaPrediccion = async () => {
  // Paso 1: Obtener la última unidad en loma tipo blanco
  const ultimaLoma = await db.unidades
    .where({ ruta: "loma", tipo: "blanco" })
    .sortBy("id")
    .then((lista) => lista.at(-1));

  if (!ultimaLoma) return null;

  const { numeroUnidad } = ultimaLoma;

  // Paso 2: Buscar todas las unidades en sosa tipo blanco
  const sosaBlanco = await db.unidades
    .where({ ruta: "sosa escuela", tipo: "blanco" })
    .sortBy("id");

  if (!sosaBlanco.length) return null;

  // Paso 3: Encontrar la unidad con mismo numeroUnidad y mayor id
  const coincidencias = sosaBlanco.filter(
    (u) => u.numeroUnidad === numeroUnidad
  );

  if (!coincidencias.length) return null;

  const unidadCoincidenteMasReciente = coincidencias.at(-1); // la de mayor id

  // Paso 4: Obtener su índice en el array completo de sosa
  const indice = sosaBlanco.findIndex(
    (u) => u.id === unidadCoincidenteMasReciente.id
  );

  if (indice === -1) return null;

  // Paso 5: Devolver esa unidad y las 2 siguientes (por orden de id)
  const resultado = sosaBlanco.slice(indice, indice + 3);

  return resultado;
};


export const buscarQuintaParaPrediccion = async () => {
  // Paso 1: Obtener la última unidad en "tequimila" tipo blanco
  const ultimaTequimila = await db.unidades
    .where({ ruta: "tequimila", tipo: "blanco" })
    .sortBy("id")
    .then((lista) => lista.at(-1));

  if (!ultimaTequimila) return null;

  const { numeroUnidad } = ultimaTequimila;

  // Paso 2: Obtener todas las unidades de "quinta" tipo blanco ordenadas por id
  const unidadesQuinta = await db.unidades
    .where({ ruta: "quinta", tipo: "blanco" })
    .sortBy("id");

  if (!unidadesQuinta.length) return null;

  // Paso 3: Filtrar coincidencias por numeroUnidad
  const coincidencias = unidadesQuinta.filter(
    (u) => u.numeroUnidad === numeroUnidad
  );

  if (!coincidencias.length) return null;

  // Paso 4: Tomar la unidad más reciente (id más alto)
  const unidadCoincidenteMasReciente = coincidencias.at(-1);

  // Paso 5: Buscar su índice en el array general
  const indice = unidadesQuinta.findIndex(
    (u) => u.id === unidadCoincidenteMasReciente.id
  );

  if (indice === -1) return null;

  // Paso 6: Devolver esa unidad y las 2 siguientes (si existen)
  const resultado = unidadesQuinta.slice(indice, indice + 3);

  return resultado;
};

export const obtenerUltimaUnidadTacopan = async () => {
  const ultima = await db.unidades
    .where({ ruta: "tacopan", tipo: "blanco" })
    .sortBy("id")
    .then((lista) => lista.at(-1)); // última por id más alto

  return ultima ?? null;
};

export const obtenerUltimasUnidadesTacopan = async () => {
  const lista = await db.unidades
    .where({ ruta: "tacopan", tipo: "blanco" })
    .sortBy("id");

  // Tomamos las últimas 2 por ID más alto
  return lista.slice(-2).reverse(); // reverse para que salgan de más nueva a menos
};

export const obtenerUltimasUnidadesCalanorte = async () => {
  const lista = await db.unidades
    .where({ ruta: "calanorte", tipo: "blanco" })
    .sortBy("id");

  // Tomamos las últimas 2 por ID más alto
  return lista.slice(-2).reverse(); // reverse para que salgan de más nueva a menos
};

export const obtenerUltimasUnidadesPajaco = async () => {
  const lista = await db.unidades
    .where({ ruta: "pajaco", tipo: "blanco" })
    .sortBy("id");

  // Tomamos las últimas 2 por ID más alto
  return lista.slice(-2).reverse(); // reverse para que salgan de más nueva a menos
};

export const obtenerUltimasUnidadesAnalco = async () => {
  const lista = await db.unidades
    .where({ ruta: "analco", tipo: "blanco" })
    .sortBy("id");

  // Tomamos las últimas 2 por ID más alto
  return lista.slice(-2).reverse(); // reverse para que salgan de más nueva a menos
};

export const buscarTezotepecParaPrediccion = async () => {
  // Paso 1: Obtener la última unidad en "tezotepec" tipo blanco
  const unidadesTezotepecBlanco = await db.unidades
    .where({ ruta: "tezotepec", tipo: "blanco" })
    .sortBy("id");

  if (!unidadesTezotepecBlanco.length) return null;

  const ultimaUnidad = unidadesTezotepecBlanco.at(-1); // la de mayor id
  const { numeroUnidad } = ultimaUnidad;

  // Paso 2: Buscar todas las unidades con ese numeroUnidad
  const coincidencias = unidadesTezotepecBlanco.filter(
    (u) => u.numeroUnidad === numeroUnidad
  );

  if (coincidencias.length < 2) return null; // No hay penúltima

  // Paso 3: Obtener la penúltima (por orden de id)
  const penultima = coincidencias[coincidencias.length - 2];

  // Paso 4: Buscar su índice en el arreglo general
  const indice = unidadesTezotepecBlanco.findIndex((u) => u.id === penultima.id);

  if (indice === -1) return null;

  // Paso 5: Obtener esa unidad y las 2 siguientes
  const resultado = unidadesTezotepecBlanco.slice(indice, indice + 4);

  return resultado;
};

export const buscarTezotepecParaPrediccionReverse = async () => {
  // Paso 1: Obtener todas las unidades "tezotepec" tipo blanco, ordenadas por ID
  const unidadesTezotepecBlanco = await db.unidades
    .where({ ruta: "tezotepec", tipo: "blanco" })
    .sortBy("id");

  if (!unidadesTezotepecBlanco.length) return null;

  const ultimaUnidad = unidadesTezotepecBlanco.at(-1); // la de mayor id
  const { numeroUnidad } = ultimaUnidad;

  // Paso 2: Buscar todas las unidades con ese numeroUnidad
  const coincidencias = unidadesTezotepecBlanco.filter(
    (u) => u.numeroUnidad === numeroUnidad
  );

  if (coincidencias.length < 2) return null; // No hay penúltima

  // Paso 3: Obtener la penúltima (por orden de id)
  const penultima = coincidencias[coincidencias.length - 2];

  // Paso 4: Buscar su índice en el arreglo general
  const indice = unidadesTezotepecBlanco.findIndex((u) => u.id === penultima.id);

  if (indice === -1) return null;

  // Paso 5: Obtener esa unidad y las 2 anteriores
  const inicio = Math.max(indice - 3, 0);
  const resultado = unidadesTezotepecBlanco.slice(inicio, indice + 1); // hasta penúltima inclusive

  return resultado;
};

export const buscarCalicapanParaPrediccion = async () => {
  // Paso 1: Obtener la última unidad en "quinta" tipo blanco
  const ultimaQuinta = await db.unidades
    .where({ ruta: "quinta", tipo: "blanco" })
    .sortBy("id")
    .then((lista) => lista.at(-1));

  if (!ultimaQuinta) return null;

  const { numeroUnidad } = ultimaQuinta;

  // Paso 2: Obtener todas las unidades de "calicapan" tipo blanco ordenadas por id
  const unidadesCalicapan = await db.unidades
    .where({ ruta: "calicapan", tipo: "blanco" })
    .sortBy("id");

  if (!unidadesCalicapan.length) return null;

  // Paso 3: Filtrar coincidencias por numeroUnidad
  const coincidencias = unidadesCalicapan.filter(
    (u) => u.numeroUnidad === numeroUnidad
  );

  if (!coincidencias.length) return null;

  // Paso 4: Tomar la unidad más reciente (id más alto)
  const unidadCoincidenteMasReciente = coincidencias.at(-1);

  // Paso 5: Buscar su índice en el array general
  const indice = unidadesCalicapan.findIndex(
    (u) => u.id === unidadCoincidenteMasReciente.id
  );

  if (indice === -1) return null;

  // Paso 6: Devolver esa unidad y las 2 siguientes (si existen)
  const resultado = unidadesCalicapan.slice(indice, indice + 3);

  return resultado;
};

export const buscarLomaParaPrediccion = async () => {
  const unidadesExcluidas = [11, 25, 35, 42, 44, 55, 63, 77, 88, 131];

  // Paso 1: Obtener la última unidad en "talzintan" tipo blanco que NO esté en la lista de exclusión
  const ultimaTalzintan = await db.unidades
    .where({ ruta: "talzintan", tipo: "blanco" })
    .sortBy("id")
    .then((lista) =>
      lista.filter((u) => !unidadesExcluidas.includes(u.numeroUnidad)).at(-1)
    );

  if (!ultimaTalzintan) return null;

  const { numeroUnidad } = ultimaTalzintan;

  // Paso 2: Obtener todas las unidades de "loma" tipo blanco que NO estén en la lista de exclusión
  const unidadesLoma = await db.unidades
    .where({ ruta: "loma", tipo: "blanco" })
    .sortBy("id")
    .then((lista) => lista.filter((u) => !unidadesExcluidas.includes(u.numeroUnidad)));

  if (!unidadesLoma.length) return null;

  // Paso 3: Filtrar coincidencias por numeroUnidad
  const coincidencias = unidadesLoma.filter((u) => u.numeroUnidad === numeroUnidad);

  if (!coincidencias.length) return null;

  // Paso 4: Tomar la unidad más reciente (id más alto)
  const unidadCoincidenteMasReciente = coincidencias.at(-1);

  // Paso 5: Buscar su índice en el array general
  const indice = unidadesLoma.findIndex((u) => u.id === unidadCoincidenteMasReciente.id);

  if (indice === -1) return null;

  // Paso 6: Devolver esa unidad y las 2 siguientes (si existen)
  const resultado = unidadesLoma.slice(indice, indice + 3);

  return resultado;
};

export const buscarTalzintanParaPrediccion = async () => {
  // Paso 1: Obtener la última unidad en "sosa escuela" tipo blanco
  const unidadesTalzintanBlanco = await db.unidades
    .where({ ruta: "talzintan", tipo: "blanco" })
    .sortBy("id");

  if (!unidadesTalzintanBlanco.length) return null;

  const ultimaUnidad = unidadesTalzintanBlanco.at(-1); // la de mayor id
  const { numeroUnidad } = ultimaUnidad;

  // Paso 2: Buscar todas las unidades con ese numeroUnidad
  const coincidencias = unidadesTalzintanBlanco.filter(
    (u) => u.numeroUnidad === numeroUnidad
  );

  if (coincidencias.length < 2) return null; // No hay penúltima

  // Paso 3: Obtener la penúltima (por orden de id)
  const penultima = coincidencias[coincidencias.length - 2];

  // Paso 4: Buscar su índice en el arreglo general
  const indice = unidadesTalzintanBlanco.findIndex((u) => u.id === penultima.id);

  if (indice === -1) return null;

  // Paso 5: Obtener esa unidad y las 2 siguientes
  const resultado = unidadesTalzintanBlanco.slice(indice, indice + 3);

  return resultado;
};


export const buscarYaonahuacParaPrediccion = async () => {
  // Paso 1: Obtener la última unidad en "sosa escuela" tipo blanco
  const unidadesYaonahuacPrediccion = await db.unidades
    .where({ ruta: "yaonahuac", tipo: "verde" })
    .sortBy("id");

  if (!unidadesYaonahuacPrediccion.length) return null;

  const ultimaUnidad = unidadesYaonahuacPrediccion.at(-1); // la de mayor id
  const { numeroUnidad } = ultimaUnidad;

  // Paso 2: Buscar todas las unidades con ese numeroUnidad
  const coincidencias = unidadesYaonahuacPrediccion.filter(
    (u) => u.numeroUnidad === numeroUnidad
  );

  if (coincidencias.length < 2) return null; // No hay penúltima

  // Paso 3: Obtener la penúltima (por orden de id)
  const penultima = coincidencias[coincidencias.length - 2];

  // Paso 4: Buscar su índice en el arreglo general
  const indice = unidadesYaonahuacPrediccion.findIndex((u) => u.id === penultima.id);

  if (indice === -1) return null;

  // Paso 5: Obtener esa unidad y las 2 siguientes
  const resultado = unidadesYaonahuacPrediccion.slice(indice, indice + 3);

  return resultado;
};

export const buscarHueyapanParaPrediccion = async () => {
  const normalizar = (n) => String(n).replace("-", "");

  // Paso 1: Obtener la última unidad en hueyapan tipo verde
  const unidadesHueyapanPrediccion = await db.unidades
    .where({ ruta: "hueyapan", tipo: "verde" })
    .sortBy("id");

  if (!unidadesHueyapanPrediccion.length) return null;

  const ultimaUnidad = unidadesHueyapanPrediccion.at(-1);
  const numeroBase = normalizar(ultimaUnidad.numeroUnidad);

  // Paso 2: Buscar todas las unidades con ese numeroUnidad ignorando guiones
  const coincidencias = unidadesHueyapanPrediccion.filter(
    (u) => normalizar(u.numeroUnidad) === numeroBase
  );

  if (coincidencias.length < 2) return null;

  // Paso 3: Obtener la penúltima
  const penultima = coincidencias[coincidencias.length - 2];

  // Paso 4: Buscar su índice en el arreglo general
  const indice = unidadesHueyapanPrediccion.findIndex(
    (u) => u.id === penultima.id
  );

  if (indice === -1) return null;

  // Paso 5: Obtener esa unidad y las siguientes 2
  return unidadesHueyapanPrediccion.slice(indice, indice + 3);
};



