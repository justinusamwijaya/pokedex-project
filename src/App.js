import React from 'react';
import Navbar from './components/Navbar.component';
import './App.css';import {
  BrowserRouter as Router, Route, Switch 
} from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Switch>
          { routes.map( route => {
              return <Route key={ route.path } { ...route } />
            } ) }
        </Switch>
      </div>
    </Router>
  );
}

export default App;
