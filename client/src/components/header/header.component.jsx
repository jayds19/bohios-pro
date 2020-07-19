import React from "react";

import CustomButton from "../custom-button/custom-button.component";

import Logo from "../../assets/logo.png";

import "./header.styles.scss";

const Header = () => (
  <header className="header">
    <h1><img src={Logo} alt="Logo" /></h1>
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