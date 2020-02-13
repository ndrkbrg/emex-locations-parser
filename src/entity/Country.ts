import { City } from './City';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";

@Entity("country")
export class Country extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name_in_russian!: string;

    @Column()
    name_in_english!: string;

    @OneToMany(type => City, city => city.Country)
    cities!: City[];
}
