import { Office } from './Office';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";

@Entity("shop")
export class Shop extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    symb_name!: string;

    @Column()
    url!: string;

    @Column({ type: "date" })
    create_date_utc!: Date;

    @OneToMany(type => Office, office => office.shop)
    offices!: Office[];
}
