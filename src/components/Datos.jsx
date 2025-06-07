import React from "react";
//import db from "../db";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Datos.css";
import Dexie from "dexie";

import { faBus, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RespaldoYRestauracion from "./RespaldoYRestauracion";

function Datos() {
  // Función para limpiar la tabla de unidades
  // Función para limpiar la tabla de unidades y reiniciar el contador de ID
  const handleClearRegistros = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas limpiar la tabla de unidades? Esta acción no se puede deshacer."
    );
    if (confirmed) {
      try {
        await Dexie.delete("UnidadesDB"); // Elimina la base de datos
        // Vuelve a inicializar la base de datos
        const newDb = new Dexie("UnidadesDB");
        newDb.version(1).stores({
          unidades: "++id,ruta,tipo,numeroUnidad,horaRegistro",
        });
        toast.success(
          "¡Tabla de registros limpiada y contador de ID reiniciado correctamente!"
        );
      } catch (error) {
        console.error("Error al limpiar la tabla de registros:", error);
        toast.error("¡Error al limpiar la tabla de registros!");
      }
    }
  };

  return (
    <div>
      <RespaldoYRestauracion></RespaldoYRestauracion>
      <div>
        <h2>
          ¡Advertencia: Antes de borrar datos asegurate de que ya no los
          necesitas. Esta acción no se puede deshacer 🤯!
        </h2>
        <div className="contenedor-botones">
          <button className="boton-limpiar" onClick={handleClearRegistros}>
            Borrar todos los registros
            <FontAwesomeIcon icon={faCircleXmark} />
            <FontAwesomeIcon icon={faBus} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Datos;
