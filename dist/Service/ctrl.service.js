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
const ctrl_dao_1 = require("../Dao/ctrl.dao");
const boException_1 = require("../Exception/boException");
const ctrl_error_enum_1 = require("../Exception/Bo/ctrl.error.enum");
let CtrlService = class CtrlService {
    constructor(ctrlDao) {
        this.ctrlDao = ctrlDao;
    }
    async getList() {
        const list = await this.ctrlDao.findAll();
        return { data: list };
    }
    async getItemById(id) {
        const ctrlEntity = await this.ctrlDao.findById(id);
        if (!ctrlEntity) {
            throw new boException_1.BoException(ctrl_error_enum_1.CtrlErrorMsg.NOT_EXIST, ctrl_error_enum_1.CtrlErrorCode.NOT_EXIST);
        }
        return {
            data: ctrlEntity,
        };
    }
    async create(formData) {
        const isExist = await this.ctrlDao.findItemByParam(formData);
        if (isExist) {
            throw new boException_1.BoException(ctrl_error_enum_1.CtrlErrorMsg.IS_EXIST, ctrl_error_enum_1.CtrlErrorCode.IS_EXIST);
        }
        const result = await this.ctrlDao.create(formData);
        return {
            msg: '新增成功',
            data: result,
        };
    }
    async update(id, formData) {
        const result = await this.ctrlDao.update(id, formData);
        return {
            msg: '更新成功',
            data: result,
        };
    }
    async destroy(id) {
        const result = await this.ctrlDao.destroy(id);
        return {
            msg: '删除成功',
            data: result,
        };
    }
};
CtrlService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof ctrl_dao_1.CtrlDao !== "undefined" && ctrl_dao_1.CtrlDao) === "function" ? _a : Object])
], CtrlService);
exports.CtrlService = CtrlService;
//# sourceMappingURL=ctrl.service.js.map