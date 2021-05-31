import React, { Fragment } from 'react';
import { Link , } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import navbar from '../../img/navbar.png';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {


  return (
    <Fragment>
        <nav className="navbar bg-dark" >
          <img src = {navbar}></img>
        </nav>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
