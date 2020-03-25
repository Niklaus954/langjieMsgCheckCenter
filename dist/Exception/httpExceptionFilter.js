"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const boException_1 = require("./boException");
const log_util_1 = require("../Util/log.util");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status, message;
        message = exception.message;
        try {
            status = exception.getStatus();
        }
        catch (e) {
            status = 500;
        }
        if (status === 404)
            message = message.message;
        if (exception instanceof boException_1.BoException) {
            const result = {
                code: exception.getErrorCode(),
                msg: exception.getErrorMessage(),
                data: exception.getErrorData(),
            };
            if (!result.data)
                delete result.data;
            response
                .status(status)
                .json(result);
        }
        else {
            if (status === 400) {
                if (message && message.message && message.message[0] && message.message[0].constraints) {
                    for (const key in message.message[0].constraints) {
                        message = message.message[0].constraints[key];
                        break;
                    }
                }
            }
            else if (status === 500) {
                log_util_1.logger.error(exception.stack);
            }
            response
                .status(status)
                .json({
                code: status,
                msg: message,
            });
        }
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch()
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=httpExceptionFilter.js.map