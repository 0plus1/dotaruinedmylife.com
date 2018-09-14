import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  CardFooter,
  CardFooterItem,
  Button,
} from 'bloomer';

import ShareButtons from './ShareButtons';
import { postShape } from '../shapes';

const PostFooter = ({
  post,
  isStory,
  isPreview,
  authUserId,
  deletePostHandler,
}) => {
  const permalink = `/story/${post.slug}`;
  if (isPreview === true) {
    return <CardFooter />;
  }
  return (
      <CardFooter>
        {(isStory === false) ? (
            <CardFooterItem>
              <Link href={permalink} to={permalink}>
                Permalink
              </Link>
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
};

PostFooter.propTypes = {
  // https://github.com/yannickcr/eslint-plugin-react/issues/1389
  // TODO follow up
  // eslint-disable-next-line react/no-typos
  post: postShape.isRequired,
  isStory: PropTypes.bool,
  isPreview: PropTypes.bool,
  authUserId: PropTypes.string,
  deletePostHandler: PropTypes.func.isRequired,
};

PostFooter.defaultProps = {
  authUserId: null,
  isStory: false,
  isPreview: false,
};

export default PostFooter;
