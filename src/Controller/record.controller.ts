import { Injectable } from "@nestjs/common";
import { ConsumerMq } from "langjiemq/dist";
import { RecordService } from "src/Service/record.service";

@Injectable()
export class RecordController {
    private resConsumerMq;

    constructor(private readonly recordService: RecordService) {
        this.resConsumerMq = new ConsumerMq({
            exchangeName: 'downStream',
            exchangeType: 'direct',
            queue: 'downStreamFinishQuque'
        });
    }

    listen() {
        const self = this;
        this.resConsumerMq.listen((msg: string) => {
            self.recordService.record(msg);
        });
    }
}