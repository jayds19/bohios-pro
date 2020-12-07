import React from "react";
import { Link } from "react-router-dom";

import "./form-sidebar.styles.scss";

const FormSidebar = ({ current }) => (
  <div className="form-sidebar">
    <Link className={`sidebar-item ${current === 1 ? 'selected' : ''}`} to="/admin/estate">Inmuebles</Link>
    <Link className={`sidebar-item ${current === 2 ? 'selected' : ''}`} to="/admin/promoted">Promocionados</Link>
    <Link className={`sidebar-item ${current === 3 ? 'selected' : ''}`} to="/admin/blog">Blogs</Link>
    <Link className={`sidebar-item ${current === 4 ? 'selected' : ''}`} to="/admin/user">Usuarios</Link>
  </div>
);

export default FormSidebar;
