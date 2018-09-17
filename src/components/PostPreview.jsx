import React from 'react';

import Post from './Post';
import { authUserShape, postFormShape } from '../shapes';

const PostPreview = (props) => {
  const {
    authUser,
    formData,
  } = props;
  const {
    anonymous,
    playtime,
    markdown,
  } = formData;

  let previewPost = {
    user_id: authUser.id,
    user_avatar: authUser.avatar,
    user_name: authUser.name,
    user_profile_url: authUser.profile_url,
    playtime,
    markdown,
    slug: '',
    timeago: new Date().toISOString(),
  };
  if (anonymous === true) {
    previewPost = Object.assign({}, previewPost, {
      user_avatar: '',
      user_name: '',
      user_profile_url: '',
    });
  }

  return (<Post post={previewPost} isPreview deletePostHandler={() => null} />);
};

PostPreview.propTypes = {
  // https://github.com/yannickcr/eslint-plugin-react/issues/1389
  // TODO follow up
  // eslint-disable-next-line react/no-typos
  authUser: authUserShape.isRequired,
  formData: postFormShape.isRequired,
};

export default PostPreview;
