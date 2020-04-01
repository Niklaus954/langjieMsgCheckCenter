import { Injectable, HttpService } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MsgMiddleWareRecord } from "src/Entity/msgMiddleWareRecord.entity";
import { Repository } from "typeorm";
import { MsgMiddleWareRequestFailLog } from "src/Entity/msgMiddleWareRequestFailLog";
import { logger } from "src/Util/log.util";
import { ProducerMq } from "langjiemq/dist";

@Injectable()
export class CheckService {
    constructor(
        @InjectRepository(MsgMiddleWareRecord)
        private readonly recordRepo: Repository<MsgMiddleWareRecord>,
        @InjectRepository(MsgMiddleWareRequestFailLog)
        private readonly failLogRepo: Repository<MsgMiddleWareRequestFailLog>,
        private readonly httpService: HttpService,
    ) {}

    async check(msg: string) {
        const payload = JSON.parse(msg);
        const { msg_id, recall_url, exchangeName, exchangeType, data } = payload;
        let isComplete: boolean = true;
        for (const moduleName of Object.keys(data)) {
            const recordEntity = await this.recordRepo.findOne({ where: { msg_id, moduleName }});
            if (!recordEntity) {
                isComplete = false;
            }
        }
        if (isComplete) {
            return true;
        }
        // 记下当前重发次数，重发超过一定次数后，报警
        const failLogEntity = await this.failLogRepo.findOne({ where: { msg_id }});
        if (!failLogEntity) {
            await this.failLogRepo.insert({ msg_id, count: 1});
        } else {
            let { count } = failLogEntity;
            count++;
            if (count < 4) {
                await this.failLogRepo.update({ msg_id }, { count });
            } else {
                // 报警
                return this.downServerFail(payload);
            }
        }
        // 自己代替上游重发一次消息
        const producerMq = new ProducerMq({ exchangeName, exchangeType, expiration: 5000 });
        producerMq.delayPublish(msg);
        producerMq.publish(msg);
        return true;
        // 通知上游服务重发消息
        try {
            const result = await this.httpService.post(recall_url, payload, { timeout: 30000 }).toPromise();
            if (result.data.code !== 200) {
                throw new Error(result.data.msg);
            }
        } catch (e) {
            // 请求上游服务出了问题
            // 概率较小，这里能收到消息，证明两分钟前上游服务是正常的
            // 暂时不做次数记录了，直接重发
            this.check(msg);
        }
    }

    // 一直收不到下游发来的成功消息
    // 很大可能下游服务炸了
    // 报警
    // 当数量继续扩大后，需要熔断
    async downServerFail(payload: any) {
        // 得到具体的业务模块
        // 短信邮件通知
        logger.error(payload);
        // 通知上游，该下游服务失败了
        // 找出成功的下游模块，如果不存在成功的，则自己回滚
        // 如果存在成功的，要将成功的下游模块回滚
        // 或者人工处理最安全！！
    }
}