import React from 'react';
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import EstatePage from "./pages/estate/estate.component";
import TourEditor from "./pages/tour-editor/tour-editor.component";
import PromotedPage from "./pages/promoted/promoted.component";
import BlogPage from "./pages/blog/blog.component";
import UserPage from "./pages/user/user.component";

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/admin/estate" component={EstatePage} />
        <Route exact path="/admin/estate/tour-editor/:id" component={TourEditor} />
        <Route exact path="/admin/promoted" component={PromotedPage} />
        <Route exact path="/admin/blog" component={BlogPage} />
        <Route exact path="/admin/user" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;