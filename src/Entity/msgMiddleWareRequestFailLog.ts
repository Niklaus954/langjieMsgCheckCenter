import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class MsgMiddleWareRequestFailLog {

    @PrimaryColumn()
    msg_id: string;

    @Column({
        default: 0,
    })
    count: number;
}