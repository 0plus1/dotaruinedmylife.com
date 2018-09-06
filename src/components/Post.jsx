import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';

import {
  Card,
  Image,
  Media,
  MediaLeft,
  MediaContent,
  Content,
  Title,
  Subtitle,
  CardContent,
  CardFooter,
  CardFooterItem,
  Button,
} from 'bloomer';

import RendersMarkdown from './RendersMarkdown';
import Truncate from './Truncate';
import ShareButtons from './ShareButtons';
import { postShape } from '../shapes';

import './Post.css';
import defaultAvatar from '../icons/avatar.svg';

const DOTA_WEBSITE = 'https://www.dota2.com/';

/**
 * Please do not call this component directly
 * Use containers/RendersSinglePost.jsx
 */
class Post extends Component {
  displayFooter() {
    const {
      post,
      isStory,
      isPreview,
      authUserId,
      deletePostHandler,
    } = this.props;
    const permalink = `/story/${post.slug}`;
    if (isPreview === true) {
      return <CardFooter />;
    }
    return (
      <CardFooter>
        {(isStory === false) ? (
          <CardFooterItem>
            <Button>
              <Link href={permalink} to={permalink}>
                Permalink
              </Link>
            </Button>
          </CardFooterItem>
        ) : (
          <ShareButtons markdown={post.markdown} />
        )
        }
        {(post.user_id === authUserId)
          && (
            <CardFooterItem>
              <Button onClick={() => deletePostHandler(post.slug)}>
                Delete
              </Button>
            </CardFooterItem>
          )
        }
      </CardFooter>);
  }

  render() {
    const { post, isStory } = this.props;

    return (
      <Card>
        <CardContent>
          <Media>
            <MediaLeft>
              <Image isSize="48x48" src={(post.user_avatar !== '') ? post.user_avatar : defaultAvatar} />
            </MediaLeft>
            <MediaContent>
              <Title isSize={4}>{(post.user_name !== '') ? post.user_name : 'anon'}</Title>
              <Subtitle isSize={6}>
                <a
                  href={(post.user_profile_url !== '') ? post.user_profile_url : DOTA_WEBSITE}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @steam
                </a>
              </Subtitle>
            </MediaContent>
          </Media>
          <Content>
            <Title isSize={4}>
              {post.playtime}
              {' '}
              hours
            </Title>
          </Content>
          <Content>
            <Truncate forceOpen={isStory}>
              <RendersMarkdown markdown={post.markdown} />
            </Truncate>
            <br />
            <small><TimeAgo date={post.timeago} /></small>
          </Content>
        </CardContent>
        { this.displayFooter() }
      </Card>
    );
  }
}

Post.propTypes = {
  // https://github.com/yannickcr/eslint-plugin-react/issues/1389
  // TODO follow up
  // eslint-disable-next-line react/no-typos
  post: postShape.isRequired,
  isStory: PropTypes.bool,
  isPreview: PropTypes.bool,
  authUserId: PropTypes.string,
  deletePostHandler: PropTypes.func.isRequired,
};

Post.defaultProps = {
  authUserId: null,
  isStory: false,
  isPreview: false,
};

export default Post;
