import React from "react";

import Icon from "../icon/icon.component";

import "./image-list.styles.scss";

const ImageList = ({ name, items, handleRemove, ...otherProps }) => (
  <div className="image-list">
		<label>Galería <span className="text-primary">{items.length}/10</span></label>
    <div className="image-input">
      {items.map(item => (
        <div key={item.id} className={`list-item ${(item.remove === 1) ? 'hidden' : ''}`}>
          <span>{item.name}</span>
          <div title="Remover" onClick={() => handleRemove(item)}>
            <Icon tag="close" size="tiny" />
          </div>
        </div>
      ))}

      <label htmlFor={name}>
        <Icon tag="image" size="tiny" /> Agregar imagen a galería
      </label>
      <input id={name} type="file" accept="image/x-png,image/jpeg,image/jpg" {...otherProps} />
    </div>
  </div>
);

export default ImageList;
