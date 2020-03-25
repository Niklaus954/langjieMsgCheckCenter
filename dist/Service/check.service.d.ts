import { HttpService } from "@nestjs/common";
import { MsgMiddleWareRecord } from "src/Entity/msgMiddleWareRecord.entity";
import { Repository } from "typeorm";
import { MsgMiddleWareRequestFailLog } from "src/Entity/msgMiddleWareRequestFailLog";
export declare class CheckService {
    private readonly recordRepo;
    private readonly failLogRepo;
    private readonly httpService;
    constructor(recordRepo: Repository<MsgMiddleWareRecord>, failLogRepo: Repository<MsgMiddleWareRequestFailLog>, httpService: HttpService);
    check(msg: string): Promise<true | void>;
    downServerFail(payload: any): Promise<void>;
}
