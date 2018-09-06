import { combineReducers } from 'redux';

import {
  API_READ_PAGINATED_POSTS,
  API_CREATE_ONE_POST,
  API_DELETE_ONE_POST,
  API_READ_AUTH_USER,
  ERROR_API_GENERIC,
} from '../actions';

const PostsReducer = (state = [], action) => {
  switch (action.type) {
    case API_READ_PAGINATED_POSTS: {
      const posts = action.payload.data.data;
      // This is the first call, page 1
      // We populate the array directly from the API data
      // TODO refactor, inelegant
      if (!state.length) {
        return posts;
      }
      return [...state, ...posts];
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

const AuthUserReducer = (state = null, action) => {
  switch (action.type) {
    case API_READ_AUTH_USER:
      return action.payload.data;
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
  authUser: AuthUserReducer,
  apiGenericErrorString: apiGenericErrorStringReducer,
});

export default rootReducer;
