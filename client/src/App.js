import React from 'react';
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import EstatePage from "./pages/estate/estate.component";

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/admin/estate" component={EstatePage} />
      </Switch>
    </div>
  );
}

export default App;