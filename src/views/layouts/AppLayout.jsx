import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Libraries
import { Container, Columns } from 'bloomer';

// Custom components
import NavbarTop from '../../containers/NavbarTop';
import ApiError from '../../components/ApiError';
import SiteFooter from '../../components/SiteFooter';
import { storeLog, LOG_LEVEL_ERROR } from '../../modules/Logger';

import { authUserRead, authUserLogout, raiseApiGenericError } from '../../actions';
import { authShape } from '../../shapes';

import './AppLayout.css';

export default function AppLayout(WrappedComponent) {
  class AppLayoutComponent extends Component {
    state = {
      error: null,
      openModal: false,
      loading: true,
    };

    componentDidMount() {
      const {
        auth,
        actionAuthUserRead,
        actionRaiseApiGenericError,
        actionAuthUserLogout,
      } = this.props;
      if (auth.loggedIn) {
        actionAuthUserRead(auth.token).catch((error) => {
          actionAuthUserLogout();
          actionRaiseApiGenericError('Cannot retrieve user, session expired! Please login again');
          storeLog(error, LOG_LEVEL_ERROR);
        });
      }
    }

    render() {
      const { apiGenericErrorString } = this.props;
      return (
        <div>
          <NavbarTop
            isPrimary
          />
          <Container>
            { apiGenericErrorString
              && <ApiError errorString={apiGenericErrorString} />
            }
            <Columns isMultiline isCentered>
              <WrappedComponent {...this.state} {...this.props} />
            </Columns>
          </Container>
          <SiteFooter />
        </div>
      );
    }
  }

  AppLayoutComponent.propTypes = {
    auth: authShape.isRequired,
    apiGenericErrorString: PropTypes.string,
    actionAuthUserRead: PropTypes.func.isRequired,
    actionAuthUserLogout: PropTypes.func.isRequired,
    actionRaiseApiGenericError: PropTypes.func.isRequired,
  };

  AppLayoutComponent.defaultProps = {
    apiGenericErrorString: null,
  };

  function mapStateToProps({ auth, apiGenericErrorString }) {
    return { auth, apiGenericErrorString };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      actionAuthUserRead: authUserRead,
      actionAuthUserLogout: authUserLogout,
      actionRaiseApiGenericError: raiseApiGenericError,
    }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(AppLayoutComponent);
}
