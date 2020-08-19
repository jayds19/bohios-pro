import React from "react";
import { Line } from "rc-progress";

import "./loading-screen.styles.scss";

const LoadingScreen = ({ isOpen, progress }) => (
  <div className={`loading-screen ${isOpen ? "show" : "hide"}`}>
    <div className="loading-container">
      <div className="loading-title">CARGANDO</div>
      <Line percent={progress} strokeColor="#FFA52A" />
    </div>
  </div>
);

export default LoadingScreen;