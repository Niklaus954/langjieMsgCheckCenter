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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const dist_1 = require("langjiemq/dist");
const check_service_1 = require("./check.service");
let RouterService = class RouterService {
    constructor(checkService) {
        this.checkService = checkService;
        this.resConsumerMq = new dist_1.ConsumerMq({
            exchangeName: 'resCheck',
            exchangeType: 'direct',
            queue: 'fromProducerCheck'
        });
    }
    listen() {
        const self = this;
        this.resConsumerMq.listen((msg) => {
            self.checkService.check(msg);
        });
    }
};
RouterService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof check_service_1.CheckService !== "undefined" && check_service_1.CheckService) === "function" ? _a : Object])
], RouterService);
exports.RouterService = RouterService;
//# sourceMappingURL=router.service.js.map