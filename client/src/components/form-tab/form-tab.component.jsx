import React from "react";

import Icon from "../icon/icon.component";

import "./form-tab.styles.scss";

const FormTab = ({ tabPosition, handleTab }) => (
  <div className="form-tab">
    <button type="button" className={(tabPosition === 0) ? "active" : ""} onClick={() => handleTab(0)}>
      <Icon tag="format_list_bulleted" size="small" /> Lista
    </button>
    <button type="button" className={(tabPosition === 1) ? "active" : ""} onClick={() => handleTab(1)}>
      <Icon tag="mode_edit" size="small" /> Registro / Edición
    </button>
  </div>
);

export default FormTab;