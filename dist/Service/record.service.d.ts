import { Repository } from "typeorm";
import { MsgMiddleWareRecord } from "src/Entity/msgMiddleWareRecord.entity";
export declare class RecordService {
    private readonly recordRepo;
    constructor(recordRepo: Repository<MsgMiddleWareRecord>);
    record(msg: string): Promise<void>;
}
