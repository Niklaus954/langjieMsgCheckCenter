import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginI } from './Interface/login.interface';
import { BoRes } from './Interface/boRes.interface';
export declare class LoginService implements LoginI {
    private readonly httpService;
    private readonly configService;
    constructor(httpService: HttpService, configService: ConfigService);
    login(unionid: string): Promise<BoRes>;
}
