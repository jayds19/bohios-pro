import React from "react";

import Icon from "../icon/icon.component";

import "./custom-button.styles.scss";

const CustomButton = ({ text, color, type, icon, small, ...otherProps }) => (
  <button type={`${type ? type : 'button'}`} className={`custom-button ${color} ${small ? 'small' : ''}`} {...otherProps}>
    {icon ?
      <Icon tag={icon} size={small ? 'tiny' : 'small'} />
      : null
    }
    {text}
  </button>
);

export default CustomButton;