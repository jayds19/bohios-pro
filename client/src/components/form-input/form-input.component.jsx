import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./form-input.styles.scss";

const FormInput = ({ handleChange, type, width,wide, label, small, ...otherProps }) => (
  <div className={`group ${small ? 'small' : ''}`}>
    {label ? (
      <label className="form-input-label">
        {label}
      </label>
    ) : null}
    <input
      type={type}
      className={`form-input ${wide? 'wide' : ''}`}
      style={{ width: `${width ? `${width}px` : ''}` }}
      onChange={handleChange}
      {...otherProps}
    />
  </div>
);

export default FormInput;