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
const ctrl_service_1 = require("../Service/ctrl.service");
const ctrl_dto_1 = require("../Dto/ctrl.dto");
const swagger_1 = require("@nestjs/swagger");
const ctrlResDescription_util_1 = require("../Util/Swagger/ctrlResDescription.util");
const roles_decorator_1 = require("../Decorator/roles.decorator");
const roles_guard_1 = require("../Guard/roles.guard");
const login_guard_1 = require("../Guard/login.guard");
let CtrlController = class CtrlController {
    constructor(ctrlService) {
        this.ctrlService = ctrlService;
    }
    getList() {
        return this.ctrlService.getList();
    }
    getItemById(id) {
        return this.ctrlService.getItemById(id);
    }
    create(createCtrlDto) {
        return this.ctrlService.create(createCtrlDto);
    }
    update(id, updateCtrlDto) {
        return this.ctrlService.update(id, updateCtrlDto);
    }
    destroy(id) {
        return this.ctrlService.destroy(id);
    }
};
__decorate([
    swagger_1.ApiOperation({ summary: '控制器列表' }),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CtrlController.prototype, "getList", null);
__decorate([
    swagger_1.ApiOperation({ summary: '根据id获取指定控制器' }),
    swagger_1.ApiResponse({ status: 200, description: ctrlResDescription_util_1.CtrlResDescriptionUtil.getDescription(['NOT_EXIST']) }),
    common_1.Get('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CtrlController.prototype, "getItemById", null);
__decorate([
    swagger_1.ApiOperation({ summary: '新增控制器' }),
    swagger_1.ApiHeader({ name: 'access_token' }),
    swagger_1.ApiResponse({ status: 200, description: ctrlResDescription_util_1.CtrlResDescriptionUtil.getDescription(['IS_EXIST']) }),
    common_1.UseGuards(login_guard_1.LoginGuard, roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ctrl_dto_1.CreateCtrlDto]),
    __metadata("design:returntype", Promise)
], CtrlController.prototype, "create", null);
__decorate([
    swagger_1.ApiOperation({ summary: '更新控制器属性' }),
    swagger_1.ApiHeader({ name: 'access_token' }),
    common_1.UseGuards(login_guard_1.LoginGuard, roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    common_1.Put('/:id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ctrl_dto_1.UpdateCtrlDto]),
    __metadata("design:returntype", Promise)
], CtrlController.prototype, "update", null);
__decorate([
    swagger_1.ApiOperation({ summary: '删除控制器' }),
    swagger_1.ApiHeader({ name: 'access_token' }),
    common_1.UseGuards(login_guard_1.LoginGuard, roles_guard_1.RolesGuard),
    roles_decorator_1.Roles('admin'),
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CtrlController.prototype, "destroy", null);
CtrlController = __decorate([
    swagger_1.ApiTags('控制器管理'),
    common_1.Controller('ctrl'),
    __metadata("design:paramtypes", [ctrl_service_1.CtrlService])
], CtrlController);
exports.CtrlController = CtrlController;
//# sourceMappingURL=ctrl.controller.js.map