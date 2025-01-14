import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf, splat } = format;

const NODE_ENV = process.env.NODE_ENV as string;

const errorStackFormat = format((info) => {
  if (info instanceof Error) {
    return {
      ...info,
      stack: info.stack,
      message: info.message,
    };
  }
  return info;
});

export const logger = createLogger({
  level: 'info',
  format: combine(
    errorStackFormat(),
    timestamp(),
    splat(),
    printf(
      ({ level, message, timestamp, stack }) =>
        `${timestamp} [${level}] ${message} ${stack ? `\n${stack}` : ''}`
    )
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

const extraTransports = {
  development: new transports.Console({
    format: combine(
      errorStackFormat(),
      timestamp(),
      splat(),
      printf(
        ({ level, message, stack }) =>
          `${level}: ${message} ${stack ? `\n${stack}` : ''}`
      )
    ),
  }),
  test: new transports.File({
    filename: 'test.log',
    format: combine(
      errorStackFormat(),
      timestamp(),
      splat(),
      printf(
        ({ level, message, timestamp, stack }) =>
          `${timestamp} [${level}] ${message} ${stack ? `\n${stack}` : ''}`
      )
    ),
  }),
};

if (Object.keys(extraTransports).includes(NODE_ENV)) {
  type k = keyof typeof extraTransports;
  logger.add(extraTransports[NODE_ENV as k]);
}
