import { Entity, Column, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity()
export class MsgMiddleWareRecord {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    msg_id: string;

    @Column()
    moduleName: string;
}