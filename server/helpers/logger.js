const winston = require("winston");
const { format } = require("winston");
const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
const logger = winston.createLogger(
  {
    level: "info",
    format: combine(label({ label: "time:" }), timestamp(), myFormat),
    transports: [
      new winston.transports.File({ filename: "error.log", level: "error" }),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  },
  {
    level: "alert",
    format: combine(label({ label: "time:" }), timestamp(), myFormat),
    transports: [
      new winston.transports.File({ filename: "alert.log", level: "alert" }),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  },
  {
    level: "warn",
    format: combine(label({ label: "time:" }), timestamp(), myFormat),
    transports: [
      new winston.transports.File({ filename: "warn.log", level: "warn" }),
      new winston.transports.File({ filename: "combined.log" }),
    ],
  }
);
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
module.exports = logger;

// Path: server\helpers\logger.js
