import React from "react";

import CustomButton from "../custom-button/custom-button.component";
import Icon from "../icon/icon.component";

import "./dialog-message.styles.scss";

const DialogMessage = ({ type, message, isOpen, fullScreen, handleClose }) => (
  <div className={`dialog-message ${fullScreen ? "full-screen" : ""} ${isOpen ? "show" : "hide"}`}>
    <div className="dialog-title">
      <div>
        {(type === "success") ? "COMPLETADO" : null}
        {(type === "error") ? "ERROR" : null}
        {(type === "info") ? "INFORMACIÓN" : null}
      </div>
      <button onClick={handleClose}><Icon tag="close" /></button>
    </div>
    <div className="dialog-body">
      <p>
        {(type === "success") ? <Icon tag="check_circle" size="medium" /> : null}
        {(type === "error") ? <Icon tag="cancel" size="medium" /> : null}
        {(type === "info") ? <Icon tag="info" size="medium" /> : null}
      </p>
      {(message !== undefined) ? message.toUpperCase() : ""}
    </div>
    <div className="dialog-controls">
      <CustomButton text="Entendido" color="primary" onClick={handleClose} />
    </div>
  </div>
);

export default DialogMessage;