import React from "react";

import "./form-input.styles.scss";

const FormInput = ({ handleChange, type, width, label, ...otherProps }) => (
  <div className="group">
    {label ? (
      <label className="form-input-label">
        {label}
      </label>
    ) : null}
    <input
      type={type}
      className="form-input"
      style={{ width: `${width ? `${width}px` : ''}` }}
      onChange={handleChange}
      {...otherProps}
    />
  </div>
);

export default FormInput;