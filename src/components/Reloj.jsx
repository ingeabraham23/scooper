
import React, { useState, useEffect } from 'react';
import "./Reloj.css"

const ClockButton = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Limpiamos el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = time.toLocaleTimeString();

  return (
    <button className='button-timer'>
      {formattedTime}
    </button>
  );
};

export default ClockButton;