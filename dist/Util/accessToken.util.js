"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class AccessToken {
    createToken(info) {
        const endDate = Date.now() + 60 * 60 * 1000 * 24 * 15;
        let newInfo = {
            data: info,
            endDate,
        };
        let base64Str = Buffer.from(JSON.stringify(newInfo), "utf8").toString("base64");
        let secret = "www.langjie.com@network";
        let hash = crypto.createHmac('sha256', secret);
        hash.update(base64Str);
        let signature = hash.digest('base64');
        return {
            token: base64Str + "." + signature,
            endDate,
        };
    }
    decodeToken(token) {
        try {
            let decArr = token.split(".");
        }
        catch (e) {
            return {
                status: 100
            };
        }
        let decArr = token.split(".");
        if (decArr.length < 2) {
            return {
                status: 100,
            };
        }
        let payload = {};
        try {
            payload = JSON.parse(Buffer.from(decArr[0], "base64").toString("utf8"));
        }
        catch (e) {
            return {
                status: 101,
            };
            return false;
        }
        let secret = "www.langjie.com@network";
        let hash = crypto.createHmac('sha256', secret);
        hash.update(decArr[0]);
        let checkSignature = hash.digest('base64');
        return {
            status: 200,
            payload: payload,
            signature: decArr[1],
            checkSignature: checkSignature
        };
    }
    checkToken(token) {
        let payload = this.decodeToken(token);
        if (payload['status'] != 200) {
            return {
                code: -1001,
                msg: 'token格式出错',
                data: {}
            };
        }
        else if (payload['signature'] != payload['checkSignature']) {
            return {
                code: -1002,
                msg: '签名非法',
                data: {}
            };
        }
        else if (Date.now() > payload['payload'].endDate) {
            return {
                code: -1003,
                msg: '身份过期',
                data: {}
            };
        }
        else {
            return {
                code: 200,
                msg: '',
                data: payload['payload'].data
            };
        }
    }
}
exports.AccessToken = AccessToken;
//# sourceMappingURL=accessToken.util.js.map