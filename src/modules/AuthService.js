import decode from 'jwt-decode';

const ACCESS_TOKEN_KEY = 'access_token';

const { localStorage } = window;

function isTokenExpired(token) {
  const getTokenExpirationDate = (encodedToken) => {
    const decodedToken = decode(encodedToken);
    if (!decodedToken.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);

    return date;
  };
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function getAccessToken() {
  // This is to handle the situation in which something went wrong
  if (localStorage.getItem(ACCESS_TOKEN_KEY) === 'undefined') {
    clearAccessToken();
    return null;
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function isLoggedIn() {
  const accessToken = getAccessToken();
  return !!accessToken && !isTokenExpired(accessToken);
}
