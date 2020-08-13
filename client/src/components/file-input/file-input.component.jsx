import React from "react";

import Icon from "../icon/icon.component";

import "./file-input.styles.scss";

const FileInput = ({ name, label, file = null, wide, small, onRemove, ...otherProps }) => (
  <div className={`file-input ${small ? 'small' : ''}`}>
    <label htmlFor={name} className={wide ? 'wide' : ''}>
      {
        (file !== null) ? file.name : label
      }
    </label>
    {
      (file != null) ?
        <span className="remove" title="Remove" onClick={onRemove}>
          <Icon tag="cancel" size="tiny" />
        </span>
        :
        <span>
          <Icon tag="photo" size="tiny" />
        </span>
    }
    <input id={name} name={name} type="file" {...otherProps} />
  </div>
);

export default FileInput;