import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./form-image-input.styles.scss";
import ImageBackground from "../../assets/image-input-background.svg";

const FormImageInput = ({
  handleChange,
  img = "",
  width,
  wide,
  label,
  small,
  ...otherProps
}) => (
  <div className={`group ${small ? "small" : ""}`}>
    {label ? <label className="form-image-input-label">{label}</label> : null}
    <br/>
    <input
      type="file"
      className={`form-image-input ${wide ? "wide" : ""}`}
      style={{ width: `${width ? `${width}px` : ""}` }}
      accept="image/x-png,image/jpeg,image/jpg"
      onChange={handleChange}
      {...otherProps}
    />
    <br/>
    <img src={(img ? img : ImageBackground)} alt="Background size" />
  </div>
);

export default FormImageInput;
