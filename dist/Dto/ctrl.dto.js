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
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateCtrlDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: '英文名',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateCtrlDto.prototype, "english_name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '中文名',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateCtrlDto.prototype, "chinese_name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '是否虚拟',
    }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Boolean)
], CreateCtrlDto.prototype, "is_virtual", void 0);
exports.CreateCtrlDto = CreateCtrlDto;
class UpdateCtrlDto {
}
__decorate([
    swagger_1.ApiProperty({
        description: '英文名',
        required: false,
    }),
    class_validator_1.Allow(),
    __metadata("design:type", String)
], UpdateCtrlDto.prototype, "english_name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '中文名',
        required: false,
    }),
    class_validator_1.Allow(),
    __metadata("design:type", String)
], UpdateCtrlDto.prototype, "chinese_name", void 0);
__decorate([
    swagger_1.ApiProperty({
        description: '是否虚拟',
        required: false,
    }),
    class_validator_1.Allow(),
    __metadata("design:type", Boolean)
], UpdateCtrlDto.prototype, "is_virtual", void 0);
exports.UpdateCtrlDto = UpdateCtrlDto;
//# sourceMappingURL=ctrl.dto.js.map