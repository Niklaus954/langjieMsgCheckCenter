import { HttpException } from '@nestjs/common';
export declare class AuthException extends HttpException {
    private errorMessage;
    private errorCode;
    private errorData;
    constructor(errorMessage: string, errorCode: number, errorData?: any);
    getErrorCode(): number;
    getErrorMessage(): string;
    getErrorData(): any;
}
