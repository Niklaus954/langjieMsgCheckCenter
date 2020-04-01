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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const msgMiddleWareRecord_entity_1 = require("../Entity/msgMiddleWareRecord.entity");
const typeorm_2 = require("typeorm");
const msgMiddleWareRequestFailLog_1 = require("../Entity/msgMiddleWareRequestFailLog");
const log_util_1 = require("../Util/log.util");
const dist_1 = require("langjiemq/dist");
let CheckService = class CheckService {
    constructor(recordRepo, failLogRepo, httpService) {
        this.recordRepo = recordRepo;
        this.failLogRepo = failLogRepo;
        this.httpService = httpService;
    }
    async check(msg) {
        const payload = JSON.parse(msg);
        const { msg_id, recall_url, exchangeName, exchangeType, data } = payload;
        let isComplete = true;
        for (const moduleName of Object.keys(data)) {
            const recordEntity = await this.recordRepo.findOne({ where: { msg_id, moduleName } });
            if (!recordEntity) {
                isComplete = false;
            }
        }
        if (isComplete) {
            return true;
        }
        const failLogEntity = await this.failLogRepo.findOne({ where: { msg_id } });
        if (!failLogEntity) {
            await this.failLogRepo.insert({ msg_id, count: 1 });
        }
        else {
            let { count } = failLogEntity;
            count++;
            if (count < 4) {
                await this.failLogRepo.update({ msg_id }, { count });
            }
            else {
                return this.downServerFail(payload);
            }
        }
        const producerMq = new dist_1.ProducerMq({ exchangeName, exchangeType, expiration: 5000 });
        producerMq.delayPublish(msg);
        producerMq.publish(msg);
        return true;
        try {
            const result = await this.httpService.post(recall_url, payload, { timeout: 30000 }).toPromise();
            if (result.data.code !== 200) {
                throw new Error(result.data.msg);
            }
        }
        catch (e) {
            this.check(msg);
        }
    }
    async downServerFail(payload) {
        log_util_1.logger.error(payload);
    }
};
CheckService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(msgMiddleWareRecord_entity_1.MsgMiddleWareRecord)),
    __param(1, typeorm_1.InjectRepository(msgMiddleWareRequestFailLog_1.MsgMiddleWareRequestFailLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        common_1.HttpService])
], CheckService);
exports.CheckService = CheckService;
//# sourceMappingURL=check.service.js.map