import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { storeLog, LOG_LEVEL_ERROR } from '../modules/Logger';
import { getAccessToken } from '../modules/AuthService';
import Post from '../components/Post';
import Loading from '../components/Loading';
import { apiDeletePost, raiseApiGenericError } from '../actions';
import { postShape, authUserShape } from '../shapes';

/**
 * This is just a redux container that wraps the post component
 * To add the delete functionality
 */
class RendersSinglePost extends Component {
  state = {
    loading: false,
  };

  async deleteSelf(postSlug) {
    const { actionApiDeletePost, actionRaiseApiGenericError } = this.props;
    confirmAlert({
      title: 'Are you sure you want to delete your post?',
      message: 'This action cannot be undone.',
      buttons: [
        {
          label: 'Yes, delete',
          onClick: () => {
            this.setState({ loading: true });
            actionApiDeletePost(postSlug, getAccessToken())
              .catch((error) => {
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
    const { post, authUser, isStory } = this.props;
    const { loading } = this.state;
    let authUserId = null;
    if (authUser) {
      authUserId = authUser.id;
    }

    if (loading === true) {
      return (
        <Loading />
      );
    }

    return (
      <Post
        post={post}
        authUserId={authUserId}
        isStory={isStory}
        deletePostHandler={(postSlug) => { this.deleteSelf(postSlug); }}
      />
    );
  }
}

RendersSinglePost.propTypes = {
  // https://github.com/yannickcr/eslint-plugin-react/issues/1389
  // TODO follow up
  // eslint-disable-next-line react/no-typos
  post: postShape.isRequired,
  authUser: authUserShape,
  isStory: PropTypes.bool,
  actionApiDeletePost: PropTypes.func.isRequired,
  actionRaiseApiGenericError: PropTypes.func.isRequired,
};

RendersSinglePost.defaultProps = {
  authUser: null,
  isStory: false,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    actionApiDeletePost: apiDeletePost,
    actionRaiseApiGenericError: raiseApiGenericError,
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(RendersSinglePost);
