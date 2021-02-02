import * as winston from 'winston';
const { combine, label, timestamp, printf } = winston.format;

winston.configure({
  format: combine(label({ label: 'books' }), timestamp(), printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  })),
  transports: [
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.File({ filename: '/var/log/books', level: 'error' })
  ]
});