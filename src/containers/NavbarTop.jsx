import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarLink,
  NavbarDropdown,
  NavbarBurger,
  NavbarEnd,
} from 'bloomer';

import LinkButton from '../components/LinkButton';
import Api from '../modules/Api';
import { storeLog, LOG_LEVEL_ERROR } from '../modules/Logger';
import { authUserLoggingIn, authUserLogout, raiseApiGenericError } from '../actions';
import { authShape } from '../shapes';

import './NavbarTop.css';
import dotaLogo from '../icons/dota-2.svg';
import steamLogin from '../images/steam-login.png';

class NavbarTop extends Component {
  state = {
    isActive: false,
  };

  /**
   * This method is interesting
   * I could argue that the readLoginUrl should be part of the AppLayout
   * But, getting the login url is part of the redirect process
   * TODO pre-cache the loginUrl?
   */
  redirectToSteam() {
    const { actionAuthUserLoggingIn, actionRaiseApiGenericError } = this.props;
    console.log(actionAuthUserLoggingIn);
    actionAuthUserLoggingIn();
    Api.readLoginUrl()
      .then((response) => {
        window.location.href = response.data;
      })
      .catch((error) => {
        actionRaiseApiGenericError('Error validating credentials');
        storeLog(error, LOG_LEVEL_ERROR);
      });
  }

  logoutUser() {
    const { actionAuthUserLogout } = this.props;
    actionAuthUserLogout();
  }

  toggleNav() {
    const { isActive } = this.state;
    this.setState({ isActive: !isActive });
  }

  render() {
    const { auth } = this.props;
    const { user: authUser } = auth;
    const { isActive } = this.state;

    const steamLoginButton = (auth.loggingIn ? (
      <LinkButton
        isLoading
        isActive={false}
      >
        {' '}
      </LinkButton>
    ) : (
      <LinkButton
        onClick={() => { this.redirectToSteam(); }}
      >
        <img src={steamLogin} alt="Login using steam" />
      </LinkButton>)
    );

    return (
      <Navbar className="navbar-top" style={{ borderRadius: 0 }}>
        <NavbarBrand>
          <NavbarItem href="/#/">
            <span className="icon">
              <img src={dotaLogo} alt="DOTA ruined my life" />
            </span>
          </NavbarItem>
          <NavbarItem isHidden="desktop">
            { steamLoginButton }
          </NavbarItem>
          <NavbarBurger isActive={isActive} onClick={() => this.toggleNav()} />
        </NavbarBrand>

        <NavbarMenu isActive={isActive}>
          <NavbarEnd>
            { auth.loggedIn ? (
              <NavbarItem hasDropdown isHoverable>
                <NavbarLink>{ (authUser) ? authUser.name : '...' }</NavbarLink>
                <NavbarDropdown>
                  <NavbarItem style={{ cursor: 'pointer' }} onClick={() => this.logoutUser()}>Logout</NavbarItem>
                </NavbarDropdown>
              </NavbarItem>
            ) : (
              <NavbarItem isHidden="touch">
                { steamLoginButton }
              </NavbarItem>
            )}
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>
    );
  }
}

NavbarTop.propTypes = {
  auth: authShape.isRequired,
  actionAuthUserLoggingIn: PropTypes.func.isRequired,
  actionAuthUserLogout: PropTypes.func.isRequired,
  actionRaiseApiGenericError: PropTypes.func.isRequired,
};

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    actionAuthUserLoggingIn: authUserLoggingIn,
    actionAuthUserLogout: authUserLogout,
    actionRaiseApiGenericError: raiseApiGenericError,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarTop);
