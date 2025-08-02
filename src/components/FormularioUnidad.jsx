// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './FormularioUnidad.css';

// eslint-disable-next-line react/prop-types
const FormularioUnidad = ({ unidad, onGuardar, onCancelar }) => {
  const [monto, setMonto] = useState(20);

  const handleGuardar = (tipo) => {
    const pago = {
      unidad,
      monto,
      tipo,
      fecha: new Date().toISOString(),
    };
    onGuardar(pago);
  };

  return (
    <div className="form-container-comision">
      <h1>Unidad {unidad}</h1>
      <form>
        <label>
          Monto:
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
          />
        </label>
        <button type="button" onClick={() => handleGuardar('privado')}>Guardar Privado</button>
        <button type="button" onClick={() => handleGuardar('grupal')}>Guardar Grupal</button>
        <button type="button" onClick={onCancelar}>Cancelar</button>
      </form>
    </div>
  );
};

export default FormularioUnidad;
