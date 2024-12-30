import fs from 'node:fs'
import path from 'node:path'
import  { createLogger, transports, format } from 'winston'


import 'winston-daily-rotate-file'
const { combine, timestamp, printf } = format;

// Create logs folder if it doesn't exist
const logsFolder = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder);
}

// Define log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const dailyRotateFile = new transports.DailyRotateFile({
  filename: path.join(logsFolder, 'log-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

// Create logger
export const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(logsFolder, 'log.log') }),
    dailyRotateFile
  ]
})