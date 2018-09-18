import Api from '../modules/Api';

export const API_READ_PAGINATED_POSTS = 'API_READ_PAGINATED_POSTS';
export const API_READ_ONE_POST = 'API_READ_ONE_POST';
export const API_CREATE_ONE_POST = 'API_CREATE_ONE_POST';
export const API_UPDATE_ONE_POST = 'API_UPDATE_ONE_POST';
export const API_DELETE_ONE_POST = 'API_DELETE_ONE_POST';

export const AUTH_USER_LOGGING_IN = 'AUTH_USER_LOGGING_IN';
export const AUTH_USER_LOGIN = 'AUTH_USER_LOGIN';
export const AUTH_USER_READ = 'AUTH_USER_READ';
export const AUTH_USER_LOGOUT = 'AUTH_USER_LOGOUT';

export const ERROR_API_GENERIC = 'ERROR_API_GENERIC';

export function apiReadPaginatedPosts(page) {
  const request = Api.readPaginatedPosts(page);

  return {
    type: API_READ_PAGINATED_POSTS,
    payload: request,
  };
}

export function apiReadOnePost(postSlug) {
  const request = Api.readPost(postSlug);

  return {
    type: API_READ_ONE_POST,
    payload: request,
  };
}

export function apiCreatePost(body, token) {
  const request = Api.createPost(body, token);

  return {
    type: API_CREATE_ONE_POST,
    payload: request,
  };
}

export function apiUpdatePost(postSlug, body, token) {
  const request = Api.updatePost(postSlug, body, token);

  return {
    type: API_UPDATE_ONE_POST,
    payload: request,
  };
}

export function apiDeletePost(postSlug, token) {
  const request = Api.deletePost(postSlug, token);

  return {
    type: API_DELETE_ONE_POST,
    payload: request,
  };
}

export function authUserLoggingIn() {
  return {
    type: AUTH_USER_LOGGING_IN,
  };
}

export function authUserLogin(search) {
  const request = Api.readTokenFromOauthParams(search);

  return {
    type: AUTH_USER_LOGIN,
    payload: request,
  };
}

export function authUserRead(token) {
  const request = Api.readUserFromToken(token);

  return {
    type: AUTH_USER_READ,
    payload: request,
  };
}

export function authUserLogout() {
  return {
    type: AUTH_USER_LOGOUT,
  };
}

export function raiseApiGenericError(apiGenericErrorString) {
  return {
    type: ERROR_API_GENERIC,
    apiGenericErrorString,
  };
}
