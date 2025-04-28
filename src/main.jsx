import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="top-right" //top-left, top-center, bottom-left, bottom-right, bottom-center
      autoClose={5000} // milisegundos
      hideProgressBar={false} // Ocultar barra de progreso
      newestOnTop={false}
      closeOnClick //Cerrar al hacer click
      rtl={false} //De Derecha aizquierda
      pauseOnFocusLoss //Pausar al estar salir de la ventana
      draggable //Se puede arrastrar
      pauseOnHover //Pausar al hacer click
      theme="colored" // dark, colored.//
    />
  </React.StrictMode>
);
