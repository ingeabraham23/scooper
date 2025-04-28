/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './EditorRegistros.css';
import dbpagos from './dbpagos'; // Importar la base de datos Dexie

const EditorDeRegistros = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    // Recuperar los datos de la base de datos Dexie al cargar el componente
    const obtenerPagos = async () => {
      const pagosGuardados = await dbpagos.pagos.toArray();
      setRegistros(pagosGuardados);
    };

    obtenerPagos();
  }, []);

  const handleCambio = (id, campo, valor) => {
    setRegistros((prevRegistros) =>
      prevRegistros.map((registro) =>
        registro.id === id ? { ...registro, [campo]: valor } : registro
      )
    );
  };

  const handleGuardarCambios = async () => {
    await Promise.all(registros.map((registro) => dbpagos.pagos.update(registro.id, registro)));
    alert('Cambios guardados');
  };

  const handleEliminarRegistro = async (id) => {
    if (window.confirm('¿Está seguro de que quiere eliminar este registro?')) {
      await dbpagos.pagos.delete(id);
      setRegistros((prevRegistros) => prevRegistros.filter((registro) => registro.id !== id));
    }
  };

  return (
    <div className="container-editor">
      <h2>Editor de Registros</h2>
      <table className='tabla-editor'>
        <thead>
          <tr>
            <th>#</th>
            <th>U</th>
            <th>$</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro, index) => (
            <tr key={registro.id}>
              <td>{index + 1}</td>
              <td>{registro.unidad}</td>
              <td>
                <input
                  type="number"
                  value={registro.monto}
                  onChange={(e) => handleCambio(registro.id, 'monto', Number(e.target.value))}
                />
              </td>
              <td>
                <select
                  value={registro.tipo}
                  onChange={(e) => handleCambio(registro.id, 'tipo', e.target.value)}
                >
                  <option value="privado">Privado</option>
                  <option value="grupal">Grupal</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleEliminarRegistro(registro.id)} className='boton-eliminar'>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="guardar-cambios" onClick={handleGuardarCambios}>
        Guardar Cambios
      </button>
    </div>
  );
};

export default EditorDeRegistros;
