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
const typeorm_2 = require("typeorm");
const msgMiddleWareRecord_entity_1 = require("../Entity/msgMiddleWareRecord.entity");
const log_util_1 = require("../Util/log.util");
let RecordService = class RecordService {
    constructor(recordRepo) {
        this.recordRepo = recordRepo;
    }
    async record(msg) {
        const payload = JSON.parse(msg);
        const { msg_id, moduleName } = payload;
        const connection = typeorm_2.getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result = await queryRunner.manager.query(`SELECT id FROM msg_middle_ware_record WHERE msg_id = "${msg_id}" AND moduleName = "${moduleName}" FOR UPDATE`);
            if (result.length !== 0) {
                throw new Error('已存在');
            }
            await queryRunner.manager.insert(msgMiddleWareRecord_entity_1.MsgMiddleWareRecord, {
                msg_id,
                moduleName,
            });
            await queryRunner.commitTransaction();
        }
        catch (e) {
            log_util_1.logger.error(e);
            await queryRunner.rollbackTransaction();
        }
    }
};
RecordService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(msgMiddleWareRecord_entity_1.MsgMiddleWareRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RecordService);
exports.RecordService = RecordService;
//# sourceMappingURL=record.service.js.map