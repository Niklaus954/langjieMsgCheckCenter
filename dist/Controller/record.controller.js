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
const dist_1 = require("langjiemq/dist");
const record_service_1 = require("../Service/record.service");
let RecordController = class RecordController {
    constructor(recordService) {
        this.recordService = recordService;
        this.resConsumerMq = new dist_1.ConsumerMq({
            exchangeName: 'downStream',
            exchangeType: 'direct',
            queue: 'downStreamFinishQuque'
        });
    }
    listen() {
        const self = this;
        this.resConsumerMq.listen((msg) => {
            self.recordService.record(msg);
        });
    }
};
RecordController = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [record_service_1.RecordService])
], RecordController);
exports.RecordController = RecordController;
//# sourceMappingURL=record.controller.js.map