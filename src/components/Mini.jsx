// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
//import Dexie from 'dexie';
import "./Tiempos.css"; // Asegúrate de tener el archivo CSS para los estilos
import db from "../db";

const UnidadesComponent = () => {
  const [ruta, setRuta] = useState("");
  const [tipo, setTipo] = useState("");
  const [numeroUnidad, setNumeroUnidad] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  const inputRef = useRef(null);
  const [numerosTalzintan, setnumerosTalzintan] = useState([]);


  // Estados para todas las unidades
  const [ultimaUnidadTalzintan, setUltimaUnidadTalzintan] = useState(null);
  const [penultimaUnidadTalzintan, setPenultimaUnidadTalzintan] =
    useState(null);

  // Estados para unidades de tipo rojo ROJO ROJO ROJO
  const [ultimaUnidadRojaTalzintan, setUltimaUnidadRojaTalzintan] =
    useState(null);
  const [penultimaUnidadRojaTalzintan, setPenultimaUnidadRojaTalzintan] =
    useState(null);
    

  // Estados para tiempos transcurridos
  const [tiempoTranscurridoTalzintan, setTiempoTranscurridoTalzintan] =
    useState(0);

  // Estados para tiempos transcurridos ROJOS ROJOS ROJOS
  const [tiempoTranscurridoRojaTalzintan, setTiempoTranscurridoRojaTalzintan] =
    useState(0);


  // Estados para diferencias de tiempo entre último y penúltimo registro
  const [diferenciaTalzintan, setDiferenciaTalzintan] = useState(0);


  // Estados para diferencias de tiempo entre último y penúltimo registro ROJOS ROJOS ROJOS
  const [diferenciaRojaTalzintan, setDiferenciaRojaTalzintan] = useState(0);


  useEffect(() => {
    const actualizarCronometros = async () => {
      const unidadesTalzintan = await obtenerUnidades("talzintan");

      const unidadesRojaTalzintan = await obtenerUnidades("talzintan", "rojo");


      // Unidades de cualquier tipo
      actualizarEstadoUnidades(
        unidadesTalzintan,
        setUltimaUnidadTalzintan,
        setPenultimaUnidadTalzintan,
        setTiempoTranscurridoTalzintan,
        setDiferenciaTalzintan
      );


      // Unidades de tipo rojo 
      actualizarEstadoUnidades(
        unidadesRojaTalzintan,
        setUltimaUnidadRojaTalzintan,
        setPenultimaUnidadRojaTalzintan,
        setTiempoTranscurridoRojaTalzintan,
        setDiferenciaRojaTalzintan
      );
    };

    const intervalo = setInterval(actualizarCronometros, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const obtenerUnidades = async (ruta, tipo) => {
    if (tipo) {
      return await db.unidades.where({ ruta, tipo }).toArray();
    } else {
      return await db.unidades.where("ruta").equals(ruta).toArray();
    }
  };

  const actualizarEstadoUnidades = (
    unidades,
    setUltimaUnidad,
    setPenultimaUnidad,
    setTiempoTranscurrido,
    setDiferencia
  ) => {
    if (unidades.length > 0) {
      setUltimaUnidad(unidades[unidades.length - 1]);

      if (unidades.length > 1) {
        setPenultimaUnidad(unidades[unidades.length - 2]);
        const diferencia = Math.floor(
          (new Date(unidades[unidades.length - 1].horaRegistro) -
            new Date(unidades[unidades.length - 2].horaRegistro)) /
            1000
        );
        setDiferencia(diferencia);
      } else {
        setPenultimaUnidad(null);
        setDiferencia(0);
      }

      const tiempoTranscurrido = Math.floor(
        (new Date() - new Date(unidades[unidades.length - 1].horaRegistro)) /
          1000
      );
      setTiempoTranscurrido(tiempoTranscurrido);
    } else {
      setUltimaUnidad(null);
      setPenultimaUnidad(null);
      setTiempoTranscurrido(0);
      setDiferencia(0);
    }
  };

  const agregarUnidad = async () => {
    if (ruta && tipo && numeroUnidad) {
      const horaRegistro = new Date().toISOString();
      await db.unidades.add({ ruta, tipo, numeroUnidad, horaRegistro });
      setRuta("");
      setTipo("");
      setNumeroUnidad("");
      setFormVisible(false); // Ocultar el formulario después de agregar la unidad
    }
  };

  const handleAgregarTipo = (tipo) => {
    setTipo(tipo);
    agregarUnidad();
  };

  const handleCancelar = () => {
    setRuta("");
    setTipo("");
    setNumeroUnidad("");
    setFormVisible(false); // Ocultar el formulario al cancelar
  };

  useEffect(() => {
    if (isFormVisible) {
      inputRef.current.focus();
    }
  }, [isFormVisible]);

  const formatoTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos < 10 ? "0" : ""}${minutos}:${
      segundosRestantes < 10 ? "0" : ""
    }${segundosRestantes}`;
  };

  const handleObtenerUnidades = async () => {
    const numerosTalzintan = await obtenerUnidades("talzintan");
    setnumerosTalzintan(numerosTalzintan);
  };

  return (
    <div>
      {/*FORMULARIO FORMULARIO FORMULARIO FORMULARIO FORMULARIO FORMULARIO FORMULARIO FORMULARIO*/}
      {isFormVisible && (
        <div>
          <div className="form-container">
            <form
              className="add-form"
              onSubmit={(e) => {
                e.preventDefault();
                agregarUnidad();
              }}
            >
              <div className="ruta-display">{ruta}</div>
              <div className="form-buttons">
                <label>
                  <input
                    className="styled-input"
                    type="number"
                    ref={inputRef}
                    value={numeroUnidad}
                    onChange={(e) => setNumeroUnidad(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-buttons">
                <button
                  className="save-button-rojo"
                  type="button"
                  onClick={() => handleAgregarTipo("rojo")}
                >
                  Rojo
                </button>
                <button
                  className="cancel-button"
                  type="button"
                  onClick={handleCancelar}
                >
                  Cancelar
                </button>
                <button
                  className="save-button-r3"
                  type="button"
                  onClick={() => handleAgregarTipo("blanco")}
                >
                  R-3
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* tabla rutas tabla rutas tabla rutas tabla rutas tabla rutas tabla rutas tabla rutas tabla rutas tabla rutas */}
      <table>
        <tbody>
          {/*FILA TALZINTAN  FILA TALZINTAN  FILA TALZINTAN  FILA TALZINTAN  FILA TALZINTAN  FILA TALZINTAN  */}
          <tr>
            <td></td>
            <td className="celda-talzintan">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("talzintan");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoTalzintan)}
              </button>
              <br></br> <span className="texto-chico-negro">Talzintan</span>
            </td>
            {ultimaUnidadTalzintan && (
              <td className="celda-talzintan">
                {" "}
                <button
                  className={`${
                    ultimaUnidadTalzintan.tipo === "blanco"
                      ? "white-bg"
                      : "red-bg"
                  }`}
                >
                  {ultimaUnidadTalzintan.numeroUnidad}
                </button>{" "}
                {penultimaUnidadTalzintan && (
                  <>
                    <button className="button-se-lleva-talzintan">
                      {formatoTiempo(diferenciaTalzintan)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadTalzintan.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                    >
                      {penultimaUnidadTalzintan.numeroUnidad}
                    </button>
                    <br></br>
                    {ultimaUnidadRojaTalzintan && (
                      <>
                        <div className="rojo-texto-negro">
                          {formatoTiempo(tiempoTranscurridoRojaTalzintan)}
                        </div>
                        <div className="rojo-rojo">
                          {ultimaUnidadRojaTalzintan.numeroUnidad}
                        </div>
                        {penultimaUnidadRojaTalzintan && (
                          <>
                            <div className="rojo-texto-negro">
                              {formatoTiempo(diferenciaRojaTalzintan)}
                            </div>

                            <div className="rojo-rojo">
                              {penultimaUnidadRojaTalzintan.numeroUnidad}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </td>
            )}
          </tr>

        </tbody>
      </table>
      <div>
      <button onClick={handleObtenerUnidades}>Mostrar Unidades</button>
      <ul>
        {numerosTalzintan.map((unidad, index) => (
          <li key={index}>
            {JSON.stringify(unidad)}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default UnidadesComponent;
