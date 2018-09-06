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
  NavbarEnd,
} from 'bloomer';

import LinkButton from '../components/LinkButton';
import { isLoggedIn } from '../modules/AuthService';
import Api from '../modules/Api';
import { storeLog, LOG_LEVEL_ERROR } from '../modules/Logger';
import { raiseApiGenericError } from '../actions';
import { authUserShape } from '../shapes';

import './NavbarTop.css';
import dotaLogo from '../icons/dota-2.svg';
import steamLogin from '../images/steam-login.png';

class NavbarTop extends Component {
  state = {
    isRedirectingToSteam: false,
  };

  /**
   * This method is interesting
   * I could argue that the readLoginUrl should be part of the AppLayout
   * But, getting the login url is part of the redirect process
   * TODO pre-cache the loginUrl?
   */
  redirectToSteam() {
    const { actionRaiseApiGenericError } = this.props;
    this.setState({ isRedirectingToSteam: true });
    Api.readLoginUrl()
      .then((response) => {
        window.location.href = response.data;
      })
      .catch((error) => {
        actionRaiseApiGenericError('Error validating credentials');
        storeLog(error, LOG_LEVEL_ERROR);
      });
  }

  render() {
    const { authUser } = this.props;
    const { isRedirectingToSteam } = this.state;
    return (
      <Navbar className="navbar-top" style={{ borderRadius: 0 }}>
        <NavbarBrand>
          <NavbarItem href="/#/">
            <span className="icon">
              <img src={dotaLogo} alt="DOTA ruined my life" />
            </span>
          </NavbarItem>
        </NavbarBrand>

        <NavbarMenu isActive>
          <NavbarEnd>
            { isLoggedIn() ? (
              <NavbarItem hasDropdown isHoverable>
                <NavbarLink>{ (authUser) ? authUser.name : '...' }</NavbarLink>
                <NavbarDropdown>
                  <NavbarItem href="/#/logout">Logout</NavbarItem>
                </NavbarDropdown>
              </NavbarItem>
            ) : (
              <NavbarItem onClick={() => { this.redirectToSteam(); }}>
                <LinkButton
                  isLoading={isRedirectingToSteam}
                  isActive={isRedirectingToSteam}
                >
                  <img src={steamLogin} alt="Login using steam" />
                </LinkButton>
              </NavbarItem>
            )}
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>
    );
  }
}

NavbarTop.propTypes = {
  authUser: authUserShape,
  actionRaiseApiGenericError: PropTypes.func.isRequired,
};

NavbarTop.defaultProps = {
  authUser: null,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ actionRaiseApiGenericError: raiseApiGenericError }, dispatch);
}

export default connect(null, mapDispatchToProps)(NavbarTop);
