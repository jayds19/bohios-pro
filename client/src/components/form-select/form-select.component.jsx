import React from "react";

import "./form-select.styles.scss";

const FormSelect = ({ handleChange, label, items = [], ...otherProps }) => (
  <div className="group">
    {label ? (
      <label className="form-select-label">
        {label}
      </label>
    ) : null}
    <select
      className="form-select"
      onChange={handleChange}
      {...otherProps}
    >
      <option value=""> -- Seleccionar -- </option>
      {items.map(item => (
        <option key={item.id} value={item.id}>{item.description}</option>
      ))}
    </select>
  </div>
);

export default FormSelect;