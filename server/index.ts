import pup from 'puppeteer';

const url = "https://www.mercadolivre.com.br/";
const searchFor = "macbook";


interface IResponse {
    title?: string | null;
    price?: string | null;
    seller?: string | null;
    link?: string | null;
}


(async () => {
    let c = 1;
    const products: IResponse[] = [];
    const browser = await pup.launch({ headless: true });
    const page = await browser.newPage();
    console.log("iniciado");
    await page.goto(url);

    await page.waitForSelector('#cb1-edit')

    await page.type('#cb1-edit', searchFor)


    await Promise.all([
        page.waitForNavigation(),
        page.click('.nav-search-btn')
    ])

    const links = await page.$$eval('.ui-search-result__image > a', (el) => el.map((link: any) => link.href));

    for (const link of links) {
        console.log('Pagina ', c);
        await page.goto(link)
        await page.waitForSelector('.ui-pdp-title');

        const title = await page.$eval('.ui-pdp-title', el => el.textContent);
        const price = await page.$eval('.andes-money-amount__fraction', el => el.textContent)

        const seller = await page.evaluate(() => {
            const el = document.querySelector('.ui-pdp-seller__header__title .ui-pdp-action-modal__link');
            if (!el) return null;
            return el.textContent;
        })

        const obj: IResponse = {
            title,
            price,
            seller: seller ? seller : "",
            link
        };
        products.push(obj)
        c++;
    }
    console.log(products);
    await page.waitForTimeout(2000)
    await browser.close();
})();