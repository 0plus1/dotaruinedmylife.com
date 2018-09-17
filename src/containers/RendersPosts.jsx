import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Columns, Column } from 'bloomer';
import Waypoint from 'react-waypoint';

import { storeLog, LOG_LEVEL_ERROR } from '../modules/Logger';
import RendersSinglePost from './RendersSinglePost';
import Loading from '../components/Loading';
import { apiReadPaginatedPosts, raiseApiGenericError } from '../actions';
import { postShape } from '../shapes';


class RendersPosts extends Component {
  state = {
    loading: true,
    currentPage: 1,
    lastPage: 0,
  };

  componentDidMount() {
    this.loadPostsInCurrentPage();
  }

  loadNextPostsPage() {
    // This feels a bit dodgy but it's ok for now
    // TODO refactor for added elegance
    const { currentPage, lastPage } = this.state;
    const nextPage = currentPage + 1;
    if (nextPage > lastPage) {
      return;
    }
    this.setState({ currentPage: nextPage });
    this.loadPostsInCurrentPage();
  }

  loadPostsInCurrentPage() {
    const { actionApiReadPaginatedPosts, actionRaiseApiGenericError } = this.props;
    const { currentPage } = this.state;

    actionApiReadPaginatedPosts(currentPage).then((response) => {
      this.setState({
        loading: false,
        lastPage: response.payload.data.meta.pagination.total_pages,
      });
    }).catch((error) => {
      actionRaiseApiGenericError('Cannot reach API');
      storeLog(error, LOG_LEVEL_ERROR);
    });
  }

  renderPosts() {
    const { posts } = this.props;
    return posts.map(post => (
      <Column isSize={{ desktop: '1/3', tablet: '1/2', mobile: 'full' }} key={post.slug}>
        <RendersSinglePost post={post} />
      </Column>
    ));
  }

  render() {
    const { loading } = this.state;

    if (loading === true) {
      return (
        <Loading />
      );
    }

    return (
      <Column>
        <Columns isMultiline isCentered style={{ marginTop: '25px' }}>
          {this.renderPosts()}
          <Waypoint
            onEnter={() => { this.loadNextPostsPage(); }}
            threshold={2.0}
          />
        </Columns>
      </Column>
    );
  }
}

RendersPosts.propTypes = {
  posts: PropTypes.arrayOf(postShape),
  actionApiReadPaginatedPosts: PropTypes.func.isRequired,
  actionRaiseApiGenericError: PropTypes.func.isRequired,
};

RendersPosts.defaultProps = {
  posts: null,
};

function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    actionApiReadPaginatedPosts: apiReadPaginatedPosts,
    actionRaiseApiGenericError: raiseApiGenericError,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RendersPosts);
