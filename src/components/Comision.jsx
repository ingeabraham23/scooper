
import React, { useState, useEffect } from 'react';
import TablaUnidades from './TablaUnidades';
import FormularioUnidad from './FormularioUnidad';
import TablaResumen from './TablaResumen';
import EditorDeRegistros from './EditorRegistros';
import dbpagos from './dbpagos';
import './Comision.css';

const Comision = () => {
  const [unidadSeleccionada, setUnidadSeleccionada] = useState(null);
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    // Recuperar los datos de la base de datos Dexie al cargar la página
    const obtenerPagos = async () => {
      const pagosGuardados = await dbpagos.pagos.toArray();
      setPagos(pagosGuardados);
    };

    obtenerPagos();
  }, []);

  const handleUnidadClick = (unidad) => {
    setUnidadSeleccionada(unidad);
  };

  const handleGuardarPago = async (pago) => {
    await dbpagos.pagos.add(pago);
    const pagosActualizados = await dbpagos.pagos.toArray();
    setPagos(pagosActualizados);
    setUnidadSeleccionada(null);
  };

  const handleBorrarRegistros = async () => {
    if (window.confirm('¿Está seguro de que quiere borrar todos los datos?')) {
      await dbpagos.pagos.clear();
      setPagos([]);
    }
  };

  return (
    <div>
      <TablaUnidades onUnidadClick={handleUnidadClick} pagos={pagos} />
      {unidadSeleccionada && (
        <FormularioUnidad
          unidad={unidadSeleccionada}
          onGuardar={handleGuardarPago}
          onCancelar={() => setUnidadSeleccionada(null)}
        />
      )}
      <hr></hr>
      <TablaResumen pagos={pagos} />
      <hr></hr>
      <button onClick={handleBorrarRegistros} className='boton-cancelar'>Borrar todos los registros</button>
      <hr></hr>
      <EditorDeRegistros></EditorDeRegistros>
    </div>
  );
};

export default Comision;
