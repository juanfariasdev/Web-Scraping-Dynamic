import pup from 'puppeteer';
import { ClearScreen } from './components/clearScreen';
import { Linkedin } from './sites/linkedin';
import { MercadoLivre } from './sites/mercadoLivre';

(async () => {
    const browser = await pup.launch({ headless: false });
    const page = await browser.newPage();
    ClearScreen();
    console.log("Web Scraping started - JuanFarias.dev 🔨");

    //await MercadoLivre(page);
    await Linkedin(page);
    console.log("Web Scraping ended - JuanFarias.dev 🔨");
    await page.waitForTimeout(10000)
    await browser.close();
})();