import React from 'react';
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
} from 'bloomer';

import RendersMarkdown from './RendersMarkdown';
import Truncate from './Truncate';
import PostFooter from './PostFooter';
import { postShape } from '../shapes';

import './Post.css';
import defaultAvatar from '../icons/avatar.svg';

const DOTA_WEBSITE = 'https://www.dota2.com/';

/**
 * Please do not call this component directly
 * Use containers/RendersSinglePost.jsx
 */
const Post = (props) => {
  const { post, isStory } = props;

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
          {post.edited && (
            <React.Fragment>
              <br />
              <small>(Edited)</small>
            </React.Fragment>
          )}
        </Content>
      </CardContent>
      <PostFooter {...props} />
    </Card>
  );
};

Post.propTypes = {
  post: postShape.isRequired,
  isStory: PropTypes.bool,
  isPreview: PropTypes.bool,
  authUserId: PropTypes.string,
  triggerPostUpdateHandler: PropTypes.func,
  deletePostHandler: PropTypes.func.isRequired,
};

Post.defaultProps = {
  triggerPostUpdateHandler: () => {},
  authUserId: null,
  isStory: false,
  isPreview: false,
};

export default Post;
