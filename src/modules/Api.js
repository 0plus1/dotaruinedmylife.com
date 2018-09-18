import axios from 'axios';

import getConfigForEnvironment from '../config/getConfigForEnvironment';

function addAuthorizationHeader(token) {
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
}

class Api {
  constructor(config) {
    this.instance = axios.create({
      baseURL: config.api.baseUri,
      // TODO Needs investigaton
      // eslint-disable-next-line max-len
      // A timeout of ~1000 will fail upon the first request as the browser is busy downloading react
      timeout: 30000,
      headers: { Accept: 'application/vnd.drml.v1+json' },
    });
  }

  readPaginatedPosts(page) {
    return this.instance.get(`posts?page=${page}`);
  }

  createPost(body, token) {
    return this.instance.post('post/create', body, addAuthorizationHeader(token));
  }

  updatePost(postSlug, body, token) {
    return this.instance.patch(`post/${postSlug}/update`, body, addAuthorizationHeader(token));
  }

  readPost(postSlug) {
    return this.instance.get(`post/${postSlug}/read`);
  }

  deletePost(postSlug, token) {
    return this.instance.delete(`post/${postSlug}/delete`, addAuthorizationHeader(token));
  }

  readUserFromToken(token) {
    return this.instance.get('user/read', addAuthorizationHeader(token));
  }

  readLoginUrl() {
    return this.instance.get('openid/login/read');
  }

  readTokenFromOauthParams(params) {
    return this.instance.get(`openid/login/do${params}`);
  }
}

export default new Api(getConfigForEnvironment());
