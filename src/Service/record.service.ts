import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getConnection } from "typeorm";
import { MsgMiddleWareRecord } from "src/Entity/msgMiddleWareRecord.entity";
import { logger } from "src/Util/log.util";

@Injectable()
export class RecordService {

    constructor(
        @InjectRepository(MsgMiddleWareRecord)
        private readonly recordRepo: Repository<MsgMiddleWareRecord>,
    ) {}

    async record(msg: string) {
        const payload = JSON.parse(msg);
        const { msg_id, moduleName } = payload;
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result = await queryRunner.manager.query(`SELECT id FROM msg_middle_ware_record WHERE msg_id = "${msg_id}" AND moduleName = "${moduleName}" FOR UPDATE`);
            if (result.length !== 0) {
                throw new Error('已存在');
            }
            await queryRunner.manager.insert<MsgMiddleWareRecord>(MsgMiddleWareRecord, {
                msg_id,
                moduleName,
            });
            await queryRunner.commitTransaction();
        } catch (e) {
            logger.error(e);
            await queryRunner.rollbackTransaction();
        }
    }
}