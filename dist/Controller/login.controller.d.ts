import { BoRes } from "../Service/Interface/boRes.interface";
import { LoginService } from "../Service/login.service";
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(unionid: string): Promise<BoRes>;
}
