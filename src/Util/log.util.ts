import * as winston from 'winston';
import * as moment from 'moment';

export const logger = new (winston.Logger)({
    level: 'error',
    transports: [
        new (winston.transports.Console)({
            timestamp: () => '[' + moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ']',
        }),
        new (winston.transports.File)({
            filename: 'log/error.log',
            timestamp: () => '[' + moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ']',
            json: false,
            maxsize: 1024 * 1024,
        })
    ]
});