import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'bloomer';

import { isLoggedIn } from '../modules/AuthService';
import AppLayout from './layouts/AppLayout';
import RendersPosts from '../containers/RendersPosts';
import CreatesPost from '../containers/CreatesPost';
import { authUserShape, postShape } from '../shapes';

class HomeView extends Component {
  state = {
    createPostModalOpen: false,
  };

  render() {
    const { authUser, posts } = this.props;
    const { createPostModalOpen } = this.state;
    return (
      <div>
        {(isLoggedIn() && authUser !== null)
        && (
          <div>
            <Button isColor="info" onClick={() => this.setState({ createPostModalOpen: true })}>Create Post</Button>
            <CreatesPost
              authUser={authUser}
              openModal={createPostModalOpen}
              clickCloseModalHandler={() => this.setState({ createPostModalOpen: false })}
            />
          </div>
        )}
        <RendersPosts posts={posts} authUser={authUser} />
      </div>
    );
  }
}

HomeView.propTypes = {
  authUser: authUserShape,
  posts: PropTypes.arrayOf(postShape),
};

HomeView.defaultProps = {
  authUser: null,
  posts: {},
};

const Home = AppLayout(HomeView);

export default Home;
