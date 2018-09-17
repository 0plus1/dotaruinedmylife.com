/* global Rollbar */
export const LOG_LEVEL_ERROR = 'ERROR';

/**
 * TODO push logs to a service?
 * @param log
 * @param level
 */
export function storeLog(log, level) {
  const logObject = { log, level };
  const logString = `[${logObject.level}] ${logObject.log}`;
  Rollbar.error(logString);
  return logString;
}
