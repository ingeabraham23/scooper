import React, { useState, useEffect, useRef } from "react";
//import Dexie from 'dexie';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Tiempos.css"; // Asegúrate de tener el archivo CSS para los estilos
import db from "../db";
import ClockButton from "./Reloj";
import BotonEliminarUnidad from "./BotonEliminarUnidad";
import Comision from "./Comision";
import {
  buscarUnidadYRelacionadas,
  buscarSanIsidroParaPrediccion,
  buscarSosaParaPrediccion,
  buscarQuintaParaPrediccion,
  obtenerUltimasUnidadesTacopan,
  buscarTezotepecParaPrediccion,
  buscarTezotepecParaPrediccionReverse,
  buscarCalicapanParaPrediccion,
  buscarLomaParaPrediccion,
  buscarTalzintanParaPrediccion,
} from "./constantes";

import html2canvas from "html2canvas";
import { CopyToClipboard } from "react-copy-to-clipboard";

// ✅ Función que se ejecuta una sola vez al montar (React Router friendly)
const obtenerPilaInicial = () => {
  try {
    const data = localStorage.getItem("pila");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const UnidadesComponent = () => {
  const [ruta, setRuta] = useState("");
  const [tipo, setTipo] = useState("");
  const [numeroUnidad, setNumeroUnidad] = useState("");
  const [isFormVisible, setFormVisible] = useState(false);
  const [pila, setPila] = useState(obtenerPilaInicial); // 🔥 carga inicial directa
  const [nuevoElemento, setNuevoElemento] = useState("");

  const [menuVisibleTalzintan, setMenuVisibleTalzintan] = useState(false);
  const [menuVisibleLoma, setMenuVisibleLoma] = useState(false);
  const [menuVisibleTezotepec, setMenuVisibleTezotepec] = useState(false);
  const [menuVisibleCalicapan, setMenuVisibleCalicapan] = useState(false);
  const [menuVisibleSosaEscuela, setMenuVisibleSosaEscuela] = useState(false);
  const [menuVisibleSanIsidro, setMenuVisibleSanIsidro] = useState(false);

  const inputRef = useRef(null);
  const [numerosTalzintan, setnumerosTalzintan] = useState([]);
  const [mostrarListaTalzintan, setMostrarListaTalzintan] = useState(false);
  const [numerosLoma, setnumerosLoma] = useState([]);
  const [mostrarListaLoma, setMostrarListaLoma] = useState(false);
  const [numerosTezotepec, setnumerosTezotepec] = useState([]);
  const [numerosTezotepecBlancas, setnumerosTezotepecBlancas] = useState([]);
  const [mostrarListaTezotepec, setMostrarListaTezotepec] = useState(false);
  const [mostrarListaTezotepecBlancas, setMostrarListaTezotepecBlancas] =
    useState(false);
  const [numerosCalicapan, setnumerosCalicapan] = useState([]);
  const [mostrarListaCalicapan, setMostrarListaCalicapan] = useState(false);
  const [numerosSosa, setnumerosSosa] = useState([]);
  const [numerosSosaBlancas, setnumerosSosaBlancas] = useState([]);
  const [mostrarListaSosa, setMostrarListaSosa] = useState(false);
  const [mostrarListaSosaBlancas, setMostrarListaSosaBlancas] = useState(false);
  const [numerosSanisidro, setnumerosSanisidro] = useState([]);
  const [numerosSanisidroBlancas, setnumerosSanisidroBlancas] = useState([]);
  const [mostrarListaSanisidro, setMostrarListaSanisidro] = useState(false);
  const [mostrarListaSanisidroBlancas, setMostrarListaSanisidroBlancas] =
    useState(false);
  const [numerosTacopan, setnumerosTacopan] = useState([]);
  const [mostrarListaTacopan, setMostrarListaTacopan] = useState(false);
  const [numerosTequimila, setnumerosTequimila] = useState([]);
  const [mostrarListaTequimila, setMostrarListaTequimila] = useState(false);
  const [numerosQuinta, setnumerosQuinta] = useState([]);
  const [mostrarListaQuinta, setMostrarListaQuinta] = useState(false);
  const [numerosCalanorte, setnumerosCalanorte] = useState([]);
  const [mostrarListaCalanorte, setMostrarListaCalanorte] = useState(false);
  const [numerosPajaco, setnumerosPajaco] = useState([]);
  const [mostrarListaPajaco, setMostrarListaPajaco] = useState(false);
  const [numerosAnalco, setnumerosAnalco] = useState([]);
  const [mostrarListaAnalco, setMostrarListaAnalco] = useState(false);
  const [numerosYopi, setnumerosYopi] = useState([]);
  const [mostrarListaYopi, setMostrarListaYopi] = useState(false);
  const [numerosOtra, setnumerosOtra] = useState([]);
  const [mostrarListaOtra, setMostrarListaOtra] = useState(false);

  // Estados para todas las unidades
  const [ultimaUnidadTalzintan, setUltimaUnidadTalzintan] = useState(null);
  const [penultimaUnidadTalzintan, setPenultimaUnidadTalzintan] =
    useState(null);
  const [ultimaUnidadLoma, setUltimaUnidadLoma] = useState(null);
  const [penultimaUnidadLoma, setPenultimaUnidadLoma] = useState(null);

  const [ultimaUnidadTezotepec, setUltimaUnidadTezotepec] = useState(null);
  const [penultimaUnidadTezotepec, setPenultimaUnidadTezotepec] =
    useState(null);
  const [ultimaUnidadCalicapan, setUltimaUnidadCalicapan] = useState(null);
  const [penultimaUnidadCalicapan, setPenultimaUnidadCalicapan] =
    useState(null);
  const [ultimaUnidadSosaEscuela, setUltimaUnidadSosaEscuela] = useState(null);
  const [penultimaUnidadSosaEscuela, setPenultimaUnidadSosaEscuela] =
    useState(null);
  const [ultimaUnidadSanIsidro, setUltimaUnidadSanIsidro] = useState(null);
  const [penultimaUnidadSanIsidro, setPenultimaUnidadSanIsidro] =
    useState(null);
  const [ultimaUnidadTacopan, setUltimaUnidadTacopan] = useState(null);
  const [penultimaUnidadTacopan, setPenultimaUnidadTacopan] = useState(null);
  const [ultimaUnidadCalanorte, setUltimaUnidadCalanorte] = useState(null);
  const [penultimaUnidadCalanorte, setPenultimaUnidadCalanorte] =
    useState(null);
  const [ultimaUnidadPajaco, setUltimaUnidadPajaco] = useState(null);
  const [penultimaUnidadPajaco, setPenultimaUnidadPajaco] = useState(null);
  const [ultimaUnidadAnalco, setUltimaUnidadAnalco] = useState(null);
  const [penultimaUnidadAnalco, setPenultimaUnidadAnalco] = useState(null);
  const [ultimaUnidadYopi, setUltimaUnidadYopi] = useState(null);
  const [penultimaUnidadYopi, setPenultimaUnidadYopi] = useState(null);
  const [ultimaUnidadTequimila, setUltimaUnidadTequimila] = useState(null);
  const [penultimaUnidadTequimila, setPenultimaUnidadTequimila] =
    useState(null);
  const [ultimaUnidadQuinta, setUltimaUnidadQuinta] = useState(null);
  const [penultimaUnidadQuinta, setPenultimaUnidadQuinta] = useState(null);
  const [ultimaUnidadOtra, setUltimaUnidadOtra] = useState(null);
  const [penultimaUnidadOtra, setPenultimaUnidadOtra] = useState(null);

  // Estados para unidades de tipo rojo ROJO ROJO ROJO
  const [ultimaUnidadRojaTalzintan, setUltimaUnidadRojaTalzintan] =
    useState(null);
  const [penultimaUnidadRojaTalzintan, setPenultimaUnidadRojaTalzintan] =
    useState(null);

  const [ultimaUnidadRojaTezotepec, setUltimaUnidadRojaTezotepec] =
    useState(null);
  const [penultimaUnidadRojaTezotepec, setPenultimaUnidadRojaTezotepec] =
    useState(null);

  const [ultimaUnidadRojaSosaEscuela, setUltimaUnidadRojaSosaEscuela] =
    useState(null);
  const [penultimaUnidadRojaSosaEscuela, setPenultimaUnidadRojaSosaEscuela] =
    useState(null);
  const [ultimaUnidadRojaSanIsidro, setUltimaUnidadRojaSanIsidro] =
    useState(null);
  const [penultimaUnidadRojaSanIsidro, setPenultimaUnidadRojaSanIsidro] =
    useState(null);

  const [ultimaUnidadRojaCalicapan, setUltimaUnidadRojaCalicapan] =
    useState(null);
  const [penultimaUnidadRojaCalicapan, setPenultimaUnidadRojaCalicapan] =
    useState(null);

  const [ultimaUnidadRojaTacopan, setUltimaUnidadRojaTacopan] = useState(null);
  const [penultimaUnidadRojaTacopan, setPenultimaUnidadRojaTacopan] =
    useState(null);

  // Estados para tiempos transcurridos
  const [tiempoTranscurridoTalzintan, setTiempoTranscurridoTalzintan] =
    useState(0);
  const [tiempoTranscurridoLoma, setTiempoTranscurridoLoma] = useState(0);
  const [tiempoTranscurridoTezotepec, setTiempoTranscurridoTezotepec] =
    useState(0);
  const [tiempoTranscurridoCalicapan, setTiempoTranscurridoCalicapan] =
    useState(0);
  const [tiempoTranscurridoSosaEscuela, setTiempoTranscurridoSosaEscuela] =
    useState(0);
  const [tiempoTranscurridoSanIsidro, setTiempoTranscurridoSanIsidro] =
    useState(0);
  const [tiempoTranscurridoTacopan, setTiempoTranscurridoTacopan] = useState(0);
  const [tiempoTranscurridoCalanorte, setTiempoTranscurridoCalanorte] =
    useState(0);
  const [tiempoTranscurridoPajaco, setTiempoTranscurridoPajaco] = useState(0);
  const [tiempoTranscurridoAnalco, setTiempoTranscurridoAnalco] = useState(0);
  const [tiempoTranscurridoYopi, setTiempoTranscurridoYopi] = useState(0);
  const [tiempoTranscurridoTequimila, setTiempoTranscurridoTequimila] =
    useState(0);
  const [tiempoTranscurridoQuinta, setTiempoTranscurridoQuinta] = useState(0);
  const [tiempoTranscurridoOtra, setTiempoTranscurridoOtra] = useState(0);

  // Estados para tiempos transcurridos ROJOS ROJOS ROJOS
  const [tiempoTranscurridoRojaTalzintan, setTiempoTranscurridoRojaTalzintan] =
    useState(0);
  const [tiempoTranscurridoRojaTezotepec, setTiempoTranscurridoRojaTezotepec] =
    useState(0);
  const [tiempoTranscurridoRojaCalicapan, setTiempoTranscurridoRojaCalicapan] =
    useState(0);
  const [
    tiempoTranscurridoRojaSosaEscuela,
    setTiempoTranscurridoRojaSosaEscuela,
  ] = useState(0);
  const [tiempoTranscurridoRojaSanIsidro, setTiempoTranscurridoRojaSanIsidro] =
    useState(0);
  const [tiempoTranscurridoRojaTacopan, setTiempoTranscurridoRojaTacopan] =
    useState(0);

  // Estados para diferencias de tiempo entre último y penúltimo registro
  const [diferenciaTalzintan, setDiferenciaTalzintan] = useState(0);
  const [diferenciaLoma, setDiferenciaLoma] = useState(0);
  const [diferenciaTezotepec, setDiferenciaTezotepec] = useState(0);
  const [diferenciaCalicapan, setDiferenciaCalicapan] = useState(0);
  const [diferenciaSosaEscuela, setDiferenciaSosaEscuela] = useState(0);
  const [diferenciaSanIsidro, setDiferenciaSanIsidro] = useState(0);
  const [diferenciaTacopan, setDiferenciaTacopan] = useState(0);
  const [diferenciaCalanorte, setDiferenciaCalanorte] = useState(0);
  const [diferenciaPajaco, setDiferenciaPajaco] = useState(0);
  const [diferenciaAnalco, setDiferenciaAnalco] = useState(0);
  const [diferenciaYopi, setDiferenciaYopi] = useState(0);
  const [diferenciaTequimila, setDiferenciaTequimila] = useState(0);
  const [diferenciaQuinta, setDiferenciaQuinta] = useState(0);
  const [diferenciaOtra, setDiferenciaOtra] = useState(0);

  // Estados para diferencias de tiempo entre último y penúltimo registro ROJOS ROJOS ROJOS
  const [diferenciaRojaTalzintan, setDiferenciaRojaTalzintan] = useState(0);
  const [diferenciaRojaTezotepec, setDiferenciaRojaTezotepec] = useState(0);
  const [diferenciaRojaCalicapan, setDiferenciaRojaCalicapan] = useState(0);
  const [diferenciaRojaSosaEscuela, setDiferenciaRojaSosaEscuela] = useState(0);
  const [diferenciaRojaSanIsidro, setDiferenciaRojaSanIsidro] = useState(0);
  const [diferenciaRojaTacopan, setDiferenciaRojaTacopan] = useState(0);

  const [horaRegistro, setHoraRegistro] = useState(new Date().toISOString());
  const [isEditable, setIsEditable] = useState(false);
  const [isHoraVisible, setIsHoraVisible] = useState(false);

  const [color, setColor] = useState("#FFFFFF");

  const [unidades, setUnidades] = useState([]);
  const [unidadesSosa, setUnidadesSosa] = useState([]);
  const [unidadesSanIsidro, setUnidadesSanIsidro] = useState([]);
  const [unidadesQuinta, setUnidadesQuinta] = useState([]);
  const [ultimasTacopan, setUltimasTacopan] = useState([]);
  const [unidadesTezotepec, setUnidadesTezotepec] = useState([]);
  const [unidadesTezotepecReverse, setUnidadesTezotepecReverse] = useState([]);

  const [unidadesCalicapan, setUnidadesCalicapan] = useState([]);
  const [unidadesLoma, setUnidadesLoma] = useState([]);
  const [unidadesTalzintan, setUnidadesTalzintan] = useState([]);

  /* // ✅ Guardar en localStorage cada vez que cambia la pila
  useEffect(() => {
    localStorage.setItem("pila", JSON.stringify(pila));
  }, [pila]);

  const agregarElemento = (elemento) => {
    const nuevo = (elemento || nuevoElemento).trim().toLowerCase();
    if (!nuevo) return;

    setPila((prev) => {
      let nuevaPila = [...prev];

      if (nuevo === "talzintan") {
        const indices = nuevaPila
          .map((e, i) => (e === "talzintan" ? i : -1))
          .filter((i) => i !== -1);

        if (indices.length >= 2) {
          const ultimoIndex = indices[indices.length - 1];
          nuevaPila.splice(ultimoIndex, 1);
        }

        nuevaPila.unshift("talzintan");
      } else {
        nuevaPila = nuevaPila.filter((e) => e !== nuevo);
        nuevaPila.unshift(nuevo);
      }

      return nuevaPila;
    });

    setNuevoElemento("");
  }; */

  const agregarElemento = (elemento) => {
  const nuevo = (elemento || nuevoElemento).trim().toLowerCase();
  if (!nuevo || nuevo === "tacopan") return; // ⛔️ Ignorar si es vacío o "tacopan"

  setPila((prev) => {
    let nuevaPila = [...prev];

    if (nuevo === "talzintan") {
      const indices = nuevaPila
        .map((e, i) => (e === "talzintan" ? i : -1))
        .filter((i) => i !== -1);

      if (indices.length >= 2) {
        const ultimoIndex = indices[indices.length - 1];
        nuevaPila.splice(ultimoIndex, 1);
      }

      nuevaPila.unshift("talzintan");
    } else {
      nuevaPila = nuevaPila.filter((e) => e !== nuevo);
      nuevaPila.unshift(nuevo);
    }

    return nuevaPila;
  });

  setNuevoElemento("");
};


  const obtenerColor = (nombre) => {
    switch (nombre) {
      case "talzintan":
        return "#4caf50"; // verde
      case "tezotepec":
        return "#ff9800"; // naranja
      case "calicapan":
        return "#2196f3"; // azul
      case "sosa":
        return "#e14eff"; // rosa
      case "sani":
        return "#9e9e9e"; // gris
      default:
        return "#000"; // negro para otros
    }
  };

  const limpiarPila = () => {
    setPila([]);
    localStorage.removeItem("pila");
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      const resultado = await buscarUnidadYRelacionadas();
      if (resultado) setUnidades(resultado);
    };

    obtenerDatos();
  }, [isFormVisible]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const resultado = await buscarSanIsidroParaPrediccion();
      if (resultado) setUnidadesSanIsidro(resultado);
    };

    obtenerDatos();
  }, [isFormVisible]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const resultado = await buscarSosaParaPrediccion();
      if (resultado) setUnidadesSosa(resultado);
    };

    obtenerDatos();
  }, [isFormVisible]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const resultado = await buscarQuintaParaPrediccion();
      if (resultado) setUnidadesQuinta(resultado);
    };

    obtenerDatos();
  }, [isFormVisible]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const resultado = await buscarTezotepecParaPrediccion();
      if (resultado) setUnidadesTezotepec(resultado);
    };

    obtenerDatos();
  }, [isFormVisible]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const resultado = await buscarTezotepecParaPrediccionReverse();
      if (resultado && resultado.length) {
        setUnidadesTezotepecReverse(resultado);
      }
    };
    obtenerDatos();
  }, [isFormVisible]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const resultado = await buscarCalicapanParaPrediccion();
      if (resultado) setUnidadesCalicapan(resultado);
    };

    obtenerDatos();
  }, [isFormVisible]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const resultado = await buscarLomaParaPrediccion();
      if (resultado) setUnidadesLoma(resultado);
    };

    obtenerDatos();
  }, [isFormVisible]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const resultado = await buscarTalzintanParaPrediccion();
      if (resultado) setUnidadesTalzintan(resultado);
    };

    obtenerDatos();
  }, [isFormVisible]);

  useEffect(() => {
    const cargarUltimasUnidades = async () => {
      const unidades = await obtenerUltimasUnidadesTacopan();
      setUltimasTacopan(unidades);
    };

    cargarUltimasUnidades();
  }, [isFormVisible]);

  const tablaTalzintanRef = useRef(null);
  const tablaLomaRef = useRef(null);
  const tablaTezotepecRef = useRef(null);
  const tablaTezotepecBlancasRef = useRef(null);
  const tablaCalicapanRef = useRef(null);
  const tablaSosaRef = useRef(null);
  const tablaSosaBlancasRef = useRef(null);
  const tablaSanisidroRef = useRef(null);
  const tablaSanisidroBlancasRef = useRef(null);
  const tablaTacopanRef = useRef(null);
  const tablaTequimilaRef = useRef(null);
  const tablaQuintaRef = useRef(null);
  const tablaCalanorteRef = useRef(null);
  const tablaPajacoRef = useRef(null);
  const tablaAnalcoRef = useRef(null);
  const tablaYopiRef = useRef(null);
  const tablaOtraRef = useRef(null);

  useEffect(() => {
    const actualizarCronometros = async () => {
      const unidadesTalzintan = await obtenerUnidades("talzintan");
      const unidadesLoma = await obtenerUnidades("loma");
      const unidadesTezotepec = await obtenerUnidades("tezotepec");
      const unidadesCalicapan = await obtenerUnidades("calicapan");
      const unidadesSosaEscuela = await obtenerUnidades("sosa escuela");
      const unidadesSanIsidro = await obtenerUnidades("san isidro");
      const unidadesTacopan = await obtenerUnidades("tacopan");
      const unidadesCalanorte = await obtenerUnidades("calanorte");
      const unidadesPajaco = await obtenerUnidades("pajaco");
      const unidadesAnalco = await obtenerUnidades("analco");
      const unidadesYopi = await obtenerUnidades("yopi");
      const unidadesTequimila = await obtenerUnidades("tequimila");
      const unidadesQuinta = await obtenerUnidades("quinta");
      const unidadesOtra = await obtenerUnidades("otra");

      const unidadesRojaTalzintan = await obtenerUnidades("talzintan", "rojo");
      const unidadesRojaTezotepec = await obtenerUnidades("tezotepec", "rojo");
      const unidadesRojaCalicapan = await obtenerUnidades("calicapan", "rojo");
      const unidadesRojaSosaEscuela = await obtenerUnidades(
        "sosa escuela",
        "rojo"
      );
      const unidadesRojaSanIsidro = await obtenerUnidades("san isidro", "rojo");
      const unidadesRojaTacopan = await obtenerUnidades("tacopan", "rojo");

      // Unidades de cualquier tipo
      actualizarEstadoUnidades(
        unidadesTalzintan,
        setUltimaUnidadTalzintan,
        setPenultimaUnidadTalzintan,
        setTiempoTranscurridoTalzintan,
        setDiferenciaTalzintan
      );
      actualizarEstadoUnidades(
        unidadesLoma,
        setUltimaUnidadLoma,
        setPenultimaUnidadLoma,
        setTiempoTranscurridoLoma,
        setDiferenciaLoma
      );
      actualizarEstadoUnidades(
        unidadesTezotepec,
        setUltimaUnidadTezotepec,
        setPenultimaUnidadTezotepec,
        setTiempoTranscurridoTezotepec,
        setDiferenciaTezotepec
      );
      actualizarEstadoUnidades(
        unidadesCalicapan,
        setUltimaUnidadCalicapan,
        setPenultimaUnidadCalicapan,
        setTiempoTranscurridoCalicapan,
        setDiferenciaCalicapan
      );
      actualizarEstadoUnidades(
        unidadesSosaEscuela,
        setUltimaUnidadSosaEscuela,
        setPenultimaUnidadSosaEscuela,
        setTiempoTranscurridoSosaEscuela,
        setDiferenciaSosaEscuela
      );
      actualizarEstadoUnidades(
        unidadesSanIsidro,
        setUltimaUnidadSanIsidro,
        setPenultimaUnidadSanIsidro,
        setTiempoTranscurridoSanIsidro,
        setDiferenciaSanIsidro
      );
      actualizarEstadoUnidades(
        unidadesTacopan,
        setUltimaUnidadTacopan,
        setPenultimaUnidadTacopan,
        setTiempoTranscurridoTacopan,
        setDiferenciaTacopan
      );
      actualizarEstadoUnidades(
        unidadesCalanorte,
        setUltimaUnidadCalanorte,
        setPenultimaUnidadCalanorte,
        setTiempoTranscurridoCalanorte,
        setDiferenciaCalanorte
      );
      actualizarEstadoUnidades(
        unidadesPajaco,
        setUltimaUnidadPajaco,
        setPenultimaUnidadPajaco,
        setTiempoTranscurridoPajaco,
        setDiferenciaPajaco
      );
      actualizarEstadoUnidades(
        unidadesAnalco,
        setUltimaUnidadAnalco,
        setPenultimaUnidadAnalco,
        setTiempoTranscurridoAnalco,
        setDiferenciaAnalco
      );
      actualizarEstadoUnidades(
        unidadesYopi,
        setUltimaUnidadYopi,
        setPenultimaUnidadYopi,
        setTiempoTranscurridoYopi,
        setDiferenciaYopi
      );
      actualizarEstadoUnidades(
        unidadesTequimila,
        setUltimaUnidadTequimila,
        setPenultimaUnidadTequimila,
        setTiempoTranscurridoTequimila,
        setDiferenciaTequimila
      );
      actualizarEstadoUnidades(
        unidadesQuinta,
        setUltimaUnidadQuinta,
        setPenultimaUnidadQuinta,
        setTiempoTranscurridoQuinta,
        setDiferenciaQuinta
      );
      actualizarEstadoUnidades(
        unidadesOtra,
        setUltimaUnidadOtra,
        setPenultimaUnidadOtra,
        setTiempoTranscurridoOtra,
        setDiferenciaOtra
      );

      // Unidades de tipo rojo
      actualizarEstadoUnidades(
        unidadesRojaTalzintan,
        setUltimaUnidadRojaTalzintan,
        setPenultimaUnidadRojaTalzintan,
        setTiempoTranscurridoRojaTalzintan,
        setDiferenciaRojaTalzintan
      );
      actualizarEstadoUnidades(
        unidadesRojaTezotepec,
        setUltimaUnidadRojaTezotepec,
        setPenultimaUnidadRojaTezotepec,
        setTiempoTranscurridoRojaTezotepec,
        setDiferenciaRojaTezotepec
      );
      actualizarEstadoUnidades(
        unidadesRojaCalicapan,
        setUltimaUnidadRojaCalicapan,
        setPenultimaUnidadRojaCalicapan,
        setTiempoTranscurridoRojaCalicapan,
        setDiferenciaRojaCalicapan
      );
      actualizarEstadoUnidades(
        unidadesRojaSosaEscuela,
        setUltimaUnidadRojaSosaEscuela,
        setPenultimaUnidadRojaSosaEscuela,
        setTiempoTranscurridoRojaSosaEscuela,
        setDiferenciaRojaSosaEscuela
      );
      actualizarEstadoUnidades(
        unidadesRojaSanIsidro,
        setUltimaUnidadRojaSanIsidro,
        setPenultimaUnidadRojaSanIsidro,
        setTiempoTranscurridoRojaSanIsidro,
        setDiferenciaRojaSanIsidro
      );
      actualizarEstadoUnidades(
        unidadesRojaTacopan,
        setUltimaUnidadRojaTacopan,
        setPenultimaUnidadRojaTacopan,
        setTiempoTranscurridoRojaTacopan,
        setDiferenciaRojaTacopan
      );

      // Verificar si el tiempo transcurrido es de 6 minutos (360 segundos)
      if (
        tiempoTranscurridoTalzintan == 360 &&
        ultimaUnidadTalzintan.tipo == "rojo"
      ) {
        toast.success(`¡6 Minutos libres del rojo Talzintan!`);
      }

      if (
        tiempoTranscurridoTezotepec == 360 &&
        ultimaUnidadTezotepec.tipo == "rojo"
      ) {
        toast.warn(`¡6 Minutos libres del rojo Tezotepec!`);
      }

      if (
        tiempoTranscurridoCalicapan == 360 &&
        ultimaUnidadCalicapan.tipo == "rojo"
      ) {
        toast.info(`¡6 Minutos libres del rojo Calicapan!`);
      }

      if (
        tiempoTranscurridoSosaEscuela == 360 &&
        ultimaUnidadSosaEscuela.tipo == "rojo"
      ) {
        toast.error(`¡6 Minutos libres del rojo Sosa Escuela!`);
      }

      if (
        tiempoTranscurridoSanIsidro == 360 &&
        ultimaUnidadSanIsidro.tipo == "rojo"
      ) {
        toast(`¡6 Minutos libres del rojo San Isidro!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };

    const intervalo = setInterval(actualizarCronometros, 1000);
    return () => clearInterval(intervalo);
  }, [
    tiempoTranscurridoCalicapan,
    tiempoTranscurridoSanIsidro,
    tiempoTranscurridoSosaEscuela,
    tiempoTranscurridoTalzintan,
    tiempoTranscurridoTezotepec,
    ultimaUnidadTalzintan,
    ultimaUnidadTezotepec,
    ultimaUnidadCalicapan,
    ultimaUnidadSosaEscuela,
    ultimaUnidadSanIsidro,
  ]);

  const obtenerUnidades = async (ruta, tipo) => {
    let unidades;
    if (tipo) {
      unidades = await db.unidades
        .where({ ruta, tipo })
        .reverse() // Ordenar en orden descendente
        .limit(15) // Limitar a los últimos 7 registros
        .toArray();
    } else {
      unidades = await db.unidades
        .where("ruta")
        .equals(ruta)
        .reverse() // Ordenar en orden descendente
        .limit(15) // Limitar a los últimos 7 registros
        .toArray();
    }

    // Comprobación de unidades
    if (!unidades || unidades.length === 0) {
      return []; // No existen unidades
    }

    return unidades.reverse(); // Revertir el orden para obtener los últimos 7 en orden cronológico
  };

  const obtenerUnidadesSosa = async (ruta, tipo) => {
    const unidadesExcluidas = [11, 25, 35, 42, 44, 55, 63, 66, 77, 88, 131]; // Unidades que no queremos incluir

    let unidades;
    if (tipo) {
      unidades = await db.unidades
        .where({ ruta, tipo })
        .reverse() // Ordenar en orden descendente
        .limit(15) // Limitar a los últimos 15 registros
        .toArray();
    } else {
      unidades = await db.unidades
        .where("ruta")
        .equals(ruta)
        .reverse() // Ordenar en orden descendente
        .limit(15) // Limitar a los últimos 15 registros
        .toArray();
    }

    console.log("Antes de filtrar:", unidades);

    // Verificar qué propiedad tiene el número de la unidad
    unidades = unidades.filter((unidad) => {
      console.log("Verificando unidad:", unidad);
      return !unidadesExcluidas.includes(unidad.numeroUnidad); // ¿Es unidad.numero o unidad.id?
    });

    console.log("Después de filtrar:", unidades);

    // Comprobación de unidades
    if (!unidades || unidades.length === 0) {
      return []; // No existen unidades
    }

    return unidades.reverse(); // Revertir el orden para obtener los últimos en orden cronológico
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
    if (ruta && tipo && numeroUnidad.trim() !== "") {
      const unidadValida = /^[0-9.\-+]+$/.test(numeroUnidad);
      if (!unidadValida) {
        alert(
          "La unidad solo puede contener números, puntos, guiones o signos de más."
        );
        return;
      }

      await db.unidades.add({
        ruta,
        tipo,
        numeroUnidad: numeroUnidad.trim(), // Guardado como string
        horaRegistro,
        color,
      });

      setRuta("");
      setTipo("");
      setNumeroUnidad("");
      setHoraRegistro(new Date().toISOString());
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
    setHoraRegistro(new Date().toISOString());
    setFormVisible(false); // Ocultar el formulario al cancelar
  };

  const handleEditHora = () => {
    setIsEditable(true);
    setIsHoraVisible(true);
  };

  useEffect(() => {
    if (isFormVisible) {
      setHoraRegistro(new Date().toISOString());
      setIsEditable(false);
      setIsHoraVisible(false);
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

  const formatoTiempoRedondeado = (segundos) => {
    const minutos = Math.floor(segundos / 60); // Minutos completos
    const segundosRestantes = segundos % 60; // Segundos restantes
    const medioMinutoExtra = segundosRestantes > 30 ? 1 : 0; // Redondear al medio minuto mayor
    const totalMinutos = minutos + medioMinutoExtra; // Minutos totales redondeados

    if (segundosRestantes > 0 && segundosRestantes <= 30) {
      return `*${minutos} y ½* min.`;
    } else {
      return `*${totalMinutos}* min.`;
    }
  };

  const handleObtenerUnidadesTalzintan = async () => {
    const numerosTalzintan = await obtenerUnidades("talzintan");
    setnumerosTalzintan(numerosTalzintan);
    setMostrarListaTalzintan(true);
  };

  const handleCloseListaTalzintan = () => {
    setMostrarListaTalzintan(false);
  };

  const handleObtenerUnidadesLoma = async () => {
    const numerosLoma = await obtenerUnidades("loma");
    const numerosTalzintan = await obtenerUnidades("talzintan");
    setnumerosTalzintan(numerosTalzintan);
    setnumerosLoma(numerosLoma);
    setMostrarListaLoma(true);
  };

  const handleCloseListaLoma = () => {
    setMostrarListaLoma(false);
  };

  const handleObtenerUnidadesTezotepec = async () => {
    const numerosTezotepec = await obtenerUnidades("tezotepec");
    setnumerosTezotepec(numerosTezotepec);
    setMostrarListaTezotepec(true);
  };

  const handleObtenerUnidadesTezotepecBlancas = async () => {
    const numerosTezotepecBlancas = await obtenerUnidades(
      "tezotepec",
      "blanco"
    );
    setnumerosTezotepecBlancas(numerosTezotepecBlancas);
    setMostrarListaTezotepecBlancas(true);
  };

  const handleCloseListaTezotepec = () => {
    setMostrarListaTezotepec(false);
  };

  const handleCloseListaTezotepecBlancas = () => {
    setMostrarListaTezotepecBlancas(false);
  };

  const handleObtenerUnidadesCalicapan = async () => {
    const numerosCalicapan = await obtenerUnidades("calicapan");
    setnumerosCalicapan(numerosCalicapan);
    setMostrarListaCalicapan(true);
  };

  const handleCloseListaCalicapan = () => {
    setMostrarListaCalicapan(false);
  };

  const handleObtenerUnidadesSosa = async () => {
    const numerosSosa = await obtenerUnidades("sosa escuela");
    setnumerosSosa(numerosSosa);
    setMostrarListaSosa(true);
  };

  const handleCloseListaSosa = () => {
    setMostrarListaSosa(false);
  };

  const handleObtenerUnidadesSosaBlancas = async () => {
    const numerosSosaBlancas = await obtenerUnidadesSosa(
      "sosa escuela",
      "blanco"
    );
    setnumerosSosaBlancas(numerosSosaBlancas);
    setMostrarListaSosaBlancas(true);
  };

  const handleCloseListaSosaBlancas = () => {
    setMostrarListaSosaBlancas(false);
  };

  const handleObtenerUnidadesSanisidro = async () => {
    const numerosSanisidro = await obtenerUnidades("san isidro");
    setnumerosSanisidro(numerosSanisidro);
    setMostrarListaSanisidro(true);
  };

  const handleCloseListaSanisidro = () => {
    setMostrarListaSanisidro(false);
  };

  const handleObtenerUnidadesSanisidroBlancas = async () => {
    const numerosSanisidroBlancas = await obtenerUnidadesSosa(
      "san isidro",
      "blanco"
    );
    setnumerosSanisidroBlancas(numerosSanisidroBlancas);
    setMostrarListaSanisidroBlancas(true);
  };

  const handleCloseListaSanisidroBlancas = () => {
    setMostrarListaSanisidroBlancas(false);
  };

  const handleObtenerUnidadesTacopan = async () => {
    const numerosTacopan = await obtenerUnidades("tacopan");
    setnumerosTacopan(numerosTacopan);
    setMostrarListaTacopan(true);
  };

  const handleCloseListaTacopan = () => {
    setMostrarListaTacopan(false);
  };

  const handleObtenerUnidadesTequimila = async () => {
    const numerosTequimila = await obtenerUnidades("tequimila");
    setnumerosTequimila(numerosTequimila);
    setMostrarListaTequimila(true);
  };

  const handleCloseListaTequimila = () => {
    setMostrarListaTequimila(false);
  };

  const handleObtenerUnidadesQuinta = async () => {
    const numerosQuinta = await obtenerUnidades("quinta");
    setnumerosQuinta(numerosQuinta);
    setMostrarListaQuinta(true);
  };

  const handleCloseListaQuinta = () => {
    setMostrarListaQuinta(false);
  };

  const handleObtenerUnidadesCalanorte = async () => {
    const numerosCalanorte = await obtenerUnidades("calanorte");
    setnumerosCalanorte(numerosCalanorte);
    setMostrarListaCalanorte(true);
  };

  const handleCloseListaCalanorte = () => {
    setMostrarListaCalanorte(false);
  };

  const handleObtenerUnidadesPajaco = async () => {
    const numerosPajaco = await obtenerUnidades("pajaco");
    setnumerosPajaco(numerosPajaco);
    setMostrarListaPajaco(true);
  };

  const handleCloseListaPajaco = () => {
    setMostrarListaPajaco(false);
  };

  const handleObtenerUnidadesAnalco = async () => {
    const numerosAnalco = await obtenerUnidades("analco");
    setnumerosAnalco(numerosAnalco);
    setMostrarListaAnalco(true);
  };

  const handleCloseListaAnalco = () => {
    setMostrarListaAnalco(false);
  };

  const handleObtenerUnidadesYopi = async () => {
    const numerosYopi = await obtenerUnidades("yopi");
    setnumerosYopi(numerosYopi);
    setMostrarListaYopi(true);
  };

  const handleCloseListaYopi = () => {
    setMostrarListaYopi(false);
  };

  const handleObtenerUnidadesOtra = async () => {
    const numerosOtra = await obtenerUnidades("otra");
    setnumerosOtra(numerosOtra);
    setMostrarListaOtra(true);
  };

  const handleCloseListaOtra = () => {
    setMostrarListaOtra(false);
  };

  const formatHoraRegistro = (horaRegistro) => {
    const date = new Date(horaRegistro);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleDownloadImageTalzintan = () => {
    const input = tablaTalzintanRef.current;
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
    const formattedDate = `Tabla talzintan ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  const handleDownloadImageLoma = () => {
    const input = tablaLomaRef.current;

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

    const amOrPm = currentDate.getHours() >= 12 ? "pm" : "am";
    const formattedDate = `Tabla loma ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  const handleDownloadImageTezotepec = () => {
    const input = tablaTezotepecRef.current;

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

    const amOrPm = currentDate.getHours() >= 12 ? "pm" : "am";
    const formattedDate = `Tabla tezotepec ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  /* const handleDownloadImageTezotepecBlancas = () => {
    const input = tablaTezotepecBlancasRef.current;

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

    const amOrPm = currentDate.getHours() >= 12 ? "pm" : "am";
    const formattedDate = `Tabla tezotepec ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  }; */

  const handleDownloadImageCalicapan = () => {
    const input = tablaCalicapanRef.current;
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
    const formattedDate = `Tabla calicapan ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  const handleDownloadImageSosa = () => {
    const input = tablaSosaRef.current;
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
    const formattedDate = `Tabla sosa ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  /* const handleDownloadImageSosaBlancas = () => {
    const input = tablaSosaBlancasRef.current;
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
    const formattedDate = `Tabla sosa ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  }; */

  const handleDownloadImageSanisidro = () => {
    const input = tablaSanisidroRef.current;
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
    const formattedDate = `Tabla san isidro ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  /* const handleDownloadImageSanisidroBlancas = () => {
    const input = tablaSanisidroBlancasRef.current;
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
    const formattedDate = `Tabla san isidro ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  }; */

  const handleDownloadImageTacopan = () => {
    const input = tablaTacopanRef.current;
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
    const formattedDate = `Tabla tacopan ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  const handleDownloadImageTequimila = () => {
    const input = tablaTequimilaRef.current;
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
    const formattedDate = `Tabla tequimila ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  const handleDownloadImageQuinta = () => {
    const input = tablaQuintaRef.current;
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
    const formattedDate = `Tabla quinta ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  const handleDownloadImageCalanorte = () => {
    const input = tablaCalanorteRef.current;
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
    const formattedDate = `Tabla calanorte ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  const handleDownloadImagePajaco = () => {
    const input = tablaPajacoRef.current;
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
    const formattedDate = `Tabla pajaco ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  const handleDownloadImageAnalco = () => {
    const input = tablaAnalcoRef.current;
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
    const formattedDate = `Tabla analco ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  const handleDownloadImageYopi = () => {
    const input = tablaYopiRef.current;
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
    const formattedDate = `Tabla yopi ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  const handleDownloadImageOtra = () => {
    const input = tablaOtraRef.current;
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
    const formattedDate = `Tabla otra ${dayOfWeek} ${dayOfMonth} de ${month} de ${year} a las ${hours}.${minutesWithLeadingZero} ${amOrPm}`;

    // Guardar el IMAGEN con el nombre de archivo formateado
    const filename = `${formattedDate}`;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = filename + ".png";
      link.href = imgData;
      link.click();
    });
  };

  const add46Minutes = (horaRegistro) => {
    const date = new Date(horaRegistro);
    date.setMinutes(date.getMinutes() + 46);
    return date;
  };

  const add80Minutes = (horaRegistro) => {
    const date = new Date(horaRegistro);
    if (isNaN(date.getTime())) {
      throw new Error("Fecha inválida");
    }
    date.setMinutes(date.getMinutes() + 80);
    return date;
  };

  const add65Minutes = (horaRegistro) => {
    const date = new Date(horaRegistro);
    if (isNaN(date.getTime())) {
      throw new Error("Fecha inválida");
    }
    date.setMinutes(date.getMinutes() + 65);
    return date;
  };

  const add50Minutes = (horaRegistro) => {
    const date = new Date(horaRegistro);
    date.setMinutes(date.getMinutes() + 50);
    return date;
  };

  const add70Minutes = (horaRegistro) => {
    const date = new Date(horaRegistro);
    date.setMinutes(date.getMinutes() + 70);
    return date;
  };

  /* const add60Minutes = (horaRegistro) => {
    const date = new Date(horaRegistro);
    date.setMinutes(date.getMinutes() + 60);
    return date;
  }; */

  const add75Minutes = (horaRegistro) => {
    const date = new Date(horaRegistro);
    date.setMinutes(date.getMinutes() + 75);
    return date;
  };

  const convertToLocalDateTime = (date) => {
    const localDate = new Date(date);
    const offset = localDate.getTimezoneOffset() * 60000;
    const localISOTime = new Date(localDate.getTime() - offset)
      .toISOString()
      .slice(0, 16);
    return localISOTime;
  };

  const formattedTextTacopanAlMomento = `*Tacopan al momento:*\r\n\r\n- ${formatoTiempoRedondeado(
    tiempoTranscurridoTacopan
  )} del *${ultimaUnidadTacopan ? ultimaUnidadTacopan.numeroUnidad : "N/A"}* *${
    ultimaUnidadTacopan ? ultimaUnidadTacopan.tipo : "N/A"
  }* _Tacopan_\r\n\r\n- ${formatoTiempoRedondeado(
    tiempoTranscurridoTalzintan
  )} del *${
    ultimaUnidadTalzintan ? ultimaUnidadTalzintan.numeroUnidad : "N/A"
  }* *${
    ultimaUnidadTalzintan ? ultimaUnidadTalzintan.tipo : "N/A"
  }* _Talzintan_\r\n- ${formatoTiempoRedondeado(tiempoTranscurridoLoma)} del *${
    ultimaUnidadLoma ? ultimaUnidadLoma.numeroUnidad : "N/A"
  }* *${
    ultimaUnidadLoma ? ultimaUnidadLoma.tipo : "N/A"
  }* _Loma_\r\n\r\n- ${formatoTiempoRedondeado(
    tiempoTranscurridoCalanorte
  )} del *${
    ultimaUnidadCalanorte ? ultimaUnidadCalanorte.numeroUnidad : "N/A"
  }* *${
    ultimaUnidadCalanorte ? ultimaUnidadCalanorte.tipo : "N/A"
  }* _Calanorte_\r\n- ${formatoTiempoRedondeado(
    tiempoTranscurridoPajaco
  )} del *${ultimaUnidadPajaco ? ultimaUnidadPajaco.numeroUnidad : "N/A"}* *${
    ultimaUnidadPajaco ? ultimaUnidadPajaco.tipo : "N/A"
  }* _Pajaco_\r\n© _JoyBoy._`;

  const formattedTextTacopanTeLlevas = `*Tacopan te llevas:*\r\n\r\n- ${formatoTiempoRedondeado(
    diferenciaTacopan
  )} del *${
    penultimaUnidadTacopan ? penultimaUnidadTacopan.numeroUnidad : "N/A"
  }* *${
    penultimaUnidadTacopan ? penultimaUnidadTacopan.tipo : "N/A"
  }* _Tacopan_\r\n\r\n- ${formatoTiempoRedondeado(
    tiempoTranscurridoTalzintan
  )} del *${
    ultimaUnidadTalzintan ? ultimaUnidadTalzintan.numeroUnidad : "N/A"
  }* *${
    ultimaUnidadTalzintan ? ultimaUnidadTalzintan.tipo : "N/A"
  }* _Talzintan_\r\n- ${formatoTiempoRedondeado(tiempoTranscurridoLoma)} del *${
    ultimaUnidadLoma ? ultimaUnidadLoma.numeroUnidad : "N/A"
  }* *${
    ultimaUnidadLoma ? ultimaUnidadLoma.tipo : "N/A"
  }* _Loma_\r\n\r\n- ${formatoTiempoRedondeado(
    tiempoTranscurridoCalanorte
  )} del *${
    ultimaUnidadCalanorte ? ultimaUnidadCalanorte.numeroUnidad : "N/A"
  }* *${
    ultimaUnidadCalanorte ? ultimaUnidadCalanorte.tipo : "N/A"
  }* _Calanorte_\r\n- ${formatoTiempoRedondeado(
    tiempoTranscurridoPajaco
  )} del *${ultimaUnidadPajaco ? ultimaUnidadPajaco.numeroUnidad : "N/A"}* *${
    ultimaUnidadPajaco ? ultimaUnidadPajaco.tipo : "N/A"
  }* _Pajaco_\r\n© _JoyBoy._`;

  // --- FUNCIONES AUXILIARES PARA EL COPY-PASTE
  const formatUnidadInfo = (tiempo, unidad, ubicacion) =>
    `${formatoTiempoRedondeado(tiempo)} del *${
      unidad?.numeroUnidad || "N/A"
    }* *${unidad?.tipo || "N/A"}* ${ubicacion ? `_${ubicacion}_` : ""}`;

  const formatUnidadInfo2 = (unidad, ubicacion) =>
    `*${unidad?.numeroUnidad || "N/A"}* *${unidad?.tipo || "N/A"}* ${
      ubicacion ? `_${ubicacion}_` : ""
    }`;

  // COPY-PASTE TALZINTAN --  COPY-PASTE TALZINTAN --  COPY-PASTE TALZINTAN --  COPY-PASTE TALZINTAN --
  const formattedTextTalzintanAlMomento =
    `ℹ *Talzintan al momento:*\r\n\r\n` +
    `- ${formatUnidadInfo(
      tiempoTranscurridoTalzintan,
      ultimaUnidadTalzintan,
      "Talzintan"
    )}\r\n\r\n` +
    `- *El se llevo:* ${formatUnidadInfo(
      diferenciaTalzintan,
      penultimaUnidadTalzintan
    )}\r\n\r\n` +
    `- *Y del loma hay:* ${formatUnidadInfo(
      tiempoTranscurridoLoma,
      ultimaUnidadLoma,
      "Loma"
    )}\r\n\r\n` +
    `- *Del rojo talzintan hay:* ${formatUnidadInfo(
      tiempoTranscurridoRojaTalzintan,
      ultimaUnidadRojaTalzintan
    )}\r\n© _JoyBoy._`;

  const formattedTextTalzintanEstaPasando =
    `🚨 *Talzintan esta pasando:*\r\n\r\n` +
    `- ${formatUnidadInfo2(ultimaUnidadTalzintan, "Talzintan")}\r\n\r\n` +
    `*El se lleva:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(diferenciaTalzintan)} del ${formatUnidadInfo2(
      penultimaUnidadTalzintan,
      "Talzintan"
    )}\r\n\r\n` +
    `- y ${formatoTiempoRedondeado(
      tiempoTranscurridoLoma
    )} del ${formatUnidadInfo2(ultimaUnidadLoma, "Loma")}\r\n© _JoyBoy._`;

  const formattedTextTalzintanTeLlevas =
    `✅ *Talzintan te llevas:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(diferenciaTalzintan)} del ${formatUnidadInfo2(
      penultimaUnidadTalzintan,
      "Talzintan"
    )}\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      tiempoTranscurridoLoma
    )} del ${formatUnidadInfo2(ultimaUnidadLoma, "Loma")}\r\n\r\n` +
    `*De rojo a rojo:* \r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      diferenciaRojaTalzintan
    )} del ${formatUnidadInfo2(
      penultimaUnidadRojaTalzintan,
      "Talzintan"
    )}\r\n© _JoyBoy._`;

  const formattedTextTalzintanAtrasDeTi =
    `*Esta saliendo:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      diferenciaTalzintan
    )} atras de ti ${formatUnidadInfo2(
      ultimaUnidadTalzintan,
      "Talzintan"
    )}\r\n© _JoyBoy._`;

  // COPY-PASTE LOMA --  COPY-PASTE LOMA --  COPY-PASTE LOMA --  COPY-PASTE LOMA --
  const formattedTextLomaEstaPasando =
    `🚨 *Loma esta pasando:*\r\n\r\n` +
    `- ${formatUnidadInfo2(ultimaUnidadLoma, "Loma")}\r\n\r\n` +
    `*El se lleva:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      tiempoTranscurridoTalzintan
    )} del ${formatUnidadInfo2(ultimaUnidadTalzintan, "Talzintan")}\r\n\r\n` +
    `- y ${formatoTiempoRedondeado(diferenciaLoma)} del ${formatUnidadInfo2(
      penultimaUnidadLoma,
      "Loma"
    )}\r\n© _JoyBoy._`;

  const formattedTextLomaAtrasDeTi =
    `*Esta saliendo:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      tiempoTranscurridoTalzintan
    )} atras de ti ${formatUnidadInfo2(
      ultimaUnidadLoma,
      "Loma"
    )}\r\n© _JoyBoy._`;

  // COPY-PASTE TEZOTEPEC --  COPY-PASTE TEZOTEPEC --  COPY-PASTE TEZOTEPEC --  COPY-PASTE TEZOTEPEC --
  const formattedTextTezotepecAlMomento =
    `ℹ *Tezotepec al momento:*\r\n\r\n` +
    `- ${formatUnidadInfo(
      tiempoTranscurridoTezotepec,
      ultimaUnidadTezotepec,
      "Tezotepec"
    )}\r\n\r\n` +
    `- *El se llevo:* ${formatUnidadInfo(
      diferenciaTezotepec,
      penultimaUnidadTezotepec
    )}\r\n\r\n` +
    `- *Del rojo tezotepec hay:* ${formatUnidadInfo(
      tiempoTranscurridoRojaTezotepec,
      ultimaUnidadRojaTezotepec
    )}\r\n© _JoyBoy._`;

  const formattedTextTezotepecEstaPasando =
    `🚨 *Tezotepec esta pasando:*\r\n\r\n` +
    `- ${formatUnidadInfo2(ultimaUnidadTezotepec, "Tezotepec")}\r\n\r\n` +
    `*El se lleva:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(diferenciaTezotepec)} del ${formatUnidadInfo2(
      penultimaUnidadTezotepec,
      "Tezotepec"
    )}\r\n© _JoyBoy._`;

  const formattedTextTezotepecTeLlevas =
    `✅ *Tezotepec te llevas:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(diferenciaTezotepec)} del ${formatUnidadInfo2(
      penultimaUnidadTezotepec,
      "Tezotepec"
    )}\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      diferenciaRojaTezotepec
    )} del ${formatUnidadInfo2(
      penultimaUnidadRojaTezotepec,
      "Tezotepec"
    )}\r\n© _JoyBoy._`;

  const formattedTextTezotepecAtrasDeTi =
    `*Esta saliendo:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      diferenciaTezotepec
    )} atras de ti ${formatUnidadInfo2(
      ultimaUnidadTezotepec,
      "Tezotepec"
    )}\r\n© _JoyBoy._`;

  // COPY-PASTE CALICAPAN --  COPY-PASTE CALICAPAN --  COPY-PASTE CALICAPAN --  COPY-PASTE CALICAPAN --
  const formattedTextCalicapanAlMomento =
    `ℹ *Calicapan al momento:*\r\n\r\n` +
    `- ${formatUnidadInfo(
      tiempoTranscurridoCalicapan,
      ultimaUnidadCalicapan,
      "Calicapan"
    )}\r\n\r\n` +
    `- *El se llevo:* ${formatUnidadInfo(
      diferenciaCalicapan,
      penultimaUnidadCalicapan
    )}\r\n\r\n` +
    `- *Del rojo Calicapan hay:* ${formatUnidadInfo(
      tiempoTranscurridoRojaCalicapan,
      ultimaUnidadRojaCalicapan
    )}\r\n© _JoyBoy._`;

  const formattedTextCalicapanEstaPasando =
    `🚨 *Calicapan esta pasando:*\r\n\r\n` +
    `- ${formatUnidadInfo2(ultimaUnidadCalicapan, "Calicapan")}\r\n\r\n` +
    `*El se lleva:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(diferenciaCalicapan)} del ${formatUnidadInfo2(
      penultimaUnidadCalicapan,
      "Calicapan"
    )}\r\n© _JoyBoy._`;

  const formattedTextCalicapanTeLlevas =
    `✅ *Calicapan te llevas:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(diferenciaCalicapan)} del ${formatUnidadInfo2(
      penultimaUnidadCalicapan,
      "Calicapan"
    )}\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      diferenciaRojaCalicapan
    )} del ${formatUnidadInfo2(
      penultimaUnidadRojaCalicapan,
      "Calicapan"
    )}\r\n© _JoyBoy._`;

  const formattedTextCalicapanAtrasDeTi =
    `*Esta saliendo:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      diferenciaCalicapan
    )} atras de ti ${formatUnidadInfo2(
      ultimaUnidadCalicapan,
      "Calicapan"
    )}\r\n© _JoyBoy._`;

  // COPY-PASTE SOSA ESCUELA --  COPY-PASTE SOSA ESCUELA --  COPY-PASTE SOSA ESCUELA --  COPY-PASTE SOSA ESCUELA --
  const formattedTextSosaEscuelaAlMomento =
    `ℹ *Sosa Escuela al momento:*\r\n\r\n` +
    `- ${formatUnidadInfo(
      tiempoTranscurridoSosaEscuela,
      ultimaUnidadSosaEscuela,
      "Sosa Escuela"
    )}\r\n\r\n` +
    `- *El se llevo:* ${formatUnidadInfo(
      diferenciaSosaEscuela,
      penultimaUnidadSosaEscuela
    )}\r\n\r\n` +
    `- *Del rojo Sosa Escuela hay:* ${formatUnidadInfo(
      tiempoTranscurridoRojaSosaEscuela,
      ultimaUnidadRojaSosaEscuela
    )}\r\n© _JoyBoy._`;

  const formattedTextSosaEscuelaEstaPasando =
    `🚨 *Sosa Escuela esta pasando:*\r\n\r\n` +
    `- ${formatUnidadInfo2(ultimaUnidadSosaEscuela, "Sosa Escuela")}\r\n\r\n` +
    `*El se lleva:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      diferenciaSosaEscuela
    )} del ${formatUnidadInfo2(
      penultimaUnidadSosaEscuela,
      "Sosa Escuela"
    )}\r\n© _JoyBoy._`;

  const formattedTextSosaEscuelaTeLlevas =
    `✅ *Sosa Escuela te llevas:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      diferenciaSosaEscuela
    )} del ${formatUnidadInfo2(
      penultimaUnidadSosaEscuela,
      "Sosa Escuela"
    )}\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      diferenciaRojaSosaEscuela
    )} del ${formatUnidadInfo2(
      penultimaUnidadRojaSosaEscuela,
      "Sosa Escuela"
    )}\r\n© _JoyBoy._`;

  const formattedTextSosaEscuelaAtrasDeTi =
    `*Esta saliendo:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      diferenciaSosaEscuela
    )} atras de ti ${formatUnidadInfo2(
      ultimaUnidadSosaEscuela,
      "Sosa Escuela"
    )}\r\n© _JoyBoy._`;

  // COPY-PASTE SAN ISIDRO --  COPY-PASTE SAN ISIDRO --  COPY-PASTE SAN ISIDRO --  COPY-PASTE SAN ISIDRO --
  const formattedTextSanIsidroAlMomento =
    `ℹ *San Isidro al momento:*\r\n\r\n` +
    `- ${formatUnidadInfo(
      tiempoTranscurridoSanIsidro,
      ultimaUnidadSanIsidro,
      "San Isidro"
    )}\r\n\r\n` +
    `- *El se llevo:* ${formatUnidadInfo(
      diferenciaSanIsidro,
      penultimaUnidadSanIsidro
    )}\r\n\r\n` +
    `- *Del rojo San Isidro hay:* ${formatUnidadInfo(
      tiempoTranscurridoRojaSanIsidro,
      ultimaUnidadRojaSanIsidro
    )}\r\n© _JoyBoy._`;

  const formattedTextSanIsidroEstaPasando =
    `🚨 *San Isidro esta pasando:*\r\n\r\n` +
    `- ${formatUnidadInfo2(ultimaUnidadSanIsidro, "San Isidro")}\r\n\r\n` +
    `*El se lleva:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(diferenciaSanIsidro)} del ${formatUnidadInfo2(
      penultimaUnidadSanIsidro,
      "San Isidro"
    )}\r\n© _JoyBoy._`;

  const formattedTextSanIsidroTeLlevas =
    `✅ *San Isidro te llevas:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(diferenciaSanIsidro)} del ${formatUnidadInfo2(
      penultimaUnidadSanIsidro,
      "San Isidro"
    )}\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      diferenciaRojaSanIsidro
    )} del ${formatUnidadInfo2(
      penultimaUnidadRojaSanIsidro,
      "San Isidro"
    )}\r\n© _JoyBoy._`;

  const formattedTextSanIsidroAtrasDeTi =
    `*Esta saliendo:*\r\n\r\n` +
    `- ${formatoTiempoRedondeado(
      diferenciaSanIsidro
    )} atras de ti ${formatUnidadInfo2(
      ultimaUnidadSanIsidro,
      "San Isidro"
    )}\r\n© _JoyBoy._`;

  const graficoPorcentajeTalzintan = (() => {
    if (tiempoTranscurridoTalzintan <= 0) {
      return "/ 0%";
    } else if (tiempoTranscurridoTalzintan >= 300) {
      return "////////// 100%"; // 10 diagonales para 100%
    } else {
      const porcentajeCalculado =
        Math.ceil((tiempoTranscurridoTalzintan / 300) * 10) * 10; // Porcentaje múltiplo de 10
      const numeroDiagonales = porcentajeCalculado / 10; // Una diagonal por cada 10%
      return "/".repeat(numeroDiagonales) + ` ${porcentajeCalculado}%`;
    }
  })();

  const graficoPorcentajeTezotepec = (() => {
    if (tiempoTranscurridoTezotepec <= 0) {
      return "/ 0%";
    } else if (tiempoTranscurridoTezotepec >= 660) {
      return "////////// 100%"; // 10 diagonales para 100%
    } else {
      const porcentajeCalculado =
        Math.ceil((tiempoTranscurridoTezotepec / 660) * 10) * 10;
      const numeroDiagonales = porcentajeCalculado / 10;
      return "/".repeat(numeroDiagonales) + ` ${porcentajeCalculado}%`;
    }
  })();

  const graficoPorcentajeCalicapan = (() => {
    if (tiempoTranscurridoCalicapan <= 0) {
      return "/ 0%";
    } else if (tiempoTranscurridoCalicapan >= 660) {
      return "////////// 100%"; // 10 diagonales para 100%
    } else {
      const porcentajeCalculado =
        Math.ceil((tiempoTranscurridoCalicapan / 660) * 10) * 10;
      const numeroDiagonales = porcentajeCalculado / 10;
      return "/".repeat(numeroDiagonales) + ` ${porcentajeCalculado}%`;
    }
  })();

  const graficoPorcentajeSosaEscuela = (() => {
    if (tiempoTranscurridoSosaEscuela <= 0) {
      return "/ 0%";
    } else if (tiempoTranscurridoSosaEscuela >= 660) {
      return "////////// 100%"; // 10 diagonales para 100%
    } else {
      const porcentajeCalculado =
        Math.ceil((tiempoTranscurridoSosaEscuela / 660) * 10) * 10;
      const numeroDiagonales = porcentajeCalculado / 10;
      return "/".repeat(numeroDiagonales) + ` ${porcentajeCalculado}%`;
    }
  })();

  const graficoPorcentajeSanIsidro = (() => {
    if (tiempoTranscurridoSanIsidro <= 0) {
      return "/ 0%";
    } else if (tiempoTranscurridoSanIsidro >= 660) {
      return "////////// 100%"; // 10 diagonales para 100%
    } else {
      const porcentajeCalculado =
        Math.ceil((tiempoTranscurridoSanIsidro / 660) * 10) * 10;
      const numeroDiagonales = porcentajeCalculado / 10;
      return "/".repeat(numeroDiagonales) + ` ${porcentajeCalculado}%`;
    }
  })();

  const textToCopyAmotac = `🔔 *Probabilidades AMOTAC* 📊\r\n\r\n- Talzintan:   ${formatoTiempo(
    tiempoTranscurridoTalzintan
  )} ${graficoPorcentajeTalzintan}\r\n- Tezotepec: ${formatoTiempo(
    tiempoTranscurridoTezotepec
  )} ${graficoPorcentajeTezotepec}\r\n- Calicapan:  ${formatoTiempo(
    tiempoTranscurridoCalicapan
  )} ${graficoPorcentajeCalicapan}\r\n- Sosa Escu:  ${formatoTiempo(
    tiempoTranscurridoSosaEscuela
  )} ${graficoPorcentajeSosaEscuela}\r\n- San Isidro:  ${formatoTiempo(
    tiempoTranscurridoSanIsidro
  )} ${graficoPorcentajeSanIsidro}\r\n\r\n© _JoyBoy._`;

  const formatFechaActual = () => {
    const fecha = new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return fecha.charAt(0).toUpperCase() + fecha.slice(1); // Primera letra en mayúscula
  };

  const formatHoraActual = () => {
    return new Date().toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Formato 24 horas
    });
  };

  return (
    <div>
      {/*FORMULARIO FORMULARIO FORMULARIO FORMULARIO FORMULARIO FORMULARIO FORMULARIO FORMULARIO FORMULARIO*/}
      {isFormVisible && (
        <div>
          <div className="form-container">
            <ClockButton></ClockButton>
            <div className="ruta-display" style={{ backgroundColor: color }}>
              {ruta}
            </div>
            <form
              className="add-form"
              onSubmit={(e) => {
                e.preventDefault();
                agregarUnidad();
              }}
            >
              <div className="form-buttons">
                <label>
                  <input
                    className="styled-input"
                    type="text" // Cambiado de "number" a "text"
                    ref={inputRef}
                    value={numeroUnidad}
                    onChange={(e) => setNumeroUnidad(e.target.value)}
                    inputMode="numeric" // Esto sigue activando teclado numérico en móviles
                    pattern="[0-9.\-+]*" // Expresión regular para permitir números, punto, guion y más
                  />
                </label>
              </div>

              <div className="form-buttons">
                <button
                  className="save-button-rojo"
                  type="button"
                  onClick={() => {
                    handleAgregarTipo("rojo");
                    agregarElemento(nuevoElemento);
                  }}
                  disabled={[
                    "loma",
                    "tequimila",
                    "quinta",
                    "calanorte",
                    "pajaco",
                    "analco",
                    // "yopi",
                  ].includes(ruta)}
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
                  // disabled={["tacopan"].includes(ruta)}
                >
                  R-3
                </button>
              </div>

              <div className="hora-registro-container">
                <label></label>
                {isHoraVisible && (
                  <input
                    className="custom-datetime-input"
                    type="datetime-local"
                    value={convertToLocalDateTime(horaRegistro)}
                    onChange={(e) => setHoraRegistro(e.target.value)}
                    disabled={!isEditable}
                  />
                )}
                <button
                  className="boton-editar-hora"
                  type="button"
                  onClick={handleEditHora}
                >
                  Editar Hora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* FIN DE FORMULARIO PRINCIPAL  FIN DE FORMULARIO PRINCIPAL  FIN DE FORMULARIO PRINCIPAL */}

      {/* MENU COPY PASTE AL MOMENTO, ESTA PASANDO, TE LLENAS, ATRAS DE TI */}
      {menuVisibleTalzintan && (
        <div
          style={{
            position: "fixed", // Cambiado de "absolute" a "fixed"
            top: "10px", // Ajusta el margen desde la parte superior de la pantalla
            left: "10px", // Ajusta el margen desde el borde derecho de la pantalla
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            width: "200px",
            background: "#f9f9f9",
            zIndex: 1000, // Asegura que el menú esté sobre otros elementos
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para resaltar el menú
            color: "black",
          }}
        >
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 40 }}
          >
            <b>Talzintan</b>
            <li>
              <CopyToClipboard text={formattedTextTalzintanAlMomento}>
                <button
                  onClick={() => setMenuVisibleTalzintan(false)}
                  style={{ width: "100%", textAlign: "left" }}
                  className="al-momento"
                >
                  Al momento...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextTalzintanEstaPasando}>
                <button
                  onClick={() => setMenuVisibleTalzintan(false)}
                  className="esta-pasando"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Esta pasando...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextTalzintanTeLlevas}>
                <button
                  onClick={() => setMenuVisibleTalzintan(false)}
                  className="te-llevas"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Te llevas...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextTalzintanAtrasDeTi}>
                <button
                  onClick={() => setMenuVisibleTalzintan(false)}
                  className="atras-de-ti"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Atras de ti...
                </button>
              </CopyToClipboard>
            </li>
          </ul>
          <button
            className="cerrar-copy-paste"
            onClick={() => setMenuVisibleTalzintan(false)}
          >
            ❌ Cerrar
          </button>
        </div>
      )}

      {menuVisibleLoma && (
        <div
          style={{
            position: "fixed", // Cambiado de "absolute" a "fixed"
            top: "10px", // Ajusta el margen desde la parte superior de la pantalla
            left: "10px", // Ajusta el margen desde el borde derecho de la pantalla
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            width: "200px",
            background: "#f9f9f9",
            zIndex: 1000, // Asegura que el menú esté sobre otros elementos
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para resaltar el menú
            color: "black",
          }}
        >
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 40 }}
          >
            <b>Loma</b>
            <li>
              <CopyToClipboard text={formattedTextLomaEstaPasando}>
                <button
                  onClick={() => setMenuVisibleLoma(false)}
                  className="esta-pasando"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Esta pasando...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextLomaAtrasDeTi}>
                <button
                  onClick={() => setMenuVisibleLoma(false)}
                  className="atras-de-ti"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Atras de ti...
                </button>
              </CopyToClipboard>
            </li>
          </ul>
          <button
            className="cerrar-copy-paste"
            onClick={() => setMenuVisibleLoma(false)}
          >
            ❌ Cerrar
          </button>
        </div>
      )}

      {menuVisibleTezotepec && (
        <div
          style={{
            position: "fixed", // Cambiado de "absolute" a "fixed"
            top: "10px", // Ajusta el margen desde la parte superior de la pantalla
            left: "10px", // Ajusta el margen desde el borde derecho de la pantalla
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            width: "200px",
            background: "#f9f9f9",
            zIndex: 1000, // Asegura que el menú esté sobre otros elementos
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para resaltar el menú
            color: "black",
          }}
        >
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 40 }}
          >
            <b>Tezotepec</b>
            <li>
              <CopyToClipboard text={formattedTextTezotepecAlMomento}>
                <button
                  onClick={() => setMenuVisibleTezotepec(false)}
                  style={{ width: "100%", textAlign: "left" }}
                  className="al-momento"
                >
                  Al momento...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextTezotepecEstaPasando}>
                <button
                  onClick={() => setMenuVisibleTezotepec(false)}
                  className="esta-pasando"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Esta pasando...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextTezotepecTeLlevas}>
                <button
                  onClick={() => setMenuVisibleTezotepec(false)}
                  className="te-llevas"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Te llevas...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextTezotepecAtrasDeTi}>
                <button
                  onClick={() => setMenuVisibleTezotepec(false)}
                  className="atras-de-ti"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Atras de ti...
                </button>
              </CopyToClipboard>
            </li>
          </ul>
          <button
            className="cerrar-copy-paste"
            onClick={() => setMenuVisibleTezotepec(false)}
          >
            ❌ Cerrar
          </button>
        </div>
      )}

      {menuVisibleCalicapan && (
        <div
          style={{
            position: "fixed", // Cambiado de "absolute" a "fixed"
            top: "10px", // Ajusta el margen desde la parte superior de la pantalla
            left: "10px", // Ajusta el margen desde el borde derecho de la pantalla
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            width: "200px",
            background: "#f9f9f9",
            zIndex: 1000, // Asegura que el menú esté sobre otros elementos
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para resaltar el menú
            color: "black",
          }}
        >
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 40 }}
          >
            <b>Calicapan</b>
            <li>
              <CopyToClipboard text={formattedTextCalicapanAlMomento}>
                <button
                  onClick={() => setMenuVisibleCalicapan(false)}
                  style={{ width: "100%", textAlign: "left" }}
                  className="al-momento"
                >
                  Al momento...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextCalicapanEstaPasando}>
                <button
                  onClick={() => setMenuVisibleCalicapan(false)}
                  className="esta-pasando"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Esta pasando...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextCalicapanTeLlevas}>
                <button
                  onClick={() => setMenuVisibleCalicapan(false)}
                  className="te-llevas"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Te llevas...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextCalicapanAtrasDeTi}>
                <button
                  onClick={() => setMenuVisibleCalicapan(false)}
                  className="atras-de-ti"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Atras de ti...
                </button>
              </CopyToClipboard>
            </li>
          </ul>
          <button
            className="cerrar-copy-paste"
            onClick={() => setMenuVisibleCalicapan(false)}
          >
            ❌ Cerrar
          </button>
        </div>
      )}

      {menuVisibleSosaEscuela && (
        <div
          style={{
            position: "fixed", // Cambiado de "absolute" a "fixed"
            top: "10px", // Ajusta el margen desde la parte superior de la pantalla
            left: "10px", // Ajusta el margen desde el borde derecho de la pantalla
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            width: "200px",
            background: "#f9f9f9",
            zIndex: 1000, // Asegura que el menú esté sobre otros elementos
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para resaltar el menú
            color: "black",
          }}
        >
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 40 }}
          >
            <b>Sosa Escuela</b>
            <li>
              <CopyToClipboard text={formattedTextSosaEscuelaAlMomento}>
                <button
                  onClick={() => setMenuVisibleSosaEscuela(false)}
                  style={{ width: "100%", textAlign: "left" }}
                  className="al-momento"
                >
                  Al momento...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextSosaEscuelaEstaPasando}>
                <button
                  onClick={() => setMenuVisibleSosaEscuela(false)}
                  className="esta-pasando"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Esta pasando...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextSosaEscuelaTeLlevas}>
                <button
                  onClick={() => setMenuVisibleSosaEscuela(false)}
                  className="te-llevas"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Te llevas...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextSosaEscuelaAtrasDeTi}>
                <button
                  onClick={() => setMenuVisibleSosaEscuela(false)}
                  className="atras-de-ti"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Atras de ti...
                </button>
              </CopyToClipboard>
            </li>
          </ul>
          <button
            className="cerrar-copy-paste"
            onClick={() => setMenuVisibleSosaEscuela(false)}
          >
            ❌ Cerrar
          </button>
        </div>
      )}

      {menuVisibleSanIsidro && (
        <div
          style={{
            position: "fixed", // Cambiado de "absolute" a "fixed"
            top: "10px", // Ajusta el margen desde la parte superior de la pantalla
            left: "10px", // Ajusta el margen desde el borde derecho de la pantalla
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            width: "200px",
            background: "#f9f9f9",
            zIndex: 1000, // Asegura que el menú esté sobre otros elementos
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para resaltar el menú
            color: "black",
          }}
        >
          <ul
            style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 40 }}
          >
            <b>San Isidro</b>
            <li>
              <CopyToClipboard text={formattedTextSanIsidroAlMomento}>
                <button
                  onClick={() => setMenuVisibleSanIsidro(false)}
                  style={{ width: "100%", textAlign: "left" }}
                  className="al-momento"
                >
                  Al momento...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextSanIsidroEstaPasando}>
                <button
                  onClick={() => setMenuVisibleSanIsidro(false)}
                  className="esta-pasando"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Esta pasando...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextSanIsidroTeLlevas}>
                <button
                  onClick={() => setMenuVisibleSanIsidro(false)}
                  className="te-llevas"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Te llevas...
                </button>
              </CopyToClipboard>
            </li>
            <li>
              <CopyToClipboard text={formattedTextSanIsidroAtrasDeTi}>
                <button
                  onClick={() => setMenuVisibleSanIsidro(false)}
                  className="atras-de-ti"
                  style={{ width: "100%", textAlign: "left" }}
                >
                  Atras de ti...
                </button>
              </CopyToClipboard>
            </li>
          </ul>
          <button
            className="cerrar-copy-paste"
            onClick={() => setMenuVisibleSanIsidro(false)}
          >
            ❌ Cerrar
          </button>
        </div>
      )}

      {/* tabla rutas tabla rutas tabla rutas tabla rutas tabla rutas tabla rutas tabla rutas tabla rutas tabla rutas */}
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <CopyToClipboard text={textToCopyAmotac}>
                <button className="amotac">Amotac</button>
              </CopyToClipboard>
            </td>
            <td>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <button
                  onClick={limpiarPila}
                  style={{
                    marginTop: 20,
                    backgroundColor: "red",
                    color: "#fff",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: 6,
                  }}
                >
                  Limpiar
                </button>
                {pila.map((el, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: obtenerColor(el),
                      color: "#fff",
                      padding: "1px 4px",
                      minWidth: "30px",
                      textAlign: "center",
                    }}
                    title={el}
                  >
                    {el.slice(0, 2)}
                  </div>
                ))}
              </div>
            </td>
          </tr>

          {/*FILA TALZINTAN  FILA TALZINTAN  FILA TALZINTAN  FILA TALZINTAN  FILA TALZINTAN  FILA TALZINTAN  */}
          <tr>
            <td></td>
            <td className="celda-talzintan">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("talzintan");
                  setColor("#58ff66");
                  setNuevoElemento("talzintan");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoTalzintan)}
              </button>
              <br></br> <span className="texto-chico-negro">Talzintan</span>
            </td>
            {ultimaUnidadTalzintan && (
              <td className="celda-talzintan">
                <button
                  onClick={() => setMenuVisibleTalzintan(!menuVisibleTalzintan)}
                  className={`${
                    ultimaUnidadTalzintan.tipo === "blanco"
                      ? "white-bg"
                      : "red-bg"
                  }`}
                >
                  {ultimaUnidadTalzintan.numeroUnidad}
                </button>

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
                      onClick={handleObtenerUnidadesTalzintan}
                    >
                      {penultimaUnidadTalzintan.numeroUnidad}
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="numeric-input"
                    />
                    <BotonEliminarUnidad ruta="talzintan" />
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
            <td className="celda-talzintan">
              <div>
                {unidadesLoma.length > 0 ? (
                  unidadesLoma.map((u) => (
                    <div
                      key={u.id}
                      style={{
                        marginBottom: -5, // separación entre elementos
                        color: "#333", // color del texto
                        fontSize: 16, // tamaño de fuente en px
                      }}
                    >
                      <span style={{ fontWeight: "bold", marginRight: 8 }}>
                        {u.numeroUnidad}
                      </span>
                      <span>
                        {formatHoraRegistro(add70Minutes(u.horaRegistro))}
                      </span>
                    </div>
                  ))
                ) : (
                  <div style={{ color: "gray", fontStyle: "italic" }}>
                    JoyBoy
                  </div>
                )}
              </div>
            </td>
          </tr>

          {/*FILA LOMA  FILA LOMA  FILA LOMA  FILA LOMA  FILA LOMA  FILA LOMA  FILA LOMA  FILA LOMA   */}
          <tr>
            <td></td>
            <td className="celda-loma">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("loma");
                  setColor("#adf7b3");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoLoma)}
              </button>
              <br></br> <span className="texto-chico-negro">Loma</span>
            </td>
            {ultimaUnidadLoma && (
              <td className="celda-loma">
                {" "}
                <button
                  onClick={() => setMenuVisibleLoma(!menuVisibleLoma)}
                  className={`${
                    ultimaUnidadLoma.tipo === "blanco" ? "white-bg" : "red-bg"
                  }`}
                >
                  {ultimaUnidadLoma.numeroUnidad}
                </button>{" "}
                {penultimaUnidadLoma && (
                  <>
                    <button className="button-se-lleva-loma">
                      {formatoTiempo(diferenciaLoma)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadLoma.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesLoma}
                    >
                      {penultimaUnidadLoma.numeroUnidad}
                    </button>
                  </>
                )}
                <BotonEliminarUnidad ruta="loma" />
              </td>
            )}
            <td className="celda-loma">
              <div>
                {unidadesTalzintan.length > 0 ? (
                  unidadesTalzintan.map((u) => (
                    <div
                      key={u.id}
                      style={{
                        marginBottom: -5, // separación entre elementos
                        color: "#333", // color del texto
                        fontSize: 16, // tamaño de fuente en px
                      }}
                    >
                      <span style={{ fontWeight: "bold", marginRight: 8 }}>
                        {u.numeroUnidad}
                      </span>
                      <span>
                        {formatHoraRegistro(add70Minutes(u.horaRegistro))}
                      </span>
                    </div>
                  ))
                ) : (
                  <div
                    style={{ color: "gray", fontStyle: "italic", fontSize: 16 }}
                  >
                    JoyBoy
                  </div>
                )}
              </div>
            </td>
          </tr>

          {/*FILA TEZOTEPEC  FILA TEZOTEPEC  FILA TEZOTEPEC  FILA TEZOTEPEC  FILA TEZOTEPEC  FILA TEZOTEPEC  */}
          <tr>
            <td></td>
            <td className="celda-tezotepec">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("tezotepec");
                  setColor("#eb9d36");
                  setNuevoElemento("tezotepec");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoTezotepec)}
              </button>
              <br></br> <span className="texto-chico">Tezotepec</span>
            </td>
            {ultimaUnidadTezotepec && (
              <td className="celda-tezotepec">
                <button
                  onClick={() => setMenuVisibleTezotepec(!menuVisibleLoma)}
                  className={`${
                    ultimaUnidadTezotepec.tipo === "blanco"
                      ? "white-bg"
                      : "red-bg"
                  }`}
                >
                  {ultimaUnidadTezotepec.numeroUnidad}
                </button>
                {penultimaUnidadTezotepec && (
                  <>
                    <button
                      className="button-se-lleva-tezotepec"
                      onClick={handleObtenerUnidadesTezotepecBlancas}
                    >
                      {formatoTiempo(diferenciaTezotepec)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadTezotepec.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesTezotepec}
                    >
                      {penultimaUnidadTezotepec.numeroUnidad}
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="numeric-input"
                    />
                    <BotonEliminarUnidad ruta="tezotepec" />
                    <br></br>
                    {ultimaUnidadRojaTezotepec && (
                      <>
                        <div className="rojo-texto">
                          {formatoTiempo(tiempoTranscurridoRojaTezotepec)}
                        </div>
                        <div className="rojo-rojo">
                          {ultimaUnidadRojaTezotepec.numeroUnidad}
                        </div>
                        {penultimaUnidadRojaTezotepec && (
                          <>
                            <div className="rojo-texto">
                              {formatoTiempo(diferenciaRojaTezotepec)}
                            </div>

                            <div className="rojo-rojo">
                              {penultimaUnidadRojaTezotepec.numeroUnidad}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </td>
            )}
            <td className="celda-tezotepec">
              <div>
                {unidadesTezotepec.length > 0 ? (
                  unidadesTezotepec.map((u, index) => (
                    <div
                      key={u.id}
                      style={{
                        fontSize: 16,
                        marginBottom: -5,
                        fontWeight: index === 0 ? "bold" : "normal",
                        color: index === 0 ? "#0070f3" : "inherit", // color destacado para el primero
                      }}
                    >
                      {u.numeroUnidad}{" "}
                      {formatHoraRegistro(add75Minutes(u.horaRegistro))}
                    </div>
                  ))
                ) : (
                  <div style={{ color: "gray", fontStyle: "italic" }}>
                    JoyBoy
                  </div>
                )}
              </div>
            </td>
            <td className="celda-tezotepec">
              <div>
                {unidadesTezotepecReverse.length > 0 ? (
                  unidadesTezotepecReverse.map((u, index) => (
                    <div
                      key={u.id}
                      style={{
                        fontSize: 16,
                        marginBottom: -5,
                        fontWeight:
                          index === unidadesTezotepecReverse.length - 1
                            ? "bold"
                            : "normal",
                        color:
                          index === unidadesTezotepecReverse.length - 1
                            ? "#0070f3"
                            : "inherit",
                      }}
                    >
                      {u.numeroUnidad}{" "}
                      {formatHoraRegistro(add75Minutes(u.horaRegistro))}
                    </div>
                  ))
                ) : (
                  <div style={{ color: "gray", fontStyle: "italic" }}>
                    JoyBoy
                  </div>
                )}
              </div>
            </td>
          </tr>

          {/*FILA CALICAPAN FILA CALICAPAN FILA CALICAPAN FILA CALICAPAN FILA CALICAPAN FILA CALICAPAN FILA CALICAPAN*/}
          <tr>
            <td></td>
            <td className="celda-calicapan">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("calicapan");
                  setColor("#00c3ff");
                  setNuevoElemento("calicapan");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoCalicapan)}
              </button>
              <br></br> <span className="texto-chico">Calicapan</span>
            </td>
            {ultimaUnidadCalicapan && (
              <td className="celda-calicapan">
                <button
                  onClick={() => setMenuVisibleCalicapan(!menuVisibleCalicapan)}
                  className={`${
                    ultimaUnidadCalicapan.tipo === "blanco"
                      ? "white-bg"
                      : "red-bg"
                  }`}
                >
                  {ultimaUnidadCalicapan.numeroUnidad}
                </button>
                {penultimaUnidadCalicapan && (
                  <>
                    <button className="button-se-lleva-calicapan">
                      {formatoTiempo(diferenciaCalicapan)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadCalicapan.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesCalicapan}
                    >
                      {penultimaUnidadCalicapan.numeroUnidad}
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="numeric-input"
                    />
                    <BotonEliminarUnidad ruta="calicapan" />
                    <br></br>
                    {ultimaUnidadRojaCalicapan && (
                      <>
                        <div className="rojo-texto">
                          {formatoTiempo(tiempoTranscurridoRojaCalicapan)}
                        </div>
                        <div className="rojo-rojo">
                          {ultimaUnidadRojaCalicapan.numeroUnidad}
                        </div>
                        {penultimaUnidadRojaCalicapan && (
                          <>
                            <div className="rojo-texto">
                              {formatoTiempo(diferenciaRojaCalicapan)}
                            </div>

                            <div className="rojo-rojo">
                              {penultimaUnidadRojaCalicapan.numeroUnidad}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </td>
            )}
            <td className="celda-calicapan">
              <div>
                {unidades.length > 0 &&
                  unidades.map((u, index) => (
                    <div
                      key={u.id}
                      style={{
                        fontSize: 16,
                        marginBottom: -5,
                        fontWeight: index === 0 ? "bold" : "normal",
                        color: index === 0 ? "#0051ff" : "inherit", // color destacado para el primero
                        textShadow:
                          index === 0
                            ? "1px 1px 2px white"
                            : "0px 0px 0px white",
                      }}
                    >
                      {u.numeroUnidad}{" "}
                      {formatHoraRegistro(add46Minutes(u.horaRegistro))}
                    </div>
                  ))}
              </div>
            </td>
            <td className="celda-calicapan">
              <div
                style={{
                  fontSize: "0.75rem",
                  lineHeight: "1.2",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                }}
              >
                {numerosTequimila
                  .slice(-6, -2) // 🔹 Excluye los dos últimos, muestra los 4 anteriores
                  .reverse()
                  .map((unidad, index) => (
                    <div key={index}>
                      {unidad.numeroUnidad} -{" "}
                      {formatHoraRegistro(add46Minutes(unidad.horaRegistro))}
                    </div>
                  ))}
              </div>
            </td>
          </tr>

          {/*FILA SOSA ESCUELA  FILA SOSA ESCUELA  FILA SOSA ESCUELA  FILA SOSA ESCUELA  FILA SOSA ESCUELA  */}
          <tr>
            <td></td>
            <td className="celda-sosa">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("sosa escuela");
                  setColor("#ea00ff");
                  setNuevoElemento("sosa");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoSosaEscuela)}
              </button>
              <br></br> <span className="texto-chico">Sosa</span>
            </td>
            {ultimaUnidadSosaEscuela && (
              <td className="celda-sosa">
                <button
                  onClick={() =>
                    setMenuVisibleSosaEscuela(!menuVisibleSosaEscuela)
                  }
                  className={`${
                    ultimaUnidadSosaEscuela.tipo === "blanco"
                      ? "white-bg"
                      : "red-bg"
                  }`}
                >
                  {ultimaUnidadSosaEscuela.numeroUnidad}
                </button>
                {penultimaUnidadSosaEscuela && (
                  <>
                    <button
                      className="button-se-lleva-sosa"
                      onClick={handleObtenerUnidadesSosaBlancas}
                    >
                      {formatoTiempo(diferenciaSosaEscuela)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadSosaEscuela.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesSosa}
                    >
                      {penultimaUnidadSosaEscuela.numeroUnidad}
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="numeric-input"
                    />
                    <BotonEliminarUnidad ruta="sosa escuela" />
                    <br></br>
                    {ultimaUnidadRojaSosaEscuela && (
                      <>
                        <div className="rojo-texto">
                          {formatoTiempo(tiempoTranscurridoRojaSosaEscuela)}
                        </div>
                        <div className="rojo-rojo">
                          {ultimaUnidadRojaSosaEscuela.numeroUnidad}
                        </div>
                        {penultimaUnidadRojaSosaEscuela && (
                          <>
                            <div className="rojo-texto">
                              {formatoTiempo(diferenciaRojaSosaEscuela)}
                            </div>

                            <div className="rojo-rojo">
                              {penultimaUnidadRojaSosaEscuela.numeroUnidad}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </td>
            )}
            <td className="celda-sosa">
              <div>
                {unidadesSosa.length > 0 &&
                  unidadesSosa.map((u) => (
                    <div key={u.id} style={{ fontSize: 16, marginBottom: -5 }}>
                      <span style={{ fontWeight: "bold", marginRight: 8 }}>
                        {u.numeroUnidad}
                      </span>
                      <span>
                        {formatHoraRegistro(add80Minutes(u.horaRegistro))}
                      </span>
                    </div>
                  ))}
              </div>
            </td>
            <td className="celda-sosa">
              {ultimasTacopan.length > 0 &&
                ultimasTacopan.map((u) => (
                  <div
                    key={u.id}
                    style={{
                      marginTop: 0,
                      fontWeight: "bold",
                      color: "yellow",
                      textShadow: "1px 1px 2px black",
                    }}
                  >
                    {u.numeroUnidad}
                    {" / "}
                    {formatHoraRegistro(add70Minutes(u.horaRegistro))}
                  </div>
                ))}
            </td>
          </tr>

          {/*FILA SAN ISIDRO  FILA SAN ISIDRO  FILA SAN ISIDRO  FILA SAN ISIDRO  FILA SAN ISIDRO    */}
          <tr>
            <td></td>
            <td className="celda-sanisidro">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("san isidro");
                  setColor("#9c9c9c");
                  setNuevoElemento("sani");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoSanIsidro)}
              </button>
              <br></br> <span className="texto-chico">San Isidro</span>
            </td>
            {ultimaUnidadSanIsidro && (
              <td className="celda-sanisidro">
                <button
                  onClick={() => setMenuVisibleSanIsidro(!menuVisibleSanIsidro)}
                  className={`${
                    ultimaUnidadSanIsidro.tipo === "blanco"
                      ? "white-bg"
                      : "red-bg"
                  }`}
                >
                  {ultimaUnidadSanIsidro.numeroUnidad}
                </button>
                {penultimaUnidadSanIsidro && (
                  <>
                    <button
                      className="button-se-lleva-sanisidro"
                      onClick={handleObtenerUnidadesSanisidroBlancas}
                    >
                      {formatoTiempo(diferenciaSanIsidro)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadSanIsidro.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesSanisidro}
                    >
                      {penultimaUnidadSanIsidro.numeroUnidad}
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="numeric-input"
                    />
                    <BotonEliminarUnidad ruta="san isidro" />
                    <br></br>
                    {ultimaUnidadRojaSanIsidro && (
                      <>
                        <div className="rojo-texto">
                          {formatoTiempo(tiempoTranscurridoRojaSanIsidro)}
                        </div>
                        <div className="rojo-rojo">
                          {ultimaUnidadRojaSanIsidro.numeroUnidad}
                        </div>
                        {penultimaUnidadRojaSanIsidro && (
                          <>
                            <div className="rojo-texto">
                              {formatoTiempo(diferenciaRojaSanIsidro)}
                            </div>

                            <div className="rojo-rojo">
                              {penultimaUnidadRojaSanIsidro.numeroUnidad}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </td>
            )}
            <td className="celda-sanisidro">
              <div>
                {unidadesSanIsidro.length > 0 &&
                  unidadesSanIsidro.map((u, index) => (
                    <div
                      key={u.id}
                      style={{
                        fontSize: 16,
                        marginBottom: -5,
                        fontWeight: index === 0 ? "bold" : "normal",
                        color: index === 0 ? "black" : "inherit", // color destacado para el primero
                        textShadow:
                          index === 0
                            ? "1px 1px 2px white"
                            : "0px 0px 0px white",
                      }}
                    >
                      {u.numeroUnidad}
                      {" / "}
                      {formatHoraRegistro(add80Minutes(u.horaRegistro))}
                    </div>
                  ))}
              </div>
            </td>
          </tr>

          {/*FILA TACOPAN  FILA TACOPAN  FILA TACOPAN  FILA TACOPAN  FILA TACOPAN  FILA TACOPAN  */}
          <tr>
            <td></td>
            <td className="celda-tacopan">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("tacopan");
                  setColor("#fffb00");
                  setNuevoElemento("tacopan");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoTacopan)}
              </button>
              <br></br> <span className="texto-chico">Tacopan</span>
            </td>
            {ultimaUnidadTacopan && (
              <td className="celda-tacopan">
                <CopyToClipboard text={formattedTextTacopanAlMomento}>
                  <button
                    className={`${
                      ultimaUnidadTacopan.tipo === "blanco"
                        ? "white-bg"
                        : "red-bg"
                    }`}
                  >
                    {ultimaUnidadTacopan.numeroUnidad}
                  </button>
                </CopyToClipboard>
                {penultimaUnidadTacopan && (
                  <>
                    <CopyToClipboard text={formattedTextTacopanTeLlevas}>
                      <button className="button-se-lleva-tacopan">
                        {formatoTiempo(diferenciaTacopan)}
                      </button>
                    </CopyToClipboard>
                    <button
                      className={`${
                        penultimaUnidadTacopan.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesTacopan}
                    >
                      {penultimaUnidadTacopan.numeroUnidad}
                    </button>
                    <input
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className="numeric-input"
                    />
                    <BotonEliminarUnidad ruta="tacopan" />
                    <br></br>
                    {ultimaUnidadRojaTacopan && (
                      <>
                        <div className="rojo-texto">
                          {formatoTiempo(tiempoTranscurridoRojaTacopan)}
                        </div>
                        <div className="rojo-rojo">
                          {ultimaUnidadRojaTacopan.numeroUnidad}
                        </div>
                        {penultimaUnidadRojaTacopan && (
                          <>
                            <div className="rojo-texto">
                              {formatoTiempo(diferenciaRojaTacopan)}
                            </div>

                            <div className="rojo-rojo">
                              {penultimaUnidadRojaTacopan.numeroUnidad}
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

          {/*FILA TEQUIMILA  FILA TEQUIMILA  FILA TEQUIMILA  FILA TEQUIMILA  FILA TEQUIMILA  */}
          <tr>
            <td></td>
            <td className="celda-tequimila">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("tequimila");
                  setColor("#a6ff00");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoTequimila)}
              </button>
              <br></br> <span className="texto-chico">Tequimila</span>
            </td>
            {ultimaUnidadTequimila && (
              <td className="celda-tequimila">
                {" "}
                <button
                  className={`${
                    ultimaUnidadTequimila.tipo === "blanco"
                      ? "white-bg"
                      : "red-bg"
                  }`}
                >
                  {ultimaUnidadTequimila.numeroUnidad}
                </button>{" "}
                {penultimaUnidadTequimila && (
                  <>
                    <button className="button-se-lleva-tequimila">
                      {formatoTiempo(diferenciaTequimila)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadTequimila.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesTequimila}
                    >
                      {penultimaUnidadTequimila.numeroUnidad}
                    </button>
                  </>
                )}
                <BotonEliminarUnidad ruta="tequimila" />
              </td>
            )}
            <td className="celda-tequimila">
              <div>
                {unidadesQuinta.length > 0 &&
                  unidadesQuinta.map((u, index) => (
                    <div
                      key={u.id}
                      style={{
                        fontSize: 16,
                        marginBottom: -5,
                        fontWeight: index === 0 ? "bold" : "normal",
                        color: index === 0 ? "#0051ff" : "inherit", // color destacado para el primero
                        textShadow:
                          index === 0
                            ? "1px 1px 2px white"
                            : "0px 0px 0px white",
                      }}
                    >
                      {u.numeroUnidad}{" "}
                      {formatHoraRegistro(add46Minutes(u.horaRegistro))}
                    </div>
                  ))}
              </div>
            </td>
          </tr>

          {/*FILA QUINTA  FILA QUINTA  FILA QUINTA  FILA QUINTA  FILA QUINTA  FILA QUINTA  */}
          <tr>
            <td></td>
            <td className="celda-quinta-modificada">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("quinta");
                  setColor("#6ca700");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoQuinta)}
              </button>
              <br></br> <span className="texto-chico">Seccion 5ta</span>
            </td>
            {ultimaUnidadQuinta && (
              <td className="celda-quinta">
                {" "}
                <button
                  className={`${
                    ultimaUnidadQuinta.tipo === "blanco" ? "white-bg" : "red-bg"
                  }`}
                >
                  {ultimaUnidadQuinta.numeroUnidad}
                </button>{" "}
                {penultimaUnidadQuinta && (
                  <>
                    <button className="button-se-lleva-quinta">
                      {formatoTiempo(diferenciaQuinta)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadQuinta.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesQuinta}
                    >
                      {penultimaUnidadQuinta.numeroUnidad}
                    </button>
                  </>
                )}
                <BotonEliminarUnidad ruta="quinta" />
              </td>
            )}
            <td className="celda-quinta">
              <div>
                {unidadesCalicapan.length > 0 ? (
                  unidadesCalicapan.map((u, index) => (
                    <div
                      key={u.id}
                      style={{
                        fontSize: 16,
                        marginBottom: -5,
                        fontWeight: index === 0 ? "bold" : "normal",
                        color: index === 0 ? "black" : "inherit", // color destacado para el primero
                        textShadow:
                          index === 0
                            ? "1px 1px 2px white"
                            : "0px 0px 0px white",
                      }}
                    >
                      {u.numeroUnidad}{" "}
                      {formatHoraRegistro(add80Minutes(u.horaRegistro))}
                    </div>
                  ))
                ) : (
                  <div style={{ color: "gray", fontStyle: "italic" }}>
                    JoyBoy
                  </div>
                )}
              </div>
            </td>
          </tr>

          {/*FILA CALANORTE  FILA CALANORTE  FILA CALANORTE  FILA CALANORTE  FILA CALANORTE    */}
          <tr>
            <td></td>
            <td className="celda-calanorte">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("calanorte");
                  setColor("#006100");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoCalanorte)}
              </button>
              <br></br> <span className="texto-chico">Calanorte</span>
            </td>
            {ultimaUnidadCalanorte && (
              <td className="celda-calanorte">
                {" "}
                <button
                  className={`${
                    ultimaUnidadCalanorte.tipo === "blanco"
                      ? "white-bg"
                      : "red-bg"
                  }`}
                >
                  {ultimaUnidadCalanorte.numeroUnidad}
                </button>{" "}
                {penultimaUnidadCalanorte && (
                  <>
                    <button className="button-se-lleva-calanorte">
                      {formatoTiempo(diferenciaCalanorte)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadCalanorte.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesCalanorte}
                    >
                      {penultimaUnidadCalanorte.numeroUnidad}
                    </button>
                  </>
                )}
                <BotonEliminarUnidad ruta="calanorte" />
              </td>
            )}
          </tr>

          {/*FILA PAJACO  FILA PAJACO  FILA PAJACO  FILA PAJACO  FILA PAJACO  FILA PAJACO  */}
          <tr>
            <td></td>
            <td className="celda-pajaco">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("pajaco");
                  setColor("#ff0000");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoPajaco)}
              </button>
              <br></br> <span className="texto-chico">Pajaco</span>
            </td>
            {ultimaUnidadPajaco && (
              <td className="celda-pajaco">
                {" "}
                <button
                  className={`${
                    ultimaUnidadPajaco.tipo === "blanco" ? "white-bg" : "red-bg"
                  }`}
                >
                  {ultimaUnidadPajaco.numeroUnidad}
                </button>{" "}
                {penultimaUnidadPajaco && (
                  <>
                    <button className="button-se-lleva-pajaco">
                      {formatoTiempo(diferenciaPajaco)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadPajaco.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesPajaco}
                    >
                      {penultimaUnidadPajaco.numeroUnidad}
                    </button>
                  </>
                )}
                <BotonEliminarUnidad ruta="pajaco" />
              </td>
            )}
          </tr>

          {/*FILA ANALCO  FILA ANALCO  FILA ANALCO  FILA ANALCO  FILA ANALCO  FILA ANALCO  */}
          <tr>
            <td></td>
            <td className="celda-analco">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("analco");
                  setColor("#0051ff");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoAnalco)}
              </button>
              <br></br> <span className="texto-chico">Analco</span>
            </td>
            {ultimaUnidadAnalco && (
              <td className="celda-analco">
                {" "}
                <button
                  className={`${
                    ultimaUnidadAnalco.tipo === "blanco" ? "white-bg" : "red-bg"
                  }`}
                >
                  {ultimaUnidadAnalco.numeroUnidad}
                </button>{" "}
                {penultimaUnidadAnalco && (
                  <>
                    <button className="button-se-lleva-analco">
                      {formatoTiempo(diferenciaAnalco)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadAnalco.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesAnalco}
                    >
                      {penultimaUnidadAnalco.numeroUnidad}
                    </button>
                  </>
                )}
                <BotonEliminarUnidad ruta="analco" />
              </td>
            )}
          </tr>

          {/*FILA YOPI  FILA YOPI  FILA YOPI  FILA YOPI  FILA YOPI  FILA YOPI  FILA YOPI  */}
          <tr>
            <td></td>
            <td className="celda-yopi">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("yopi");
                  setColor("#9350ff");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoYopi)}
              </button>
              <br></br> <span className="texto-chico">Yopi / Yopi E.</span>
            </td>
            {ultimaUnidadYopi && (
              <td className="celda-yopi">
                {" "}
                <button
                  className={`${
                    ultimaUnidadYopi.tipo === "blanco" ? "white-bg" : "red-bg"
                  }`}
                >
                  {ultimaUnidadYopi.numeroUnidad}
                </button>{" "}
                {penultimaUnidadYopi && (
                  <>
                    <button className="button-se-lleva-yopi">
                      {formatoTiempo(diferenciaYopi)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadYopi.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesYopi}
                    >
                      {penultimaUnidadYopi.numeroUnidad}
                    </button>
                  </>
                )}
                <BotonEliminarUnidad ruta="yopi" />
              </td>
            )}
          </tr>

          {/*FILA OTRA  FILA OTRA  FILA OTRA  FILA OTRA  FILA OTRA  FILA OTRA  FILA OTRA  */}
          <tr>
            <td></td>
            <td className="celda-otra">
              <button
                className="boton-cronometro"
                onClick={() => {
                  setRuta("otra");
                  setColor("#ffffff");
                  setFormVisible(true);
                }}
              >
                {formatoTiempo(tiempoTranscurridoOtra)}
              </button>
              <br></br> <span className="texto-chico">Otra</span>
            </td>
            {ultimaUnidadOtra && (
              <td className="celda-otra">
                {" "}
                <button
                  className={`${
                    ultimaUnidadOtra.tipo === "blanco" ? "white-bg" : "red-bg"
                  }`}
                >
                  {ultimaUnidadOtra.numeroUnidad}
                </button>{" "}
                {penultimaUnidadOtra && (
                  <>
                    <button className="button-se-lleva-otra">
                      {formatoTiempo(diferenciaOtra)}
                    </button>
                    <button
                      className={`${
                        penultimaUnidadOtra.tipo === "blanco"
                          ? "white-bg"
                          : "red-bg"
                      }`}
                      onClick={handleObtenerUnidadesOtra}
                    >
                      {penultimaUnidadOtra.numeroUnidad}
                    </button>
                  </>
                )}
                <BotonEliminarUnidad ruta="otra" />
              </td>
            )}
          </tr>
        </tbody>
      </table>
      <div>
        {mostrarListaTalzintan && (
          <div className="floating-list-talzintan">
            <button
              className="close-button-talzintan"
              onClick={handleCloseListaTalzintan}
            >
              ❌ Cerrar Talzintan
            </button>
            <table className="lista-talzintan" ref={tablaTalzintanRef}>
              <thead>
                <tr>
                  <th colSpan={8}>Informe: Talzintan</th>
                </tr>
              </thead>
              <tbody>
                {/* Fila con fecha y hora */}
                <tr>
                  <td colSpan={8} className="celda-fecha-informe">
                    {formatFechaActual()} - {formatHoraActual()}
                  </td>
                </tr>

                {/* Dividimos la lista en dos mitades */}
                {Array.from({
                  length: Math.ceil(numerosTalzintan.length / 2),
                }).map((_, index) => {
                  const leftItem = numerosTalzintan[index]; // Primera mitad
                  const rightItem =
                    numerosTalzintan[
                      index + Math.ceil(numerosTalzintan.length / 2)
                    ]; // Segunda mitad

                  return (
                    <tr key={index}>
                      {/* Primera columna */}
                      {leftItem ? (
                        <>
                          <td className="celda-lista">{index + 1}</td>
                          <td className="celda-lista">
                            <button
                              className={`unidad-button ${
                                leftItem.tipo === "rojo" ? "rojo" : ""
                              }`}
                            >
                              {leftItem.numeroUnidad}
                            </button>
                          </td>
                          <td className="celda-lista">
                            {formatHoraRegistro(leftItem.horaRegistro)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                          <td></td> {/* Espacios vacíos si no hay datos */}
                        </>
                      )}

                      {/* Segunda columna */}
                      {rightItem ? (
                        <>
                          <td className="celda-lista">
                            {index + Math.ceil(numerosTalzintan.length / 2) + 1}
                          </td>
                          <td className="celda-lista">
                            <button
                              className={`unidad-button ${
                                rightItem.tipo === "rojo" ? "rojo" : ""
                              }`}
                            >
                              {rightItem.numeroUnidad}
                            </button>
                          </td>
                          <td className="celda-lista">
                            {formatHoraRegistro(rightItem.horaRegistro)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                          <td></td> {/* Espacios vacíos si no hay datos */}
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="capturar-button-talzintan"
              onClick={handleDownloadImageTalzintan}
            >
              📸 Capturar
            </button>
          </div>
        )}
      </div>
      {/* LISTA LOMA  LISTA LOMA  LISTA LOMA  LISTA LOMA  LISTA LOMA  LISTA LOMA  */}
      <div>
        {mostrarListaLoma && (
          <div className="floating-list-loma">
            <button
              className="close-button-loma"
              onClick={handleCloseListaLoma}
            >
              ❌ Cerrar Loma
            </button>
            <table className="lista-loma" ref={tablaLomaRef}>
              <thead>
                <tr>
                  <th colSpan={8}>Informe: Loma - Talzintan</th>
                </tr>
              </thead>
              <tbody>
                {/* Fila con fecha y hora */}
                <tr>
                  <td colSpan={8} className="celda-fecha-informe">
                    {formatFechaActual()} - {formatHoraActual()}
                  </td>
                </tr>

                {/* Unimos las listas, ordenamos y seleccionamos los primeros 10 elementos */}
                {Array.from({ length: Math.ceil(10 / 2) }).map((_, index) => {
                  // Ordenamos por hora de registro y seleccionamos los últimos 10
                  const listaUnidades = [...numerosTalzintan, ...numerosLoma]
                    .sort(
                      (a, b) =>
                        new Date(b.horaRegistro) - new Date(a.horaRegistro)
                    )
                    .slice(0, 10)
                    .reverse();

                  const leftItem = listaUnidades[index]; // Primera mitad
                  const rightItem =
                    listaUnidades[index + Math.ceil(listaUnidades.length / 2)]; // Segunda mitad

                  return (
                    <tr key={index}>
                      {/* Primera columna */}
                      {leftItem ? (
                        <>
                          <td className="celda-loma">{index + 1}</td>
                          <td className="celda-loma">
                            {leftItem.ruta === "talzintan"
                              ? "Talzintan"
                              : "Loma"}
                          </td>
                          <td className="celda-loma">
                            <button
                              className={`unidad-button ${
                                leftItem.tipo === "rojo" ? "rojo" : ""
                              }`}
                            >
                              {leftItem.numeroUnidad}
                            </button>
                          </td>
                          <td className="celda-loma">
                            {formatHoraRegistro(leftItem.horaRegistro)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </>
                      )}

                      {/* Segunda columna */}
                      {rightItem ? (
                        <>
                          <td className="celda-loma">
                            {index + Math.ceil(listaUnidades.length / 2) + 1}
                          </td>
                          <td className="celda-loma">
                            {rightItem.ruta === "talzintan"
                              ? "Talzintan"
                              : "Loma"}
                          </td>
                          <td className="celda-loma">
                            <button
                              className={`unidad-button ${
                                rightItem.tipo === "rojo" ? "rojo" : ""
                              }`}
                            >
                              {rightItem.numeroUnidad}
                            </button>
                          </td>
                          <td className="celda-loma">
                            {formatHoraRegistro(rightItem.horaRegistro)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="capturar-button-loma"
              onClick={handleDownloadImageLoma}
            >
              📸 Capturar
            </button>
          </div>
        )}
      </div>

      <div>
        {mostrarListaTezotepec && (
          <div className="floating-list-tezotepec">
            <button
              className="close-button-tezotepec"
              onClick={handleCloseListaTezotepec}
            >
              ❌ Cerrar Tezotepec
            </button>
            <table className="lista-tezotepec" ref={tablaTezotepecRef}>
              <thead>
                <tr>
                  <th colSpan={8}>Informe: Tezotepec</th>
                </tr>
              </thead>
              <tbody>
                {/* Fila con fecha y hora */}
                <tr>
                  <td colSpan={8} className="celda-fecha-informe">
                    {formatFechaActual()} - {formatHoraActual()}
                  </td>
                </tr>

                {/* Dividimos la lista en dos mitades */}
                {Array.from({
                  length: Math.ceil(numerosTezotepec.length / 2),
                }).map((_, index) => {
                  const leftItem = numerosTezotepec[index]; // Primera mitad
                  const rightItem =
                    numerosTezotepec[
                      index + Math.ceil(numerosTezotepec.length / 2)
                    ]; // Segunda mitad

                  return (
                    <tr key={index}>
                      {/* Primera columna */}
                      {leftItem ? (
                        <>
                          <td className="celda-tezotepec">{index + 1}</td>
                          <td className="celda-tezotepec">
                            <button
                              className={`unidad-button ${
                                leftItem.tipo === "rojo" ? "rojo" : ""
                              }`}
                            >
                              {leftItem.numeroUnidad}
                            </button>
                          </td>
                          <td className="celda-tezotepec">
                            {formatHoraRegistro(leftItem.horaRegistro)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                          <td></td>
                        </>
                      )}

                      {/* Segunda columna */}
                      {rightItem ? (
                        <>
                          <td className="celda-tezotepec">
                            {index + Math.ceil(numerosTezotepec.length / 2) + 1}
                          </td>
                          <td className="celda-tezotepec">
                            <button
                              className={`unidad-button ${
                                rightItem.tipo === "rojo" ? "rojo" : ""
                              }`}
                            >
                              {rightItem.numeroUnidad}
                            </button>
                          </td>
                          <td className="celda-tezotepec">
                            {formatHoraRegistro(rightItem.horaRegistro)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                          <td></td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="capturar-button-tezotepec"
              onClick={handleDownloadImageTezotepec}
            >
              📸 Capturar
            </button>
          </div>
        )}
      </div>

      <div>
        {mostrarListaTezotepecBlancas && (
          <div className="floating-list-tezotepec-blancas">
            <button
              className="close-button-tezotepec-blancas"
              onClick={handleCloseListaTezotepecBlancas}
            >
              ❌ Cerrar Tezotepec
            </button>
            <table
              className="lista-tezotepec-prediccion"
              ref={tablaTezotepecBlancasRef}
            >
              <thead>
                <tr>
                  <th colSpan={5} className="celda-tezotepec-prediccion">
                    Predicción Tezotepec
                  </th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>TEZO</th>
                  <th>TENEX</th>
                </tr>
              </thead>
              <tbody>
                {numerosTezotepecBlancas
                  .slice()
                  .reverse()
                  .map((unidad, index) => {
                    const numeroOrden = index + 1;

                    // Si el numeroOrden es 1, 2, 3, 8, 9, 10, no renderizar la fila
                    /* if ([1, 2, 3, 4, 5].includes(numeroOrden)) {
                      return null; // No renderizar nada
                    } */

                    let buttonClass = "unidad-button-prediccion"; // Clase base

                    // Agregar clases según el valor de index + 1
                    if (numeroOrden === 8) {
                      buttonClass += " color-ocho"; // Clase específica para el 8
                    } else if (numeroOrden === 9) {
                      buttonClass += " color-nueve"; // Clase específica para el 9
                    } else if (numeroOrden === 10) {
                      buttonClass += " color-diez"; // Clase específica para el 10
                    }

                    return (
                      <tr key={index}>
                        <td className="celda-tezotepec-prediccion">
                          {numeroOrden}
                        </td>
                        <td className="celda-tezotepec-prediccion">
                          <button className={buttonClass}>
                            {unidad.numeroUnidad}
                          </button>
                        </td>
                        <td className="celda-tezotepec-prediccion">
                          {formatHoraRegistro(unidad.horaRegistro)}
                        </td>
                        <td className="celda-tezotepec-prediccion-tezo">
                          {formatHoraRegistro(
                            add75Minutes(unidad.horaRegistro)
                          )}
                        </td>
                        <td className="celda-tezotepec-prediccion-tenex">
                          {formatHoraRegistro(
                            add75Minutes(unidad.horaRegistro)
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/* <button
        className="close-button-blancas"
        onClick={handleDownloadImageTezotepecBlancas}
      >
        📸 Capturar
      </button> */}
          </div>
        )}
      </div>

      <div>
        {mostrarListaCalicapan && (
          <div className="floating-list-calicapan">
            <button
              className="close-button-calicapan"
              onClick={handleCloseListaCalicapan}
            >
              ❌ Cerrar Calicapan
            </button>
            <table className="lista-calicapan" ref={tablaCalicapanRef}>
              <thead>
                <tr>
                  <th colSpan={8} className="celda-calicapan">
                    Informe: Calicapan
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Fila con fecha y hora */}
                <tr>
                  <td colSpan={8} className="celda-fecha-informe">
                    {formatFechaActual()} - {formatHoraActual()}
                  </td>
                </tr>

                {/* Dividir la lista en dos columnas horizontales */}
                {Array.from({
                  length: Math.ceil(numerosCalicapan.length / 2),
                }).map((_, index) => {
                  const leftItem = numerosCalicapan[index]; // Primera mitad
                  const rightItem =
                    numerosCalicapan[
                      index + Math.ceil(numerosCalicapan.length / 2)
                    ]; // Segunda mitad

                  return (
                    <tr key={index}>
                      {/* Primera columna */}
                      {leftItem ? (
                        <>
                          <td className="celda-calicapan">{index + 1}</td>
                          <td className="celda-calicapan">
                            <button
                              className={`unidad-button ${
                                leftItem.tipo === "rojo" ? "rojo" : ""
                              }`}
                            >
                              {leftItem.numeroUnidad}
                            </button>
                          </td>
                          <td className="celda-calicapan">
                            {formatHoraRegistro(leftItem.horaRegistro)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                          <td></td>
                        </>
                      )}

                      {/* Segunda columna */}
                      {rightItem ? (
                        <>
                          <td className="celda-calicapan">
                            {index + Math.ceil(numerosCalicapan.length / 2) + 1}
                          </td>
                          <td className="celda-calicapan">
                            <button
                              className={`unidad-button ${
                                rightItem.tipo === "rojo" ? "rojo" : ""
                              }`}
                            >
                              {rightItem.numeroUnidad}
                            </button>
                          </td>
                          <td className="celda-calicapan">
                            {formatHoraRegistro(rightItem.horaRegistro)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                          <td></td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="capturar-button-calicapan"
              onClick={handleDownloadImageCalicapan}
            >
              📸 Capturar
            </button>
          </div>
        )}
      </div>

      <div>
        {mostrarListaSosa && (
          <div className="floating-list-sosa">
            <button
              className="close-button-sosa"
              onClick={handleCloseListaSosa}
            >
              ❌ Cerrar Sosa Escuela
            </button>
            <table className="lista-sosa" ref={tablaSosaRef}>
              <thead>
                <tr>
                  <th colSpan={8}>Informe: Sosa Escuela</th>
                </tr>
              </thead>
              <tbody>
                {/* Fila con fecha y hora */}
                <tr>
                  <td colSpan={8} className="celda-fecha-informe">
                    {formatFechaActual()} - {formatHoraActual()}
                  </td>
                </tr>

                {/* Dividimos la lista en dos mitades */}
                {Array.from({ length: Math.ceil(numerosSosa.length / 2) }).map(
                  (_, index) => {
                    const leftItem = numerosSosa[index]; // Primera mitad
                    const rightItem =
                      numerosSosa[index + Math.ceil(numerosSosa.length / 2)]; // Segunda mitad

                    return (
                      <tr key={index}>
                        {/* Primera columna */}
                        {leftItem ? (
                          <>
                            <td className="celda-sosa">{index + 1}</td>
                            <td className="celda-sosa">
                              <button
                                className={`unidad-button ${
                                  leftItem.tipo === "rojo" ? "rojo" : ""
                                }`}
                              >
                                {leftItem.numeroUnidad}
                              </button>
                            </td>
                            <td className="celda-sosa">
                              {formatHoraRegistro(leftItem.horaRegistro)}
                            </td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td></td>
                            <td></td>
                          </>
                        )}

                        {/* Segunda columna */}
                        {rightItem ? (
                          <>
                            <td className="celda-sosa">
                              {index + Math.ceil(numerosSosa.length / 2) + 1}
                            </td>
                            <td className="celda-sosa">
                              <button
                                className={`unidad-button ${
                                  rightItem.tipo === "rojo" ? "rojo" : ""
                                }`}
                              >
                                {rightItem.numeroUnidad}
                              </button>
                            </td>
                            <td className="celda-sosa">
                              {formatHoraRegistro(rightItem.horaRegistro)}
                            </td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td></td>
                            <td></td>
                          </>
                        )}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
            <button
              className="capturar-button-sosa"
              onClick={handleDownloadImageSosa}
            >
              📸 Capturar
            </button>
          </div>
        )}
      </div>

      <div>
        {mostrarListaSosaBlancas && (
          <div className="floating-list-sosa-blancas">
            <button
              className="close-button-sosa-blancas"
              onClick={handleCloseListaSosaBlancas}
            >
              ❌ Cerrar Sosa Escuela
            </button>
            <table className="lista-sosa-prediccion" ref={tablaSosaBlancasRef}>
              <thead>
                <tr>
                  <th colSpan={4}>Predicción Sosa Escuela</th>
                </tr>
              </thead>
              <tbody>
                {numerosSosaBlancas
                  .slice()
                  .reverse()
                  .map((unidad, index) => {
                    const numeroOrden = index + 1;

                    // Si el numeroOrden es 1, 2, 3, 8, 9, 10, no renderizar la fila
                    if ([1, 2, 3, 4, 14, 15].includes(numeroOrden)) {
                      return null; // No renderizar nada
                    }

                    let buttonClass = "unidad-button-prediccion"; // Clase base

                    // Agregar clases según el valor de index + 1
                    if (numeroOrden === 8) {
                      buttonClass += " color-ocho"; // Clase específica para el 8
                    } else if (numeroOrden === 9) {
                      buttonClass += " color-nueve"; // Clase específica para el 9
                    } else if (numeroOrden === 10) {
                      buttonClass += " color-diez"; // Clase específica para el 10
                    }

                    return (
                      <tr key={index}>
                        <td className="celda-sosa-prediccion">{numeroOrden}</td>
                        <td className="celda-sosa-prediccion">
                          <button className={buttonClass}>
                            {unidad.numeroUnidad}
                          </button>
                        </td>
                        <td className="celda-sosa-prediccion">
                          {formatHoraRegistro(unidad.horaRegistro)}
                        </td>
                        <td className="celda-sanisidro-prediccion">
                          {formatHoraRegistro(
                            add80Minutes(unidad.horaRegistro)
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/* <button
        className="close-button-blancas"
        onClick={handleDownloadImageSosaBlancas}
      >
        📸 Capturar
      </button> */}
          </div>
        )}
      </div>

      <div>
        {mostrarListaSanisidro && (
          <div className="floating-list-sanisidro">
            <button
              className="close-button-sanisidro"
              onClick={handleCloseListaSanisidro}
            >
              ❌ Cerrar San Isidro
            </button>
            <table className="lista-sanisidro" ref={tablaSanisidroRef}>
              <thead>
                <tr>
                  <th colSpan={8}>Informe: San Isidro</th>
                </tr>
              </thead>
              <tbody>
                {/* Fila con fecha y hora */}
                <tr>
                  <td colSpan={8} className="celda-fecha-informe">
                    {formatFechaActual()} - {formatHoraActual()}
                  </td>
                </tr>

                {/* Dividimos la lista en dos mitades */}
                {Array.from({
                  length: Math.ceil(numerosSanisidro.length / 2),
                }).map((_, index) => {
                  const leftItem = numerosSanisidro[index]; // Primera mitad
                  const rightItem =
                    numerosSanisidro[
                      index + Math.ceil(numerosSanisidro.length / 2)
                    ]; // Segunda mitad

                  return (
                    <tr key={index}>
                      {/* Primera columna */}
                      {leftItem ? (
                        <>
                          <td className="celda-sanisidro">{index + 1}</td>
                          <td className="celda-sanisidro">
                            <button
                              className={`unidad-button ${
                                leftItem.tipo === "rojo" ? "rojo" : ""
                              }`}
                            >
                              {leftItem.numeroUnidad}
                            </button>
                          </td>
                          <td className="celda-sanisidro">
                            {formatHoraRegistro(leftItem.horaRegistro)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                          <td></td>
                        </>
                      )}

                      {/* Segunda columna */}
                      {rightItem ? (
                        <>
                          <td className="celda-sanisidro">
                            {index + Math.ceil(numerosSanisidro.length / 2) + 1}
                          </td>
                          <td className="celda-sanisidro">
                            <button
                              className={`unidad-button ${
                                rightItem.tipo === "rojo" ? "rojo" : ""
                              }`}
                            >
                              {rightItem.numeroUnidad}
                            </button>
                          </td>
                          <td className="celda-sanisidro">
                            {formatHoraRegistro(rightItem.horaRegistro)}
                          </td>
                        </>
                      ) : (
                        <>
                          <td></td>
                          <td></td>
                          <td></td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              className="capturar-button-sanisidro"
              onClick={handleDownloadImageSanisidro}
            >
              📸 Capturar
            </button>
          </div>
        )}
      </div>

      <div>
        {mostrarListaSanisidroBlancas && (
          <div className="floating-list-sanisidro-blancas">
            <button
              className="close-button-sanisidro-blancas"
              onClick={handleCloseListaSanisidroBlancas}
            >
              ❌ Cerrar San Isidro
            </button>
            <table
              className="lista-sanisidro-prediccion"
              ref={tablaSanisidroBlancasRef}
            >
              <thead>
                <tr>
                  <th colSpan={4}>Predicción San Isidro</th>
                </tr>
              </thead>
              <tbody>
                {numerosSanisidroBlancas
                  .slice()
                  .reverse()
                  .map((unidad, index) => {
                    const numeroOrden = index + 1;

                    // Si el numeroOrden es 1, 2, 3, 5, 6, 7, no renderizar la fila
                    if ([1, 2, 3, 14, 15].includes(numeroOrden)) {
                      return null; // No renderizar nada
                    }

                    let buttonClass = "unidad-button-prediccion"; // Clase base

                    // Agregar clases según el valor de index + 1
                    if (numeroOrden === 5) {
                      buttonClass += " color-ocho"; // Clase para el 5
                    } else if (numeroOrden === 6) {
                      buttonClass += " color-nueve"; // Clase para el 6
                    } else if (numeroOrden === 7) {
                      buttonClass += " color-diez"; // Clase para el 7
                    }

                    return (
                      <tr key={index}>
                        <td className="celda-sanisidro-prediccion">
                          {numeroOrden}
                        </td>
                        <td className="celda-sanisidro-prediccion">
                          <button className={buttonClass}>
                            {unidad.numeroUnidad}
                          </button>
                        </td>
                        <td className="celda-sanisidro-prediccion">
                          {formatHoraRegistro(unidad.horaRegistro)}
                        </td>
                        <td className="celda-sosa-prediccion">
                          {formatHoraRegistro(
                            add65Minutes(unidad.horaRegistro)
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/* <button
        className="close-button-blancas"
        onClick={handleDownloadImageSanisidroBlancas}
      >
        📸 Capturar
      </button> */}
          </div>
        )}
      </div>

      <div>
        {mostrarListaTacopan && (
          <div className="floating-list-tacopan">
            <button
              className="close-button-tacopan"
              onClick={handleCloseListaTacopan}
            >
              ❌ Cerrar Tacopan
            </button>
            <table className="lista-tacopan" ref={tablaTacopanRef}>
              <thead>
                <tr>
                  <th colSpan={3}>Tacopan</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3}>
                    {formatFechaActual()} - {formatHoraActual()}
                  </td>
                </tr>
                {numerosTacopan
                  .slice()
                  .reverse()
                  .map((unidad, index) => (
                    <tr key={index}>
                      <td className="celda-tacopan">{index + 1}</td>
                      <td className="celda-tacopan">
                        <button
                          className={`unidad-button ${
                            unidad.tipo === "rojo" ? "rojo" : ""
                          }`}
                        >
                          {unidad.numeroUnidad}
                        </button>
                      </td>
                      <td className="celda-tacopan">
                        {formatHoraRegistro(unidad.horaRegistro)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button
              className="close-button"
              onClick={handleDownloadImageTacopan}
            >
              📸 Capturar
            </button>
          </div>
        )}
      </div>

      <div>
        {mostrarListaTequimila && (
          <div className="floating-list-tequimila">
            <button
              className="close-button-tequimila"
              onClick={handleCloseListaTequimila}
            >
              ❌ Cerrar Tequimila
            </button>
            <table className="lista-tequimila" ref={tablaTequimilaRef}>
              <thead>
                <tr>
                  <th colSpan={4}>Tequimila</th>
                </tr>
                <tr>
                  <th colSpan={2}></th>
                  <th className="encabezado-tequimila">tequimila</th>
                  <th className="celda-calicapan">calicapan</th>
                </tr>
              </thead>
              <tbody>
                {numerosTequimila
                  .slice(-6, -2)
                  .reverse()
                  .map((unidad, index) => {
                    const minutos = new Date(unidad.horaRegistro).getMinutes();
                    let backgroundColor = "";

                    if (minutos >= 0 && minutos <= 8) {
                      backgroundColor = "#FF0000"; // Rojo en hexadecimal
                    } else if (minutos >= 10 && minutos <= 18) {
                      backgroundColor = "#0051FF"; // Azul en hexadecimal
                    }

                    return (
                      <tr key={index}>
                        <td className="celda-tequimila">{index + 1}</td>
                        <td className="celda-tequimila">
                          <button
                            className={`unidad-button ${
                              unidad.tipo === "rojo" ? "rojo" : ""
                            }`}
                          >
                            {unidad.numeroUnidad}
                          </button>
                        </td>
                        <td className="celda-tequimila">
                          {formatHoraRegistro(unidad.horaRegistro)}
                        </td>
                        <td
                          className="celda-calicapan"
                          style={{ backgroundColor }}
                        >
                          {formatHoraRegistro(
                            add46Minutes(unidad.horaRegistro)
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <button
              className="close-button-tequimila"
              onClick={handleDownloadImageTequimila}
            >
              📸 Capturar
            </button>
          </div>
        )}
      </div>

      <div>
        {mostrarListaQuinta && (
          <div className="floating-list-quinta">
            <button
              className="close-button-quinta"
              onClick={handleCloseListaQuinta}
            >
              ❌ Cerrar Quinta
            </button>
            <table className="lista-quinta" ref={tablaQuintaRef}>
              <thead>
                <tr>
                  <th colSpan={4}>Quinta</th>
                </tr>
                <tr>
                  <th colSpan={2}></th>
                  <th className="encabezado-quinta">quinta</th>
                  <th className="celda-tequimila">tequimila</th>
                </tr>
              </thead>
              <tbody>
                {numerosQuinta
                  .slice()
                  .reverse()
                  .map((unidad, index) => {
                    return (
                      <tr key={index}>
                        <td className="celda-quinta">{index + 1}</td>
                        <td className="celda-quinta">
                          <button
                            className={`unidad-button ${
                              unidad.tipo === "rojo" ? "rojo" : ""
                            }`}
                          >
                            {unidad.numeroUnidad}
                          </button>
                        </td>
                        <td className="celda-quinta">
                          {formatHoraRegistro(unidad.horaRegistro)}
                        </td>
                        <td className="celda-tequimila">
                          {formatHoraRegistro(
                            add46Minutes(unidad.horaRegistro)
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <button
              className="close-button-quinta"
              onClick={handleDownloadImageQuinta}
            >
              📸 Capturar
            </button>
          </div>
        )}
      </div>

      <div>
        {mostrarListaCalanorte && (
          <div className="floating-list-calanorte">
            <button
              className="close-button-calanorte"
              onClick={handleCloseListaCalanorte}
            >
              ❌ Cerrar Calanorte
            </button>
            <table className="lista-calanorte" ref={tablaCalanorteRef}>
              <thead>
                <tr>
                  <th colSpan={3}>Calanorte</th>
                </tr>
              </thead>
              <tbody>
                {numerosCalanorte
                  .slice()
                  .reverse()
                  .map((unidad, index) => (
                    <tr key={index}>
                      <td className="celda-calanorte">{index + 1}</td>
                      <td className="celda-calanorte">
                        <button
                          className={`unidad-button ${
                            unidad.tipo === "rojo" ? "rojo" : ""
                          }`}
                        >
                          {unidad.numeroUnidad}
                        </button>
                      </td>
                      <td className="celda-calanorte">
                        {formatHoraRegistro(unidad.horaRegistro)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button
              className="close-button"
              onClick={handleDownloadImageCalanorte}
            >
              📸 Capturar
            </button>
          </div>
        )}
      </div>

      <div>
        {mostrarListaPajaco && (
          <div className="floating-list-pajaco">
            <button
              className="close-button-pajaco"
              onClick={handleCloseListaPajaco}
            >
              ❌ Cerrar Pajaco
            </button>
            <table className="lista-pajaco" ref={tablaPajacoRef}>
              <thead>
                <tr>
                  <th colSpan={4}>Pajaco</th>
                </tr>
                <tr>
                  <th colSpan={2}></th>
                  <th className="encabezado-pajaco">pajaco</th>
                  <th className="celda-calicapan">calicapan</th>
                </tr>
              </thead>
              <tbody>
                {numerosPajaco
                  .slice()
                  .reverse()
                  .map((unidad, index) => {
                    return (
                      <tr key={index}>
                        <td className="celda-pajaco">{index + 1}</td>
                        <td className="celda-pajaco">
                          <button
                            className={`unidad-button ${
                              unidad.tipo === "rojo" ? "rojo" : ""
                            }`}
                          >
                            {unidad.numeroUnidad}
                          </button>
                        </td>
                        <td className="celda-pajaco">
                          {formatHoraRegistro(unidad.horaRegistro)}
                        </td>
                        <td className="celda-calicapan">
                          {formatHoraRegistro(
                            add70Minutes(unidad.horaRegistro)
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <button
              className="close-button-pajaco"
              onClick={handleDownloadImagePajaco}
            >
              📸 Capturar
            </button>
          </div>
        )}
      </div>

      <div>
        {mostrarListaAnalco && (
          <div className="floating-list-analco">
            <button
              className="close-button-analco"
              onClick={handleCloseListaAnalco}
            >
              ❌ Cerrar Analco
            </button>
            <table className="lista-analco" ref={tablaAnalcoRef}>
              <thead>
                <tr>
                  <th colSpan={4}>Analco</th>
                </tr>
                <tr>
                  <th colSpan={2}></th>
                  <th className="encabezado-analco">analco</th>
                  <th className="celda-calicapan">calicapan</th>
                </tr>
              </thead>
              <tbody>
                {numerosAnalco
                  .slice()
                  .reverse()
                  .map((unidad, index) => {
                    return (
                      <tr key={index}>
                        <td className="celda-analco">{index + 1}</td>
                        <td className="celda-analco">
                          <button
                            className={`unidad-button ${
                              unidad.tipo === "rojo" ? "rojo" : ""
                            }`}
                          >
                            {unidad.numeroUnidad}
                          </button>
                        </td>
                        <td className="celda-analco">
                          {formatHoraRegistro(unidad.horaRegistro)}
                        </td>
                        <td className="celda-calicapan">
                          {formatHoraRegistro(
                            add50Minutes(unidad.horaRegistro)
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <button
              className="close-button-analco"
              onClick={handleDownloadImageAnalco}
            >
              📸 Capturar
            </button>
          </div>
        )}
      </div>

      <div>
        {mostrarListaYopi && (
          <div className="floating-list-yopi">
            <button
              className="close-button-yopi"
              onClick={handleCloseListaYopi}
            >
              ❌ Cerrar Yopi
            </button>
            <table className="lista-yopi" ref={tablaYopiRef}>
              <thead>
                <tr>
                  <th colSpan={3}>Yopi</th>
                </tr>
              </thead>
              <tbody>
                {numerosYopi
                  .slice()
                  .reverse()
                  .map((unidad, index) => (
                    <tr key={index}>
                      <td className="celda-yopi">{index + 1}</td>
                      <td className="celda-yopi">
                        <button
                          className={`unidad-button ${
                            unidad.tipo === "rojo" ? "rojo" : ""
                          }`}
                        >
                          {unidad.numeroUnidad}
                        </button>
                      </td>
                      <td className="celda-yopi">
                        {formatHoraRegistro(unidad.horaRegistro)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button className="close-button" onClick={handleDownloadImageYopi}>
              📸 Capturar
            </button>
          </div>
        )}
      </div>

      <div>
        {mostrarListaOtra && (
          <div className="floating-list-otra">
            <button
              className="close-button-otra"
              onClick={handleCloseListaOtra}
            >
              ❌ Cerrar Otra
            </button>
            <table className="lista-otra" ref={tablaOtraRef}>
              <thead>
                <tr>
                  <th colSpan={3}>Otra</th>
                </tr>
              </thead>
              <tbody>
                {numerosOtra
                  .slice()
                  .reverse()
                  .map((unidad, index) => (
                    <tr key={index}>
                      <td className="celda-otra">{index + 1}</td>
                      <td className="celda-otra">
                        <button
                          className={`unidad-button ${
                            unidad.tipo === "rojo" ? "rojo" : ""
                          }`}
                        >
                          {unidad.numeroUnidad}
                        </button>
                      </td>
                      <td className="celda-otra">
                        {formatHoraRegistro(unidad.horaRegistro)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button className="close-button" onClick={handleDownloadImageOtra}>
              📸 Capturar
            </button>
          </div>
        )}
      </div>
      <Comision></Comision>
    </div>
  );
};

export default UnidadesComponent;
