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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const index_1 = require("langjiemq/dist/index");
const config_1 = require("@nestjs/config");
const check_service_1 = require("../Service/check.service");
const check_controller_1 = require("../Controller/check.controller");
const record_controller_1 = require("../Controller/record.controller");
const record_service_1 = require("../Service/record.service");
const msgMiddleWareRecord_entity_1 = require("../Entity/msgMiddleWareRecord.entity");
const msgMiddleWareRequestFailLog_1 = require("../Entity/msgMiddleWareRequestFailLog");
let InitService = class InitService {
    constructor(configService, checkController, recordController) {
        this.configService = configService;
        this.checkController = checkController;
        this.recordController = recordController;
        index_1.RabbitmqFactory.host = this.configService.get('RABBIT_MQ_HOST');
        index_1.RabbitmqFactory.user = this.configService.get('RABBIT_MQ_USER');
        index_1.RabbitmqFactory.password = this.configService.get('RABBIT_MQ_PASSWORD');
        this.checkController.listen();
        this.recordController.listen();
    }
};
InitService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        check_controller_1.CheckController,
        record_controller_1.RecordController])
], InitService);
let MqModule = class MqModule {
};
MqModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([msgMiddleWareRecord_entity_1.MsgMiddleWareRecord]), typeorm_1.TypeOrmModule.forFeature([msgMiddleWareRequestFailLog_1.MsgMiddleWareRequestFailLog]), common_1.HttpModule],
        providers: [InitService, check_controller_1.CheckController, record_controller_1.RecordController, check_service_1.CheckService, record_service_1.RecordService]
    })
], MqModule);
exports.MqModule = MqModule;
//# sourceMappingURL=mq.module.js.map