"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const moment = require("moment");
exports.logger = new (winston.Logger)({
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
//# sourceMappingURL=log.util.js.map