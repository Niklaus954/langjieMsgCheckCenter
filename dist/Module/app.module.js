"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mq_module_1 = require("./mq.module");
const typeorm_1 = require("@nestjs/typeorm");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: 'env/.' + process.env.NODE_ENV + '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'mysql',
                    host: configService.get('DATABASE_HOST_DEFAULT'),
                    port: configService.get('DATABASE_PORT_DEFAULT'),
                    username: configService.get('DATABASE_USER_DEFAULT'),
                    password: configService.get('DATABASE_PASSWORD_DEFAULT'),
                    database: configService.get('DATABASE_LIBRARY_DEFAULT'),
                    entities: [configService.get('DATABASE_ENTITIES')],
                    synchronize: Boolean(Number(configService.get('DATABASE_SYNCHRONIZE_DEFAULT'))),
                    logging: Boolean(Number(configService.get('DATABASE_LOGGING_DEFAULT'))),
                    autoLoadEntities: Boolean(Number(configService.get('DATABASE_AUTOLOADENTITIES_DEFAULT'))),
                }),
                inject: [config_1.ConfigService]
            }),
            mq_module_1.MqModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map