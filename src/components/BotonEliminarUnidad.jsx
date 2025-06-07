// BotonEliminarUnidad.jsx
import React, { useRef } from "react";
import { eliminarUltimaUnidad } from "./constantes"; // ajusta la ruta
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const BotonEliminarUnidad = ({ ruta }) => {
  const timeoutRef = useRef(null);

  const manejarInicioPresion = () => {
    timeoutRef.current = setTimeout(async () => {
      const eliminado = await eliminarUltimaUnidad(ruta);
      if (eliminado) {
        toast.success("✅ Unidad eliminada.")
      } else {
        toast.error("⚠️ No se encontró unidad.")
      }
    }, 1000);
  };

  const manejarFinPresion = () => {
    clearTimeout(timeoutRef.current);
  };

  return (
    <button
      onTouchStart={manejarInicioPresion}
      onTouchEnd={manejarFinPresion}
      onTouchCancel={manejarFinPresion}
      onContextMenu={(e) => e.preventDefault()} // 🔒 Bloquear menú contextual
      style={{
        width: 40,
        height: 40,
        backgroundColor: "#ff4d4d",
        border: "1px solid black",
        borderRadius: "50%",
        padding: 0,
        marginLeft: 3, // 🟢 Espacio alrededor del botón
        userSelect: "none",
        WebkitUserSelect: "none",
        msUserSelect: "none",
        touchAction: "manipulation",
      }}
      aria-label="Eliminar última unidad"
    >
      ❌
    </button>
  );
};

export default BotonEliminarUnidad;
