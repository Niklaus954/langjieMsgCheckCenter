import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MsgMiddleWareRecord } from "src/Entity/msgMiddleWareRecord.entity";

@Injectable()
export class RecordService {

    constructor(
        @InjectRepository(MsgMiddleWareRecord)
        private readonly recordRepo: Repository<MsgMiddleWareRecord>,
    ) {}

    async record(msg: string) {
        const payload = JSON.parse(msg);
        const { msg_id, recall_url, data } = payload;
        try {
            await this.recordRepo.insert({
                msg_id,
                recall_url,
                data: JSON.stringify(data),
            });
        } catch (e) {
            
        }
    }
}