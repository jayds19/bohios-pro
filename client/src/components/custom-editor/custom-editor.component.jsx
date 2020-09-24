import React from "react";
import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import "./custom-editor.styles.scss";

const CustomRichEditor = ({ value, onChange }) => {
  return (
    <div className="custom-editor">
      <SunEditor setOptions={{ width: 700, height: 400, buttonList: buttonList.formatting, stickyToolbar: false }} setContents={value} onChange={onChange} />
    </div>
  )
};

export default CustomRichEditor;