import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { raiseApiGenericError } from '../actions';

import AppLayout from './layouts/AppLayout';
import Api from '../modules/Api';
import { storeLog, LOG_LEVEL_ERROR } from '../modules/Logger';
import { setAccessToken } from '../modules/AuthService';
import Loading from '../components/Loading';

/**
 * This component acts as a bridge between steam and the backend
 */
class OauthLoginView extends Component {
  state = {
    loading: true,
  };

  componentWillMount() {
    const { location, actionRaiseApiGenericError } = this.props;
    Api.readTokenFromOauthParams(location.search).then((response) => {
      const accessToken = response.data.access_token;
      setAccessToken(accessToken);
      this.setState({ loading: false });
    }).catch((error) => {
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
  actionRaiseApiGenericError: PropTypes.func.isRequired,
};

const OauthLogin = AppLayout(OauthLoginView);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    actionRaiseApiGenericError: raiseApiGenericError,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(OauthLogin);
