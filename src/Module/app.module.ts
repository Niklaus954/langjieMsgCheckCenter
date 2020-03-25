import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MqModule } from './mq.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: 'env/.' + process.env.NODE_ENV + '.env',
		}),
		TypeOrmModule.forRootAsync({
			imports: [ ConfigModule ],
			useFactory: (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.get('DATABASE_HOST_DEFAULT'),
				port: configService.get('DATABASE_PORT_DEFAULT'),
				username: configService.get('DATABASE_USER_DEFAULT'),
				password: configService.get('DATABASE_PASSWORD_DEFAULT'),
				database: configService.get('DATABASE_LIBRARY_DEFAULT'),
				entities: [ configService.get('DATABASE_ENTITIES') ],
				synchronize: Boolean(Number(configService.get('DATABASE_SYNCHRONIZE_DEFAULT'))),
				logging: Boolean(Number(configService.get('DATABASE_LOGGING_DEFAULT'))),
				autoLoadEntities: Boolean(Number(configService.get('DATABASE_AUTOLOADENTITIES_DEFAULT'))),
			}),
			inject: [ ConfigService ]
		}),
		MqModule,
	],
})
export class AppModule { }
