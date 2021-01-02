import React, {Component} from 'react';
import {Switch, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

import AddUser from "./components/add-user.component";
import User from "./components/user.component";
import UserList from "./components/user-list.component";

class App extends React.Component {
  render(){
    return(
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/User" className="navbar-brand">
          User
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/User"} className="nav-link">
              User
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/User"]} component={UserList} />
          <Route path="/User/:UserID" component={User} />
        </Switch>
      </div>
    </div>
    )
}
}

export default App;
