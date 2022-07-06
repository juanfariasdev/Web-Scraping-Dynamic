import pup from 'puppeteer';
import { ClearScreen } from './components/clearScreen';
import { MercadoLivre } from './mercadoLivre';

(async () => {
    const browser = await pup.launch({ headless: true });
    const page = await browser.newPage();
    ClearScreen();
    console.log("Web Scraping started - JuanFarias.dev 🔨");

    await MercadoLivre(page);

    console.log("Web Scraping ended - JuanFarias.dev 🔨");
    await page.waitForTimeout(2000)
    await browser.close();
})();