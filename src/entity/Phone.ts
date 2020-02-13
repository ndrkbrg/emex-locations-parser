import { Office } from './Office';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity} from "typeorm";

@Entity("shop_office_phone")
export class Phone extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    phone!: string;

    @Column()
    is_deleted!: boolean;

    @ManyToOne(type => Office, office => office.phones, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "shop_office_id" })
    office!: Office;

}