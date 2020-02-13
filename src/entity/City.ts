import { Office } from './Office';
import { Country } from './Country';
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, BaseEntity} from "typeorm";

@Entity("city")
export class City extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name_in_russian!: string;

    @Column()
    name_in_english!: string;

    @ManyToOne(type => Country, country => country.cities, {
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "country_id" })
    Country!: Country;

    @OneToMany(type => Office, office => office.city)
    offices!: Office[];

}