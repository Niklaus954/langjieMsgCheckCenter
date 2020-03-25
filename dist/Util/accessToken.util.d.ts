export declare class AccessToken {
    createToken(info: any): {
        token: string;
        endDate: number;
    };
    decodeToken(token: string): false | {
        status: number;
        payload?: undefined;
        signature?: undefined;
        checkSignature?: undefined;
    } | {
        status: number;
        payload: {};
        signature: string;
        checkSignature: string;
    };
    checkToken(token: string): {
        code: number;
        msg: string;
        data: any;
    };
}
