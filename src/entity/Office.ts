import { Phone } from './Phone';
import { Shop } from './Shop';
import { City } from './City';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity, OneToMany} from "typeorm";

@Entity("shop_office")
export class Office extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    address!: string;

    @Column({ type: "numeric" })
    latitude!: number;

    @Column({ type: "numeric" })
    longitude!: number;

    @Column({ type: "date" })
    create_date_utc!: Date;

    @Column({ type: "boolean", default: false })
    is_deleted!: boolean;

    @Column()
    email_login!: string;

    @Column()
    email_password!: string;

    @Column()
    shop_login!: string;

    @Column()
    shop_password!: string;

    @Column({ type: "boolean" })
    is_processed!: boolean;

    @Column({ type: "boolean" })
    is_email_confirmed!: boolean;

    @Column({ type: "boolean" })
    is_shop_confirmed!: boolean;

    @Column()
    work_time!: string;

    @Column({ type: "date" })
    last_check_date_utc!: Date;

    @Column()
    external_id!: string;

    @ManyToOne(type => Shop, shop => shop.offices, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "shop_id" })
    shop!: Shop;

    @ManyToOne(type => City, city => city.offices, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "city_id" })
    city!: City;

    @OneToMany(type => Phone, phone => phone.office)
    phones!: Phone[];
}