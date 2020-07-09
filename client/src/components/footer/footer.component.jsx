import React from "react";

import "./footer.styles.scss";

const Footer = () => (
  <footer>
    <div>
      <small>Redes Sociales
        <a href="https://www.instagram.com/bohiospro/">
          <img src="/icons/instagram.svg" alt="Instagram" />
        </a>
        <a href="https://www.facebook.com/BohiosPro-109202460503915/">
          <img src="/icons/facebook.svg" alt="Facebook" />
        </a>
      </small>
    </div>
    <div>
      <small>Preguntas Frecuentes | Acceder con una Cuenta Invitada</small>
    </div>
    <div>
      <small>Todos los derechos reservados © 2020 BohiosPro</small>
    </div>
  </footer>
);

export default Footer;