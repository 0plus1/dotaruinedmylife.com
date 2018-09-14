import { combineReducers } from 'redux';

import {
  API_READ_PAGINATED_POSTS,
  API_CREATE_ONE_POST,
  API_DELETE_ONE_POST,
  AUTH_USER_LOGGING_IN,
  AUTH_USER_LOGIN,
  AUTH_USER_READ,
  AUTH_USER_LOGOUT,
  ERROR_API_GENERIC,
} from '../actions';

const PostsReducer = (state = [], action) => {
  // This is very hacky
  // TODO use normalizr
  const mergeWithoutDuplicates = (firstMergable, secondMergable) => {
    const mergedState = [...firstMergable, ...secondMergable];
    // Create an array of all slugs in the position they appear, duplicate ones will appear last
    const uniqueIdentifiersPositions = mergedState.map(el => el.slug);
    // Is the current item position the same of the uniqueItendifiersPositions
    // If it's in the wrong position it means it's duplicated
    return mergedState.filter((item, pos) => uniqueIdentifiersPositions.indexOf(item.slug) === pos);
  };

  switch (action.type) {
    case API_READ_PAGINATED_POSTS: {
      const posts = action.payload.data.data;
      // This is the first call, page 1
      // We populate the array directly from the API data
      // TODO refactor, inelegant
      if (!state.length) {
        return posts;
      }
      return mergeWithoutDuplicates(state, posts);
    }
    case API_CREATE_ONE_POST: {
      return [action.payload.data, ...state];
    }
    case API_DELETE_ONE_POST: {
      const deletedPost = action.payload.data;
      return state.filter(currentPost => currentPost.slug !== deletedPost.slug);
    }
    default: {
      return state;
    }
  }
};

const AuthReducerInitialState = {
  token: '',
  loggingIn: false,
  loggedIn: false,
  user: null,
};
const AuthReducer = (state = AuthReducerInitialState, action) => {
  const addToState = (currentState, toUpdate) => {
    return { ...currentState, ...toUpdate };
  };

  switch (action.type) {
    case AUTH_USER_LOGGING_IN:
      return addToState(state, { loggingIn: true });
    case AUTH_USER_LOGIN: {
      const payloadAccessToken = action.payload.data.access_token;
      return addToState(state, {
        token: payloadAccessToken,
        loggingIn: false,
        loggedIn: true,
      });
    }
    case AUTH_USER_READ: {
      const user = action.payload.data;
      return addToState(state, { user });
    }
    case AUTH_USER_LOGOUT: {
      return AuthReducerInitialState;
    }
    default:
      return state;
  }
};

const apiGenericErrorStringReducer = (state = null, action) => {
  switch (action.type) {
    case ERROR_API_GENERIC:
      return action.apiGenericErrorString;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  apiGenericErrorString: apiGenericErrorStringReducer,
});

export default rootReducer;
