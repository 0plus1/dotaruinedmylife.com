import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { storeLog, LOG_LEVEL_ERROR } from '../modules/Logger';
import Post from '../components/Post';
import Loading from '../components/Loading';
import { apiDeletePost, raiseApiGenericError } from '../actions';
import { authShape, postShape } from '../shapes';

/**
 * This is just a redux container that wraps the post component
 * To add the delete functionality
 */
class RendersSinglePost extends Component {
  state = {
    loading: false,
    redirectHome: false,
  };

  async deleteSelf(postSlug) {
    const {
      isStory,
      auth,
      actionApiDeletePost,
      actionRaiseApiGenericError,
    } = this.props;
    confirmAlert({
      title: 'Are you sure you want to delete your post?',
      message: 'This action cannot be undone.',
      buttons: [
        {
          label: 'Yes, delete',
          onClick: () => {
            this.setState({ loading: true });
            actionApiDeletePost(postSlug, auth.token).then(() => {
              if (isStory) {
                this.setState({ redirectHome: true });
              }
            }).catch((error) => {
              this.setState({ loading: false });
              actionRaiseApiGenericError('Cannot reach API');
              storeLog(error, LOG_LEVEL_ERROR);
            });
          },
        },
        {
          label: 'No',
          onClick: () => { },
        },
      ],
    });
  }

  render() {
    const {
      post,
      auth,
      isStory,
      triggerPostUpdateHandler,
    } = this.props;
    const { user: authUser } = auth;
    const { redirectHome, loading } = this.state;
    let authUserId = null;
    if (authUser) {
      authUserId = authUser.id;
    }

    if (redirectHome === true) { return (<Redirect to="/" />); }
    if (loading === true) { return (<Loading />); }

    return (
      <Post
        post={post}
        authUserId={authUserId}
        isStory={isStory}
        deletePostHandler={(postSlug) => { this.deleteSelf(postSlug); }}
        triggerPostUpdateHandler={() => { triggerPostUpdateHandler(); }}
      />
    );
  }
}

RendersSinglePost.propTypes = {
  post: postShape.isRequired,
  auth: authShape.isRequired,
  isStory: PropTypes.bool,
  triggerPostUpdateHandler: PropTypes.func,
  actionApiDeletePost: PropTypes.func.isRequired,
  actionRaiseApiGenericError: PropTypes.func.isRequired,
};

RendersSinglePost.defaultProps = {
  triggerPostUpdateHandler: () => {},
  isStory: false,
};

function mapStateToProps({ auth }) {
  return { auth };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    actionApiDeletePost: apiDeletePost,
    actionRaiseApiGenericError: raiseApiGenericError,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RendersSinglePost);
