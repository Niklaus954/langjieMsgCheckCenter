import { RecordService } from "src/Service/record.service";
export declare class RecordController {
    private readonly recordService;
    private resConsumerMq;
    constructor(recordService: RecordService);
    listen(): void;
}
