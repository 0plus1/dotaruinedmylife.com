import React from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AppLayout from './layouts/AppLayout';
import { clearAccessToken } from '../modules/AuthService';
import { userLogout } from '../actions';

const LogoutView = ({ actionLogout }) => {
  actionLogout();
  clearAccessToken();
  return <Redirect to="/" />;
};

LogoutView.propTypes = {
  actionLogout: PropTypes.func.isRequired,
};

const Logout = AppLayout(LogoutView);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ actionLogout: userLogout }, dispatch);
}

export default connect(null, mapDispatchToProps)(Logout);
