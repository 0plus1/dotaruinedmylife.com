import {
  shape,
  string,
  number,
  bool,
} from 'prop-types';

export const authUserShape = shape({
  id: string.isRequired,
  avatar: string.isRequired,
  name: string.isRequired,
  profile_url: string.isRequired,
});

export const authShape = shape({
  token: string.isRequired,
  loggingIn: bool.isRequired,
  loggedIn: bool.isRequired,
  user: authUserShape,
});

export const postFormShape = shape({
  markdown: string.isRequired,
  playtime: number.isRequired,
  anonymous: bool.isRequired,
});

export const postShape = shape({
  markdown: string.isRequired,
  playtime: number.isRequired,
  slug: string.isRequired,
  timeago: string.isRequired,
  user_avatar: string.isRequired,
  user_id: string.isRequired,
  user_name: string.isRequired,
  user_profile_url: string.isRequired,
});
