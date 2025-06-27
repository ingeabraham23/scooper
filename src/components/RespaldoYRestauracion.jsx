/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import db from "../db";
import "./RespaldoYRestauracion.css";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function RespaldoYRestauracion() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Función para respaldar la base de datos en un Archivo JSON
  const handleBackup = async () => {
    try {
      // Abre la conexión a la base de datos
      await db.open();

      // Obtiene los datos de personas desde la base de datos
      const unidades = await db.unidades.toArray();

      // Combina los datos de personas y encabezado en un objeto
      const backupData = {
        unidades,
      };

      // Convierte el objeto a formato JSON con formato legible
      const jsonData = JSON.stringify(backupData, null, 2);

      // Crea un objeto Blob a partir del JSON
      const blob = new Blob([jsonData], { type: "application/json" });

      // Crea una URL para el Blob
      const url = URL.createObjectURL(blob);

      const currentDate = new Date(); // Obtener la fecha y hora actual
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ]; // Obtener los nombres de los días y meses en español
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    // Función para convertir la hora de formato 24 horas a formato de 12 horas
    const get12HourFormat = (hour) => {
      return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    };
    // Formatear la fecha y hora actual en el formato deseado
    const dayOfWeek = days[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const hours = get12HourFormat(currentDate.getHours());
    const minutesWithLeadingZero = currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0");

    const amOrPm = currentDate.getHours() >= 12 ? "pm" : "am";
    const formattedDate = `${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}-${minutesWithLeadingZero} ${amOrPm} Internado`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

      // Crea un elemento <a> temporal para la descarga
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;

      // Simula un clic en el enlace para iniciar la descarga
      a.click();

      // Limpia la URL del objeto Blob
      URL.revokeObjectURL(url);

      toast.success("Base de datos respaldada correctamente");
    } catch (error) {
      // Maneja los errores de manera adecuada, por ejemplo, mostrando un mensaje al usuario
      toast.error("Error al respaldar la base de datos:", error);
    }
  };

   // Función para respaldar la base de datos en un Archivo JSON
   const handleBackupChedraui = async () => {
    try {
      // Abre la conexión a la base de datos
      await db.open();

      // Obtiene los datos de personas desde la base de datos
      const unidades = await db.unidades.toArray();

      // Combina los datos de personas y encabezado en un objeto
      const backupData = {
        unidades,
      };

      // Convierte el objeto a formato JSON con formato legible
      const jsonData = JSON.stringify(backupData, null, 2);

      // Crea un objeto Blob a partir del JSON
      const blob = new Blob([jsonData], { type: "application/json" });

      // Crea una URL para el Blob
      const url = URL.createObjectURL(blob);

      const currentDate = new Date(); // Obtener la fecha y hora actual
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ]; // Obtener los nombres de los días y meses en español
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    // Función para convertir la hora de formato 24 horas a formato de 12 horas
    const get12HourFormat = (hour) => {
      return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    };
    // Formatear la fecha y hora actual en el formato deseado
    const dayOfWeek = days[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    const hours = get12HourFormat(currentDate.getHours());
    const minutesWithLeadingZero = currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0");

    const amOrPm = currentDate.getHours() >= 12 ? "pm" : "am";
    const formattedDate = `${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}-${minutesWithLeadingZero} ${amOrPm} Chedraui`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

      // Crea un elemento <a> temporal para la descarga
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;

      // Simula un clic en el enlace para iniciar la descarga
      a.click();

      // Limpia la URL del objeto Blob
      URL.revokeObjectURL(url);

      toast.success("Base de datos respaldada correctamente");
    } catch (error) {
      // Maneja los errores de manera adecuada, por ejemplo, mostrando un mensaje al usuario
      toast.error("Error al respaldar la base de datos:", error);
    }
  };

  // Función para restaurar la base de datos
  const handleRestore = async () => {
    try {
      // Abre la conexión a la base de datos
      await db.open();

      // Verifica si se ha seleccionado un archivo
      if (selectedFile) {
        // Lee el contenido del archivo como texto
        const fileContent = await selectedFile.text();

        // Intenta analizar el contenido del archivo JSON
        const parsedData = JSON.parse(fileContent);

        // Verifica si parsedData contiene la propiedad 'personas' antes de realizar la restauración
        if (parsedData && parsedData.unidades) {
          // Borrar todos los registros actuales antes de restaurar las personas
          await db.unidades.clear();

          // Insertar los nuevos registros de personas desde el archivo JSON
          await db.unidades.bulkAdd(parsedData.unidades);

          toast.success("Base de datos restaurada correctamente");
        } else {
          toast.error(
            "El archivo no tiene el formato esperado. No se puede restaurar la base de datos."
          );
        }
      } else {
        toast.error(
          "No se ha seleccionado ningún archivo para la restauración."
        );
      }
    } catch (error) {
      // Maneja los errores de manera adecuada, por ejemplo, mostrando un mensaje al usuario
      toast.error("Error al restaurar la base de datos:");
    }
  };

  const handleBackupWithAdjustedTime = async () => {
    try {
      await db.open();
      const unidades = await db.unidades.toArray();
      const adjustedUnidades = unidades.map((unidad) => {
        const date = new Date(unidad.horaRegistro);
        date.setMinutes(date.getMinutes() - 5);
        return { ...unidad, horaRegistro: date.toISOString() };
      });
      const backupData = { unidades: adjustedUnidades };
      const jsonData = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "backupChedraui-5.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Base de datos respaldada con 5 minutos menos correctamente");
    } catch (error) {
      toast.error("Error al respaldar la base de datos:", error);
    }
  };

  const handleBackupWithAdjustedTimeMas = async () => {
    try {
      await db.open();
      const unidades = await db.unidades.toArray();
      const adjustedUnidades = unidades.map((unidad) => {
        const date = new Date(unidad.horaRegistro);
        date.setMinutes(date.getMinutes() + 5);
        return { ...unidad, horaRegistro: date.toISOString() };
      });
      const backupData = { unidades: adjustedUnidades };
      const jsonData = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "backupInternado+5.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Base de datos respaldada con 5 minutos mas correctamente");
    } catch (error) {
      toast.error("Error al respaldar la base de datos:", error);
    }
  };

  /* const handleLoadFromJSON = async () => {
  try {
    // Abre la conexión a la base de datos
    await db.open();

    // Borrar todos los registros actuales antes de cargar desde JSON
    await db.unidades.clear();

    // Insertar los nuevos registros desde los datos importados del archivo JSON
    await db.unidades.bulkAdd(jsonData.unidades);

    console.log("Datos cargados desde JSON correctamente");
  } catch (error) {
    console.error("Error al cargar datos desde JSON:", error);
  }
}; */

  return (
    <div className="container-respaldo">
      <h3>Restaurar Datos Desde Un Archivo</h3>
      <div className="input-container">
        <div className="custom-file-input">
          <input
            className="input-file"
            type="file"
            id="backupFile"
            accept=".json"
            onChange={handleFileChange}
          />
          <span>
            {selectedFile
              ? selectedFile.name
              : "No se ha seleccionado ningún archivo"}
          </span>
        </div>
        <button className="button restore" onClick={handleRestore}>
          Restaurar respaldo desde archivo JSON
        </button>
      </div>
      <hr></hr>
      <h3>Crear Respaldo de la Base de Datos</h3>
      <div className="button-container">
        <button className="button-backup" onClick={handleBackup}>
          Crear respaldo Internado
        </button>
        <button className="button-backup-chedraui" onClick={handleBackupChedraui}>
          Crear respaldo Chedraui
        </button>
      </div>
      <hr></hr>
      <h3>Crear respaldo con 5 minutos menos</h3>
      <h3>Chedraui ▶ Internado</h3>
      <div className="button-container">
        <button className="button-backup" onClick={handleBackupWithAdjustedTime}>Crear respaldo con -5 minutos</button>
      </div>

      <hr></hr>
      <h3>Crear respaldo con 5 minutos mas</h3>
      <h3>Internado ▶ Chedraui</h3>
      <div className="button-container">
        <button className="button-backup" onClick={handleBackupWithAdjustedTimeMas}>Crear respaldo con +5 minutos</button>
      </div>
      {/* <div className="button-container"><button className="button load" onClick={handleLoadFromJSON}>Cargar datos guardados anteriormente</button></div> */}
    </div>
  );
}

export default RespaldoYRestauracion;
