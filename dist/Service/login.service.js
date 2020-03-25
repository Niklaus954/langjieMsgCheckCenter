"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const accessToken_util_1 = require("../Util/accessToken.util");
const authException_1 = require("src/Exception/authException");
let LoginService = class LoginService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async login(unionid) {
        const result = await this.httpService.get(this.configService.get('API_MEMBER_INFO_ADDR') + '/' + unionid).toPromise();
        const memberInfo = result.data.data;
        if (memberInfo) {
            const roles = [];
            if (memberInfo.checked && memberInfo.company === '杭州朗杰测控技术开发有限公司') {
                roles.push('admin');
            }
            else {
                roles.push('member');
            }
            const { token, endDate } = new accessToken_util_1.AccessToken().createToken({
                unionid,
                roles,
            });
            return {
                code: 200,
                msg: '登陆成功',
                data: {
                    access_token: token,
                    endDate,
                    memberInfo,
                },
            };
        }
        throw new authException_1.AuthException('请注册会员', 401);
    }
};
LoginService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [common_1.HttpService,
        config_1.ConfigService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map