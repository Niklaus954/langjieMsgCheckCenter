import { CheckService } from "../service/check.service";
export declare class CheckController {
    private readonly checkService;
    private resConsumerMq;
    constructor(checkService: CheckService);
    listen(): void;
}
