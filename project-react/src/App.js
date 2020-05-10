import React from 'react';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

import { BrowserRouter as Router, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/register" component={Register} />
      </Router>
    </div>
  );
}

export default App;
