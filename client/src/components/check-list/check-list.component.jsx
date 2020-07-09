import React from "react";

import "./check-list.styles.scss";

const CheckList = ({ label, mainCheck, items, handleItemClick, handleItemReset }) => (
  <div className="check-list">
    <label className="check-list-label">{label} <input type="checkbox" checked={mainCheck} onChange={handleItemReset} /></label>
    <div className="list">
      {items.map(item => (
        <label key={item.id}>
          <input type="checkbox" checked={item.active} onChange={() => handleItemClick(item.id)} />
          {item.description}
        </label>
      ))}
    </div>
  </div>
);

export default CheckList;