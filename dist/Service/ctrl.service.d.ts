import { CtrlI } from './Interface/ctrl.interface';
import { CtrlDao } from '../Dao/ctrl.dao';
import { BoRes } from './Interface/boRes.interface';
import { CreateCtrlI, UpdateCtrlI } from './Interface/Ctrl/ctrlParam.interface';
export declare class CtrlService implements CtrlI {
    private readonly ctrlDao;
    constructor(ctrlDao: CtrlDao);
    getList(): Promise<BoRes>;
    getItemById(id: number): Promise<BoRes>;
    create(formData: CreateCtrlI): Promise<BoRes>;
    update(id: number, formData: UpdateCtrlI): Promise<BoRes>;
    destroy(id: number): Promise<BoRes>;
}
