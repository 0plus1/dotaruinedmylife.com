import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Libraries
import { Container, Columns } from 'bloomer';

import { getAccessToken, isLoggedIn } from '../../modules/AuthService';
import { apiReadAuthUser } from '../../actions';
import { postShape, authUserShape } from '../../shapes';

// Custom components
import NavbarTop from '../../containers/NavbarTop';
import ApiError from '../../components/ApiError';
import SiteFooter from '../../components/SiteFooter';

import './AppLayout.css';

export default function AppLayout(WrappedComponent) {
  class AppLayoutComponent extends Component {
    state = {
      error: null,
      openModal: false,
      loading: true,
    };

    componentDidMount() {
      const { actionApiReadAuthUser } = this.props;
      if (isLoggedIn()) {
        actionApiReadAuthUser(getAccessToken());
      }
    }

    render() {
      const { authUser, apiGenericErrorString } = this.props;
      return (
        <div>
          <NavbarTop
            isPrimary
            authUser={authUser}
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
    posts: PropTypes.arrayOf(postShape),
    authUser: authUserShape,
    apiGenericErrorString: PropTypes.string,
    actionApiReadAuthUser: PropTypes.func.isRequired,
  };

  AppLayoutComponent.defaultProps = {
    posts: null,
    authUser: null,
    apiGenericErrorString: null,
  };

  function mapStateToProps({ posts, authUser, apiGenericErrorString }) {
    return { posts, authUser, apiGenericErrorString };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ actionApiReadAuthUser: apiReadAuthUser }, dispatch);
  }

  return connect(mapStateToProps, mapDispatchToProps)(AppLayoutComponent);
}
