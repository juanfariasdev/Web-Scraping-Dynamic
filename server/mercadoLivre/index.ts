import { Page } from 'puppeteer';


interface IResponse {
    title?: string | null;
    price?: string | null;
    seller?: string | null;
    link?: string | null;
}
function configure() {
    const url = "https://www.mercadolivre.com.br/";
    const search = "macbook";

    return {
        url,
        search
    }
}

async function getPages(page: Page, links: any) {
    const products: IResponse[] = [];
    let c = 1;

    for (const link of links) {
        if (c >= 10) break;
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
    return products;
}

async function MercadoLivre(page: Page) {
    const { url, search } = configure();

    await page.goto(url);

    const searchFild = "#cb1-edit"
    await page.waitForSelector(searchFild)
    await page.type(searchFild, search)

    await Promise.all([
        page.waitForNavigation(),
        page.click('.nav-search-btn')
    ])

    const links = await page.$$eval('.ui-search-result__image > a', (el) => el.map((link: any) => link.href));


    let products = await getPages(page, links);
    console.log(products);
};

export { MercadoLivre }