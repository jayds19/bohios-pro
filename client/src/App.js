import React from 'react';
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import EstatePage from "./pages/estate/estate.component";
import TourEditor from "./pages/tour-editor/tour-editor.component";
import PromotedPage from "./pages/promoted/promoted.component";

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/admin/estate" component={EstatePage} />
        <Route exact path="/admin/estate/tour-editor/:id" component={TourEditor} />
        <Route exact path="/admin/promoted" component={PromotedPage} />
      </Switch>
    </div>
  );
}

export default App;