import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';

import firebase from './firebase';
import Dashboard from './components/Dashboard';
import Homepage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(()=> {
    firebase.isInitialized().then(val=>{
      setFirebaseInitialized(val);
    });
  });

  return firebaseInitialized !== false ? (
    <main className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/dashboard' component={Dashboard} />
        </Switch>
      </Router>
    </main>
  ) : (
    <header className="App-header">
    <h1>Recommender</h1>
    <h2>Loading...</h2>
    </header>
  )
}

export default App;
