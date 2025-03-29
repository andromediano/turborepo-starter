import pino, { Logger } from "pino";

export const getLogger = (name: string = "myapp"): Logger => {
  const env = process.env.NODE_ENV || "development";
  return pino({
    name,
    base: null,
    level: env === "development" ? "debug" : "info",
    timestamp: pino.stdTimeFunctions.isoTime,
    browser: { asObject: true },
    formatters: {
      level: (label) => {
        return { level: label.toUpperCase() };
      },
      log: (object) => {
        return object;
      },
    },
    /*
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
    */
  });
};
