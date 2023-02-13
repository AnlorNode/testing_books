const winston = require('winston');
const moment = require('moment');
const util = require('util');

const LoggerLevel = {
    info: 'info',
    warning: 'warn',
    error: 'error',
    debug: 'debug',
};
const logLevels = {
    levels: {
        error: 0, warning: 1, info: 2, http: 3, sql: 4, debug: 5,
    },
    colors: {
        error: 'bold red', warning: 'darkred', info: 'blue', http: 'green', sql: 'blue', debug: 'gray',
    },
};

const replyFormat = '[%s][%s][%s] %s';
const dateFormat = 'DD.MM.YYYY HH:mm:ss.SSS';

// Add json-formatter with instance type and instance id.

const formatter = winston.format.printf(({
    level, message, category, ...data
}) => util
    .format(
        replyFormat,
        moment().format(dateFormat).trim(),
        level.trim(),
        category,
        (typeof message === 'object') ?
            JSON.stringify({ message, ...data }) :
            `${message}, ${JSON.stringify(data)}`,
    ));

const productionFormatter = ({ instanceId, instanceType, clayster }) => winston
    .format
    .printf(({
        category, message, level, ...meta
    }) => JSON
        .stringify({
            clayster: clayster || 'unknown',
            instance: instanceType || 'unknown',
            instanceId: instanceId || 'unknown',
            date: moment().format(dateFormat).trim(),
            category,
            level,
            message,
            ...meta,
        }));

const consoleFormatter = winston.format.combine(
    winston.format.colorize(),
    formatter,
);

/**
 * @class Logger
 * @description Winston logger wrapper class
 */
class WinstonLogger {
    constructor(config) {
        this.config = config;

        this.setColors();
        this.setTransports();
    }

    setColors() {
        winston.addColors(logLevels.colors);
    }

    setTransports() {
        const transports = [];

        const env = process.env.NODE_ENV;

        if (env === 'production' || env === 'development') {
            transports.push(
                new (winston.transports.Console)({
                    format: productionFormatter(this.config),
                    handleExceptions: true,
                }),
            );

            process.on('unhandledRejection', (reason) => {
                throw reason;
            });
        } else {
            transports.push(
                new (winston.transports.Console)({
                    format: consoleFormatter,
                }),
            );
        }

        this.logger = winston.createLogger({
            exitOnError: false,
            transports,
        });

        if (this.config.debug) {
            this.logger.configure({
                level: LoggerLevel.debug,
            });
        }
    }

    log(level, message, category = 'app', meta = {}) {
        const metadata = { category, ...meta };
        this.logger.log(level, message, metadata);

        const args = typeof this.callback === 'function' ? [level, message, metadata] : [message, metadata];
        const callback = typeof this.callback === 'function' ? this.callback : this.callback?.[level];
        if (typeof callback === 'function') {
            callback(...args);
        }
    }

    info(message, category = 'app', meta = {}) {
        this.log(LoggerLevel.info, message, category, meta);
    }

    error(messageOrError, category = 'app', meta = {}) {
        if (typeof messageOrError === 'string') {
            this.log(LoggerLevel.error, messageOrError, category, meta);
        } else {
            this.log(LoggerLevel.error, messageOrError.message, category, {
                stack: messageOrError.stack,
                name: messageOrError.name,
            });
        }
    }

    warn(message, category = 'app', meta = {}) {
        this.log(LoggerLevel.warning, message, category, meta);
    }

    debug(message, category = 'app', meta = {}) {
        this.log(LoggerLevel.debug, message, category, meta);
    }

    /**
   * Set callback function for logger
   * @param {Function | LoggerCallback} callback
   */
    setCallback(callback) {
        this.callback = callback;
    }

    /**
   * Makes an array from error stack
   *
   * @param stack
   * @returns {*}
   */
    arrayStack(stack) {
        return stack
            .split('\n')
            .filter((item) => item.match(/\((.)*\)/))
            .map((item) => {
                const match = item.match(/\((.*)\)/);
                return match ? match[0] : '';
            });
    }
}

module.exports = WinstonLogger;
