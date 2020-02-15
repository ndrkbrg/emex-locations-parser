import { Parser } from './utils/puppeteer';
import {createConnection} from "typeorm";
import {Db} from './utils/db';

const puppeteer = require('puppeteer');

(async () => {
    const connection = await createConnection();
    // const browser = await puppeteer.launch();
    let page = await Parser.parseStart(puppeteer);
    const regions = await Parser.getAllRegions(page);
    const shopRecord = await Db.getShop(connection);
    let restartCounter: number = 0;
    for(let [country, cities] of Array.from(regions) ) {
        const countryRecord = await Db.insertAndGetCountry(connection, country);

        for(let city of Array.from(cities) ) {
            const cityRecord = await Db.insertAndGetCity(connection, city, countryRecord);

            if (restartCounter === 50) {
                page = await Parser.restartBrowser(puppeteer, page);
                restartCounter = 0;
            }
            await Parser.clickCity(page, country, city);

            const locations = await Parser.parseLocation(page);

            for (const location of locations) {
                const officeRecord = await Db.insertAndGetOffice(connection, location, cityRecord, shopRecord);

                for (const phoneNumber of location.phones) {
                    await Db.insertAndGetPhone(connection, phoneNumber, officeRecord);
                }
            }

            restartCounter += 1;
        }
    }
    await Parser.closeBrowser(page);
  })();

