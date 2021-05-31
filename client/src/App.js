import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import SchoolList from './components/schools/SchoolList';
import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container  } from "react-bootstrap";
import navbar from '../src/img/navbar.png';

import './App.css';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            {/* <Navbar /> */}
            <Navbar className="navbar" >
              <Nav className="navbarItem " pullRight >
                  <Nav.Link  href="#home"><p className="linkItem">Riders</p></Nav.Link>
                  <Nav.Link  href="#features"><p className="linkItem">Schools</p></Nav.Link>
                  <Nav.Link  href="#pricing"><p className="linkItem">Stores</p></Nav.Link>
                  <Nav.Link  href="#pricing"><p className="linkItem">Brands</p></Nav.Link>
              </Nav>
            </Navbar>
            <SchoolList />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
