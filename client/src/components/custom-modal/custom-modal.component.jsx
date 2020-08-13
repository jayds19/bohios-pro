import React from "react";
import Modal from "react-modal";

import Icon from "../icon/icon.component";

import "./custom-modal.styles.scss";

const CustomModal = ({ title, type, children, closeModal, ...otherProps }) => (
  <Modal ariaHideApp={false}
    style={{ content: { width: "350px", boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.7)", margin: "0 auto" } }}
    {...otherProps}
  >
    <div className="modal-header">
      <span>{title}</span>
      <button className="btn" title="Cerrar" onClick={closeModal}>
        <Icon tag="close" size="tiny" />
      </button>
    </div>
    <div className="modal-body">
      {(type === "error" ? <div className="error-icon bg-danger"><Icon tag="close" size="medium" /></div> : null)}
      {(type === "success" ? <div className="success-icon bg-success"><Icon tag="check" size="medium" /></div> : null)}

      <br />
      {children}
    </div>
    <div className="modal-footer">
      <button className="btn btn-secondary" onClick={closeModal}>
        OK
      </button>
    </div>
  </Modal>
);

export default CustomModal;