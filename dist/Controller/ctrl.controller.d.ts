import { CtrlService } from '../Service/ctrl.service';
import { BoRes } from '../Service/Interface/boRes.interface';
import { CreateCtrlDto, UpdateCtrlDto } from '../Dto/ctrl.dto';
export declare class CtrlController {
    private readonly ctrlService;
    constructor(ctrlService: CtrlService);
    getList(): Promise<BoRes>;
    getItemById(id: number): Promise<BoRes>;
    create(createCtrlDto: CreateCtrlDto): Promise<BoRes>;
    update(id: number, updateCtrlDto: UpdateCtrlDto): Promise<BoRes>;
    destroy(id: number): Promise<BoRes>;
}
