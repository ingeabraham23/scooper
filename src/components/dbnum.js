// db.js
import Dexie from "dexie";

export const dbnum = new Dexie("NumerosDB");
dbnum.version(1).stores({
  pilaNumeros: "++id,numero",
});
