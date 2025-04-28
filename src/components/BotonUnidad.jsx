
import React from 'react';
import './BotonUnidad.css';


const BotonUnidad = ({ unidad, onClick, disabled, invisible }) => (
  <button onClick={onClick} disabled={disabled} className={`boton-unidad ${ invisible ? 'invisible' : ''}`}>
    {unidad}
  </button>
);

export default BotonUnidad;