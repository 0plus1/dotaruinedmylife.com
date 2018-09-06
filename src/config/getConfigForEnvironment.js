import appConfig from './app.json';

export default function getConfigForEnvironment() {
  return appConfig[process.env.NODE_ENV];
}
