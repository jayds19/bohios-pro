import React from "react";

import "./form-textarea.styles.scss";

const FormTextarea = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    {label ? (
      <label className="form-textarea-label">
        {label}
      </label>
    ) : null}
    <textarea
      className="form-textarea"
      onChange={handleChange}
      {...otherProps}
    />
  </div>
);

export default FormTextarea;