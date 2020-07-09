import React from "react";

import Icon from "../icon/icon.component";

import "./custom-button.styles.scss";

const CustomButton = ({ text, color, type, icon, ...otherProps }) => (
  <button type={`${type ? type : 'button'}`} className={`custom-button ${color}`} {...otherProps}>
    {icon ?
      <Icon tag={icon} size="small" />
      : null
    }
    {text}
  </button>
);

export default CustomButton;