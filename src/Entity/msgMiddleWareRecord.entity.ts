import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class MsgMiddleWareRecord {

    @PrimaryColumn()
    msg_id: string;

    @Column()
    recall_url: string;

    @Column()
    data: string;
}