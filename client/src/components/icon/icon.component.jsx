import React from "react";

import "./icon.styles.scss";

const Icon = ({ tag, size }) => (
  <i className={`${size} material-icons`}>
    {tag}
  </i>
);

export default Icon;