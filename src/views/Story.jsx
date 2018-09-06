import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Column, Button } from 'bloomer';

import AppLayout from './layouts/AppLayout';
import Loading from '../components/Loading';
import RendersSinglePost from '../containers/RendersSinglePost';
import Api from '../modules/Api';
import { storeLog, LOG_LEVEL_ERROR } from '../modules/Logger';

import { raiseApiGenericError } from '../actions';
import { authUserShape } from '../shapes';

class StoryView extends Component {
  state = {
    loading: true,
    post: null,
  };

  componentWillMount() {
    const { match, actionRaiseApiGenericError } = this.props;

    // TODO should this be an action?
    Api.readPost(match.params.slug).then((response) => {
      this.setState({ loading: false, post: response.data });
    }).catch((error) => {
      this.setState({ loading: false });
      actionRaiseApiGenericError('Unable to reach the API');
      storeLog(error, LOG_LEVEL_ERROR);
    });
  }

  render() {
    const { authUser } = this.props;
    const { loading, post } = this.state;
    if (loading === true) {
      return <Loading />;
    }

    return (
      <Column>
        <Button isColor="info" href="/#/">View all</Button>
        <Column isSize="full">
          <RendersSinglePost post={post} authUser={authUser} isStory />
        </Column>
      </Column>
    );
  }
}

StoryView.propTypes = {
  authUser: authUserShape,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  actionRaiseApiGenericError: PropTypes.func.isRequired,
};

StoryView.defaultProps = {
  authUser: null,
};

const Story = AppLayout(StoryView);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ actionRaiseApiGenericError: raiseApiGenericError }, dispatch);
}

export default connect(null, mapDispatchToProps)(Story);
