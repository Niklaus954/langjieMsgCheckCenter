import { Repository, UpdateResult, InsertResult } from 'typeorm';
import { Ctrl } from '../Entity/Lj_shop/ctrl.entity';
import { CreateCtrlI, UpdateCtrlI } from '../Service/Interface/Ctrl/ctrlParam.interface';
export declare class CtrlDao {
    private readonly ctrlRepo;
    constructor(ctrlRepo: Repository<Ctrl>);
    findAll(): Promise<Ctrl[]>;
    findById(id: number): Promise<Ctrl>;
    findItemByParam(param: any): Promise<Ctrl>;
    create(formData: CreateCtrlI): Promise<InsertResult>;
    destroy(id: number): Promise<UpdateResult>;
    update(id: number, formData: UpdateCtrlI): Promise<UpdateResult>;
}
