/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import React from "react";
import "./TablaResumen.css";
import html2canvas from "html2canvas";

// eslint-disable-next-line react/prop-types
const TablaResumen = ({ pagos }) => {
  // eslint-disable-next-line react/prop-types
  const total = pagos.reduce((sum, pago) => sum + pago.monto, 0);
  const tablaRef = useRef(null);

  // Función para formatear la fecha en formato de 12 horas con AM/PM en español
  const formatearHora = (fecha) => {
    const opciones = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return new Date(fecha).toLocaleTimeString("es-ES", opciones);
  };

  const [inputs, setInputs] = useState({
    nombre: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica para guardar los datos, si es necesario
  };

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const obtenerClaseTipo = (tipo) => {
    return tipo === "privado" ? "fila-privado" : "fila-grupal";
  };

  function capturarTabla(tabla) {
    html2canvas(tabla, { scale: 4 }).then(function (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `Comisiones.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  // Obtener la fecha y hora actual
  const currentDate = new Date();

  // Obtener los nombres de los días y meses en español
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
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

  const amOrPm = currentDate.getHours() >= 12 ? "p.m." : "a.m.";
  const formattedDate = `${dayOfWeek} ${dayOfMonth} de ${month} de ${year} - ${hours}:${minutesWithLeadingZero} ${amOrPm}`;

  return (
    <div className="container-resumen">
      <form onSubmit={handleSubmit}>
        <label>
          <select
            name="nombre"
            value={inputs.nombre}
            onChange={handleChange}
            className="entrada-de-texto"
          >
            <option value="">Seleccione un nombre</option>
            <option value="Areli Dionisio Rodrigo">
              Areli Dionisio Rodrigo
            </option>
            <option value="Mario Ivan Santos Belen">
              Mario Ivan Santos Belen
            </option>
            <option value="Uriel Hernandez Ramirez">
              Uriel Hernandez Ramirez
            </option>
            <option value="Marcos Hernandez Ramirez">
              Marcos Hernandez Ramirez
            </option>
            <option value="Jose Guadalupe Teodosio Aquino">
              Jose Guadalupe Teodosio Aquino
            </option>
          </select>
        </label>
        {/* Input para subir la imagen */}
        <button type="submit">Agregar</button>
      </form>
      <table className="tabla-resumen" ref={tablaRef}>
        <thead>
          <tr>
            <th className="encabezado" colSpan={5}>
              {inputs.nombre}
            </th>
          </tr>
          <tr>
            <th className="encabezado" colSpan={5}>
              {formattedDate}
            </th>
          </tr>
          <tr>
            <th className="encabezado">#</th>
            <th className="encabezado">Unidad</th>
            <th className="encabezado">Monto</th>
            <th className="encabezado">Tipo</th>
            <th className="encabezado">Hora</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago, index) => (
            <tr key={pago.id} className={obtenerClaseTipo(pago.tipo)}>
              <td className="celda-resumen">{index + 1}</td>
              <td className="celda-resumen">{pago.unidad}</td>
              <td className="celda-resumen">
                {formatNumberWithCommas(pago.monto)}
              </td>
              <td className="celda-resumen">{pago.tipo}</td>
              <td className="celda-resumen">{formatearHora(pago.fecha)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="pie-resumen">
              Total: $ {formatNumberWithCommas(total)}
            </td>
          </tr>
        </tfoot>
      </table>
      <button
        onClick={() => capturarTabla(tablaRef.current)}
        className="boton-capturar"
      >
        📸 Capturar
      </button>
    </div>
  );
};

export default TablaResumen;
