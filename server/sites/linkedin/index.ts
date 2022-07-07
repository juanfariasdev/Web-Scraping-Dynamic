import { Page } from "puppeteer";
interface TextElement extends Element {
    innerText: string;
}
function configure() {
    const url = "https://www.linkedin.com";
    //const search = readlineSync.question('Informe o que gostaria de pesquisar: ') || 'exemplo';
    const search = "macbook";
    return {
        url,
        search
    }
}

async function getLinks(page: Page) {
    await page.waitForSelector('.jobs-search-results-list');

    await page.evaluate(() => document.querySelector('.jobs-search-results-list')?.scrollTo(({
        top: Number.MAX_SAFE_INTEGER, 
        left: 0, 
        behavior: 'smooth'
      })));
    await page.waitForTimeout(1000);

    await page.evaluate(() => document.querySelector('.jobs-search-results-list')?.scrollTo(({
        top: Number.MAX_SAFE_INTEGER, 
        left: 0, 
        behavior: 'smooth'
      })));
      await page.waitForTimeout(1000);
      await page.evaluate(() => document.querySelector('.jobs-search-results-list')?.scrollTo(({
        top: Number.MAX_SAFE_INTEGER, 
        left: 0, 
        behavior: 'smooth'
      })));
      await page.waitForTimeout(2000);

    await page.waitForSelector('.jobs-search-results__list-item.occludable-update.relative.scaffold-layout__list-item.ember-view');
    let newLinks: Array<any> = await page.$$eval('li.jobs-search-results__list-item.occludable-update.scaffold-layout__list-item.ember-view', (el) => el.map((value) => {

        let id = value.getAttribute('data-occludable-job-id');
        let title = value.querySelector('.job-card-list__title')?.textContent?.replace("\n", "").trim();

        console.log(title);

        return {id, title}
    }));
    return newLinks;

}

async function Linkedin(page: Page) {
    const { url, search } = configure();

    await page.goto(url);
    await page.setCookie({
        'name': 'li_at',
        'value' : ''
    })
    await page.goto(url + "/jobs/collections/recommended/")

  
  await page.waitForTimeout(2000);
  // Scroll to the bottom of the page with puppeteer-autoscroll-down
  

    let links = await getLinks(page);
    console.log(links);
};

export { Linkedin }