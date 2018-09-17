import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { authUserLoggingIn, authUserLogin, authUserLogout, raiseApiGenericError } from '../actions';

import AppLayout from './layouts/AppLayout';
import { storeLog, LOG_LEVEL_ERROR } from '../modules/Logger';
import Loading from '../components/Loading';

/**
 * This component acts as a bridge between steam and the backend
 * Takes the location.search parameters and pass it directly to the backend
 */
class OauthLoginView extends Component {
  state = {
    loading: true,
  };

  componentWillMount() {
    const {
      location,
      actionAuthUserLoggingIn,
      actionAuthUserLogin,
      actionRaiseApiGenericError,
    } = this.props;
    // Mark user as being logged int
    actionAuthUserLoggingIn();
    actionAuthUserLogin(location.search).then(() => {
      this.setState({ loading: false });
    }).catch((error) => {
      // Reset state if a user cannot be validated from oauth
      const { actionAuthUserLogout } = this.props;
      actionAuthUserLogout();
      this.setState({ loading: false });
      actionRaiseApiGenericError('Error validating credentials');
      storeLog(error, LOG_LEVEL_ERROR);
    });
  }

  render() {
    const { loading } = this.state;
    if (loading === true) {
      return <Loading />;
    }

    return <Redirect to="/" />;
  }
}

OauthLoginView.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.node.isRequired,
  }).isRequired,
  actionAuthUserLoggingIn: PropTypes.func.isRequired,
  actionAuthUserLogin: PropTypes.func.isRequired,
  actionAuthUserLogout: PropTypes.func.isRequired,
  actionRaiseApiGenericError: PropTypes.func.isRequired,
};

const OauthLogin = AppLayout(OauthLoginView);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    actionAuthUserLoggingIn: authUserLoggingIn,
    actionAuthUserLogin: authUserLogin,
    actionAuthUserLogout: authUserLogout,
    actionRaiseApiGenericError: raiseApiGenericError,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(OauthLogin);
