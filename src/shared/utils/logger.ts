/* Simple logger wrapper. Replace with winston/pino if needed. */
const format = (level: string, message: string) => {
  const ts = new Date().toISOString();
  return `[${ts}] [${level.toUpperCase()}] ${message}`;
};

export const logger = {
  info: (msg: string) => console.log(format('info', msg)),
  warn: (msg: string) => console.warn(format('warn', msg)),
  error: (msg: string) => console.error(format('error', msg)),
  debug: (msg: string) => console.debug(format('debug', msg)),
};
