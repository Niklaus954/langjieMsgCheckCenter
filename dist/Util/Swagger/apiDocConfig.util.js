"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const ctrl_moudle_1 = require("../../Module/ctrl.moudle");
exports.swaggerConfig = app => {
    const userApiOptions = new swagger_1.DocumentBuilder()
        .setTitle('Langjie Api')
        .setDescription('Online Shop')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('控制器管理')
        .build();
    const userApiDocument = swagger_1.SwaggerModule.createDocument(app, userApiOptions, { include: [ctrl_moudle_1.CtrlModule] });
    swagger_1.SwaggerModule.setup('swagger/api/', app, userApiDocument);
};
//# sourceMappingURL=apiDocConfig.util.js.map