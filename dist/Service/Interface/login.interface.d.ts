import { BoRes } from "./boRes.interface";
export interface LoginI {
    login(unionid: string): Promise<BoRes> | BoRes;
}
