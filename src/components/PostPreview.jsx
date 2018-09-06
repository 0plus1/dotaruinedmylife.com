import React from 'react';
import PropTypes from 'prop-types';

import Post from './Post';
import { authUserShape } from '../shapes';

const PostPreview = (props) => {
  const {
    authUser,
    anonymous,
    playtime,
    markdown,
  } = props;
  let previewPost = {
    user_id: authUser.id,
    user_avatar: authUser.avatar,
    user_name: authUser.name,
    user_profile_url: authUser.profile_url,
    playtime,
    markdown,
    slug: '',
    timeago: new Date().getTime(),
  };
  if (anonymous === true) {
    previewPost = Object.assign({}, previewPost, {
      user_avatar: '',
      user_name: '',
      user_profile_url: '',
    });
  }

  return (<Post post={previewPost} />);
};

PostPreview.propTypes = {
  // https://github.com/yannickcr/eslint-plugin-react/issues/1389
  // TODO follow up
  // eslint-disable-next-line react/no-typos
  authUser: authUserShape.isRequired,
  anonymous: PropTypes.bool.isRequired,
  playtime: PropTypes.number.isRequired,
  markdown: PropTypes.string.isRequired,
};

export default PostPreview;
