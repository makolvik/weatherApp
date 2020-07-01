import React from "react";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Weather } from "./components/weather-page";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Weather />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
