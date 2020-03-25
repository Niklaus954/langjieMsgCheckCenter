"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class BoException extends common_1.HttpException {
    constructor(errorMessage, errorCode, errorData) {
        super(errorMessage, 200);
        this.errorMessage = errorMessage;
        this.errorCode = errorCode;
        this.errorData = errorData;
    }
    getErrorCode() {
        return this.errorCode;
    }
    getErrorMessage() {
        return this.errorMessage;
    }
    getErrorData() {
        return this.errorData;
    }
}
exports.BoException = BoException;
//# sourceMappingURL=boException.js.map