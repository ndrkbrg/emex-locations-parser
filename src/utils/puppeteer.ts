export class Parser {

    public static clickByText = async(page: any, selector: string, text: string) => {
        await page.$$eval(selector, (selectorMatched: any, text: string) => {
            for(const index in selectorMatched) {
                if(selectorMatched[index].textContent === text) {
                    selectorMatched[index].click();
                    break;
                }
            }
        }, text);
    }

    public static parseLocation = async(page: any) => {
        const locations = await page.$$eval(
            'li.registration-location-balloon',
            (nodes: any) =>
                nodes.map((element: any) => {
                    const idString = element.querySelector('div.placemark-text-headercontainer > span').lastElementChild.title
                    return {
                        locationId: idString.split(' ')[1],
                        address: element.querySelector('div.address').innerText,
                        phones: Array.from(element.querySelectorAll('div.phone-container > span'), (span: any) => span.innerText),
                        work_time: element.querySelector('div.work-time-container').innerText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim()
                    };
                })
        );
        return locations;
    }

    public static clickCity = async (page:any, country: string, city: string) => {
        if (await page.$("div.country-list-item") === null) {
            await page.waitForSelector('span.dotted-reg-link-container');
            await page.$eval('span.dotted-reg-link-container', (el: any) => el.click());
            await page.waitForSelector('.country-list-item');
        }
        await Parser.clickByText(page, "div.country-list-item", country);
        await Parser.clickByText(page, "span.b-regions__region", city);
        await page.waitForSelector('div.placemark-text-headercontainer');
    }

    public static getAllRegions = async(page:any) => {
        let regions = new Map<string, Array<string>>();
        const countries = await page.evaluate(() => { 
            return Array.from(document.querySelectorAll("div.country-list-item"), (div: any) => div.innerText);
        });
        for (let i = 1; i < countries.length; i++) {
            await Parser.clickByText(page, "div.country-list-item", countries[i])
            const cities = await page.evaluate(() => {
                return Array.from(document.querySelectorAll("span.b-regions__region"), (span: any) => span.innerText);
            });
            regions.set(countries[i], cities);
        }
        return regions;
    }

    public static parseStart = async(puppeteer:any) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({width: 1920, height: 1080});
        await page.goto('https://emex.ru/');
        await page.$eval('button.search-button', (el: any) => el.click());
        await page.waitForNavigation({waitUntil: 'domcontentloaded'});
        await page.$eval('span.dotted-reg-link-container', (el: any) => el.click());
        await page.waitForSelector('.country-list-item');
        return page;
    }

    public static closeBrowser = async (page:any) => {
        const browser = page.browser();
        await browser.close();
    }

    public static restartBrowser = async(puppeteer:any, page:any) => {
        Parser.closeBrowser(page);
        return Parser.parseStart(puppeteer);
    }


}
