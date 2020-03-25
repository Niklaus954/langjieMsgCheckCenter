import { Module, Injectable, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqFactory } from 'langjiemq/dist/index';
import { ConfigService } from '@nestjs/config';
import { CheckService } from 'src/Service/check.service';
import { CheckController } from 'src/Controller/check.controller';
import { RecordController } from 'src/Controller/record.controller';
import { RecordService } from 'src/Service/record.service';
import { MsgMiddleWareRecord } from 'src/Entity/msgMiddleWareRecord.entity';
import { MsgMiddleWareRequestFailLog } from 'src/Entity/msgMiddleWareRequestFailLog';

@Injectable()
class InitService {
    constructor(
        private readonly configService: ConfigService,
        private readonly checkController: CheckController,
        private readonly recordController: RecordController,
    ) {
        RabbitmqFactory.host = this.configService.get('RABBIT_MQ_HOST');
        RabbitmqFactory.user = this.configService.get('RABBIT_MQ_USER');
        RabbitmqFactory.password = this.configService.get('RABBIT_MQ_PASSWORD');
        this.checkController.listen();
        this.recordController.listen();
    }
}

@Module({
    imports: [ TypeOrmModule.forFeature([ MsgMiddleWareRecord ]), TypeOrmModule.forFeature([ MsgMiddleWareRequestFailLog ]), HttpModule ],
    providers: [ InitService, CheckController, RecordController, CheckService, RecordService ]
})
export class MqModule { }
