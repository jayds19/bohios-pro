import React from "react";

import "./loading-indicator.styles.scss";

const LoadingIndicator = ({visible}) => (
	<div className={`loading-indicator ${visible ? 'show-loading-indicator' : 'hide-loading-indicator' }`}>
		<p>Cargando...</p>
		<div className="spinner-border text-success" role="status">
			<span className="sr-only">Loading...</span>
		</div>
	</div>
);

export default LoadingIndicator;
