import { Injectable } from "@nestjs/common";
import { ConsumerMq } from "langjiemq/dist";
import { CheckService } from "../service/check.service";

@Injectable()
export class CheckController {
    private resConsumerMq;

    constructor(private readonly checkService: CheckService) {
        this.resConsumerMq = new ConsumerMq({
            exchangeName: 'resCheck',
            exchangeType: 'direct',
            queue: 'fromProducerCheck'
        });
    }

    listen() {
        const self = this;
        this.resConsumerMq.listen((msg: string) => {
            self.checkService.check(msg);
        });
    }
}