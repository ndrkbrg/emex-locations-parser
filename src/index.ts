import { Parser } from './utils/puppeteer';
import {createConnection} from "typeorm";
import {Db} from './utils/db';

const puppeteer = require('puppeteer');

(async () => {
    const connection = await createConnection();
    const browser = await puppeteer.launch();
    const page = await Parser.parseStart(browser);
    const regions = await Parser.getAllRegions(page);
    const shopRecord = await Db.getShop(connection);
    for(let [country, cities] of Array.from(regions) ) {
        const countryRecord = await Db.insertAndGetCountry(connection, country);

        for(let city of Array.from(cities) ) {
            const cityRecord = await Db.insertAndGetCity(connection, city, countryRecord);

            await Parser.clickCity(page, country, city);

            const locations = await Parser.parseLocation(page);

            for (const location of locations) {
                const officeRecord = await Db.insertAndGetOffice(connection, location, cityRecord, shopRecord);

                for (const phoneNumber of location.phones) {
                    await Db.insertAndGetPhone(connection, phoneNumber, officeRecord);
                }
            }
        }
    }
    await browser.close();
  })();

