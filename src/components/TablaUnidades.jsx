/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import BotonUnidad from './BotonUnidad';
import './TablaUnidades.css';

// eslint-disable-next-line react/prop-types
const TablaUnidades = ({ onUnidadClick, pagos }) => {
  // Lista de unidades que deben estar deshabilitadas desde el principio
  const unidadesDeshabilitadasInicialmente = [2, 3, 15, 17, 23, 26, 30, 32, 44, 45, 48, 49, 50]; // Ejemplo de unidades deshabilitadas

  // eslint-disable-next-line react/prop-types
  const esUnidadDeshabilitada = (unidad) => 
    unidadesDeshabilitadasInicialmente.includes(unidad) || pagos.some(pago => pago.unidad === unidad);

  const esUnidadInvisible = (unidad) => 
    unidadesDeshabilitadasInicialmente.includes(unidad);

  return (
    <div className="container">
      <table className='tabla-unidades'>
        <tbody>
          {[...Array(10)].map((_, filaIndex) => (
            <tr key={filaIndex} className='fila-unidades'>
              {[...Array(5)].map((_, colIndex) => {
                const unidad = filaIndex * 5 + colIndex + 1;
                return (
                  <td key={unidad} className='celda-unidades'>
                    <BotonUnidad
                      unidad={unidad}
                      onClick={() => onUnidadClick(unidad)}
                      disabled={esUnidadDeshabilitada(unidad)}
                      invisible={esUnidadInvisible(unidad)}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUnidades;

