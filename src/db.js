import Dexie from "dexie";

// Inicializar la base de datos Dexie
const db = new Dexie('UnidadesDB');
db.version(3).stores({
  unidades: '++id,ruta,tipo,numeroUnidad,horaRegistro',
  pilas: "++id,numeroUnidad,ruta,tipo,horaRegistro"
});

export default db;