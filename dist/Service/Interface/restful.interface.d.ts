import { BoRes } from "./boRes.interface";
export interface RestfulI {
    getList(): Promise<BoRes>;
    getItemById(id: number): Promise<BoRes>;
    create(formData: any): Promise<BoRes>;
    update(id: number, formData: any): Promise<BoRes>;
    destroy(id: number): Promise<BoRes>;
}
