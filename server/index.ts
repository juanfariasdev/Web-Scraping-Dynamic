import pup from 'puppeteer';
import { MercadoLivre } from './mercadoLivre';

(async () => {
    const browser = await pup.launch({ headless: true });
    const page = await browser.newPage();

    console.log("Web Scraping started");

    await MercadoLivre(page);

    console.log("Web Scraping ended");
    await page.waitForTimeout(2000)
    await browser.close();
})();