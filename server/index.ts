import pup from 'puppeteer';

const url = "https://www.mercadolivre.com.br/";
const searchFor = "macbook";

(async () => {
    const browser = await pup.launch({ headless: false });
    const page = await browser.newPage();
    console.log("iniciado");
    await page.goto(url);

    await page.waitForSelector('#cb1-edit')

    await page.type('#cb1-edit', searchFor)

    await page.waitForTimeout(2000)

    console.log("entrei na url");
    await browser.close();
})();