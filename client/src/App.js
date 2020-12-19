import "./styles.scss";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/bubblepage">
            <Route exact path="/bubblepage" component={BubblePage} />
        </PrivateRoute>
      </div>
    </Router>
  );
}

export default App;
