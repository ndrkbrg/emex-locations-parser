import { Country } from './../entity/Country';
import { Shop } from './../entity/Shop';
import { City } from './../entity/City';
import { Office } from './../entity/Office';
import { Connection } from "typeorm";
import { Phone } from "../entity/Phone";

export class Db {

    public static insertAndGetPhone = async (connection: Connection, phoneNumber: string, office: Office) => {
        let phoneRecord = await connection.manager.findOne(Phone, { phone: phoneNumber });
        if(!phoneRecord) // Create if not exist
        {
            let newPhone = new Phone();
            newPhone.phone = phoneNumber;
            newPhone.office = office;
            await connection.manager.save(newPhone);
            phoneRecord = newPhone;
        }
        return phoneRecord;
    }

    public static insertAndGetOffice = async (connection: Connection, location: any, city: City, shop: Shop) => {
        let officeRecord = await connection.manager.findOne(Office, { external_id: location.locationId });
        if(!officeRecord) // Create if not exist
        {
            let newOffice = new Office();
            newOffice.city = city;
            newOffice.address = location.address;
            newOffice.create_date_utc = new Date();
            newOffice.work_time = location.work_time;
            newOffice.shop = shop;
            newOffice.external_id = location.locationId;
            await connection.manager.save(newOffice);
            officeRecord = newOffice;
        }
        return officeRecord;
    }

    public static insertAndGetCity = async (connection: Connection, city: string, country: Country) => {
        let cityRecord = await connection.manager.findOne(City, { name_in_russian: city });
        if(!cityRecord) // Create if not exist
        {
            let newCity = new City();
            newCity.name_in_russian = city;
            newCity.Country = country;
            await connection.manager.save(newCity);
            cityRecord = newCity;
        }
        return cityRecord;
    }

    public static insertAndGetCountry = async (connection: Connection, country: string) => {
        let countryRecord = await connection.manager.findOne(Country, { name_in_russian: country });
        if(!countryRecord) // Create if not exist
        {
            let newCountry = new Country();
            newCountry.name_in_russian = country;
            await connection.manager.save(countryRecord);
            countryRecord = newCountry;
        }
        return countryRecord;
    }

    public static getShop = async (connection: Connection) => {
        return await connection.manager.findOne(Shop, { id: 1 }) || new Shop();
    }
}
