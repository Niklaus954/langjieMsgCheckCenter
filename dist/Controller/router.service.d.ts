import { CheckService } from "./check.service";
export declare class RouterService {
    private readonly checkService;
    private resConsumerMq;
    constructor(checkService: CheckService);
    listen(): void;
}
