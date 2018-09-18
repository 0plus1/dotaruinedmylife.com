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
  triggerPostUpdateHandler,
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
        <CardFooterItem>
          <ShareButtons markdown={post.markdown} />
        </CardFooterItem>
      )}
      {(post.user_id === authUserId && isStory)
      && (
        <React.Fragment>
          <CardFooterItem>
            <Button isOutlined isColor="warning" isSize="small" onClick={() => triggerPostUpdateHandler(post)}>
              Edit
            </Button>
          </CardFooterItem>
          <CardFooterItem>
            <Button isOutlined isColor="danger" isSize="small" onClick={() => deletePostHandler(post.slug)}>
              Delete
            </Button>
          </CardFooterItem>
        </React.Fragment>
      )}
    </CardFooter>);
};

PostFooter.propTypes = {
  post: postShape.isRequired,
  isStory: PropTypes.bool,
  isPreview: PropTypes.bool,
  authUserId: PropTypes.string,
  triggerPostUpdateHandler: PropTypes.func.isRequired,
  deletePostHandler: PropTypes.func.isRequired,
};

PostFooter.defaultProps = {
  authUserId: null,
  isStory: false,
  isPreview: false,
};

export default PostFooter;
