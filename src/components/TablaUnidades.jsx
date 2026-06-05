

import React from 'react';
import BotonUnidad from './BotonUnidad';
import './TablaUnidades.css';


const TablaUnidades = ({ onUnidadClick, pagos }) => {
  // Lista de unidades que deben estar deshabilitadas desde el principio
  const unidadesDeshabilitadasInicialmente = [2, 23, 26, 32, 44, 45, 49, 50]; // Ejemplo de unidades deshabilitadas

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

