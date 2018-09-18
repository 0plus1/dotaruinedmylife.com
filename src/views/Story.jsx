import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Column, Button } from 'bloomer';

import AppLayout from './layouts/AppLayout';
import CreatesOrUpdatesPost from '../containers/CreatesOrUpdatesPost';
import Loading from '../components/Loading';
import RendersSinglePost from '../containers/RendersSinglePost';
import { storeLog, LOG_LEVEL_ERROR } from '../modules/Logger';

import { apiReadOnePost, raiseApiGenericError } from '../actions';
import { postShape, authShape } from '../shapes';

class StoryView extends Component {
  state = {
    loading: true,
    updatePostModalOpen: false,
  };

  updatePost(postSlug) {

  }

  componentWillMount() {
    const {
      posts,
      match,
      actionApiReadOnePost,
      actionRaiseApiGenericError,
    } = this.props;
    if (posts.length === 0) {
      actionApiReadOnePost(match.params.slug).then(() => {
        this.setState({ loading: false });
      }).catch((error) => {
        actionRaiseApiGenericError('Unable to reach the API');
        storeLog(error, LOG_LEVEL_ERROR);
      });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { match, posts, auth } = this.props;
    const { user: authUser } = auth;
    const { loading, updatePostModalOpen } = this.state;

    if (loading === true) {
      return <Loading />;
    }
    const postSlug = match.params.slug;
    const post = posts.find(iteratedPost => iteratedPost.slug === postSlug);

    return (
      <React.Fragment>
        <CreatesOrUpdatesPost
          authUser={authUser}
          openModal={updatePostModalOpen}
          clickCloseModalHandler={() => this.setState({ updatePostModalOpen: false })}
          post={post}
        />
        <Column>
          <Button isColor="info" href="/#/">View all</Button>
          <Column isSize="full">
            <RendersSinglePost
              post={post}
              authUser={authUser}
              triggerPostUpdateHandler={() => this.setState({ updatePostModalOpen: true })}
              isStory
            />
          </Column>
        </Column>
      </React.Fragment>
    );
  }
}

StoryView.propTypes = {
  auth: authShape.isRequired,
  posts: PropTypes.arrayOf(postShape),
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  actionApiReadOnePost: PropTypes.func.isRequired,
  actionRaiseApiGenericError: PropTypes.func.isRequired,
};

StoryView.defaultProps = {
  posts: null,
};

const Story = AppLayout(StoryView);

function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    actionApiReadOnePost: apiReadOnePost,
    actionRaiseApiGenericError: raiseApiGenericError,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Story);
