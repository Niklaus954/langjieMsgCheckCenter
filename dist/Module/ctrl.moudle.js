"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ctrl_controller_1 = require("../Controller/ctrl.controller");
const ctrl_service_1 = require("../Service/ctrl.service");
const ctrl_dao_1 = require("../Dao/ctrl.dao");
const ctrl_entity_1 = require("../Entity/Lj_shop/ctrl.entity");
let CtrlModule = class CtrlModule {
};
CtrlModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([ctrl_entity_1.Ctrl])],
        controllers: [ctrl_controller_1.CtrlController],
        providers: [ctrl_service_1.CtrlService, ctrl_dao_1.CtrlDao],
    })
], CtrlModule);
exports.CtrlModule = CtrlModule;
//# sourceMappingURL=ctrl.moudle.js.map