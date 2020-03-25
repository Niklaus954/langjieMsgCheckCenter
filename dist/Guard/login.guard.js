"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const authException_1 = require("../Exception/authException");
const accessToken_util_1 = require("../Util/accessToken.util");
let LoginGuard = class LoginGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const { access_token } = request.headers;
        if (!access_token) {
            throw new authException_1.AuthException('请登陆', 401);
        }
        const checkRes = new accessToken_util_1.AccessToken().checkToken(access_token);
        if (checkRes.code !== 200) {
            throw new authException_1.AuthException(checkRes.msg ? checkRes.msg : '请重新登陆', 401);
        }
        request.session.unionid = checkRes.data.unionid;
        request.session.roles = checkRes.data.roles;
        return true;
    }
};
LoginGuard = __decorate([
    common_1.Injectable()
], LoginGuard);
exports.LoginGuard = LoginGuard;
//# sourceMappingURL=login.guard.js.map