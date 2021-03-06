//Dildakhan Darkhan (1155086654)
//Jumageldiyev Myratgeldi (1155118066)
//Manuchehr Tursunov (1155118876)
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './components/Login';
import Register from './components/Register';
// import Home from './components/Home';
import DetailedView from './components/DetailedView';
import Favourites from './components/Favourites';
import Admin from './components/Admin';
import Test from './components/Test';


function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Test} />
        <Route path="/register" component={Register} />
        <Route path="/details" component={DetailedView} />
        <Route path="/favourites" component={Favourites} />
        <Route path="/admin" component={Admin} />
      </Router>
    </div>
  );
}

export default App;
