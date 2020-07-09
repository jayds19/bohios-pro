import React from "react";

import CustomButton from "../custom-button/custom-button.component";

import Icon from "../icon/icon.component";

import "./header.styles.scss";

const Header = () => (
  <header className="header">
    <h1><Icon tag="home" size="small" /><span>BohiosPro</span></h1>
    <div>
      <div>INICIO</div>
      <div>CONTACTO</div>
      <div>
        <CustomButton type="button" color="success" text="LOGIN" icon="supervisor_account" />
      </div>
    </div>
  </header>
);

export default Header;