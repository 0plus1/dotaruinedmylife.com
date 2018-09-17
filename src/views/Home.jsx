import React, { Component } from 'react';
import { Button } from 'bloomer';

import AppLayout from './layouts/AppLayout';
import RendersPosts from '../containers/RendersPosts';
import CreatesOrUpdatesPost from '../containers/CreatesOrUpdatesPost';
import { authShape } from '../shapes';

class HomeView extends Component {
  state = {
    createPostModalOpen: false,
  };

  render() {
    const { auth } = this.props;
    const { user: authUser } = auth;
    const { createPostModalOpen } = this.state;
    return (
      <div>
        {(auth.loggedIn && authUser !== null)
        && (
          <React.Fragment>
            <Button isColor="info" onClick={() => this.setState({ createPostModalOpen: true })}>Create Post</Button>
            <CreatesOrUpdatesPost
              authUser={authUser}
              openModal={createPostModalOpen}
              clickCloseModalHandler={() => this.setState({ createPostModalOpen: false })}
            />
          </React.Fragment>
        )}
        <RendersPosts authUser={authUser} />
      </div>
    );
  }
}

HomeView.propTypes = {
  auth: authShape.isRequired,
};

const Home = AppLayout(HomeView);

export default Home;
