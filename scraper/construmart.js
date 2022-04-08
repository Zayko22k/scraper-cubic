const puppeteer = require("puppeteer");

async function scrapConstrumart() {
    try {
        const URL = 'https://www.construmart.cl/25-kg/cemento?_q=cemento&fuzzy=0&initialMap=ft&initialQuery=cemento&map=contenido,ft&operator=and';
        const browser = await puppeteer.launch({
            defaultViewport: null
        });

        const page = await browser.newPage();

        let region = '';
        let ciudad = '';

        await page.goto(URL, {waitUntil: 'networkidle0'});
        await page.setViewport({
            width: 1669, height: 929
        });
        await page.select('select[name="region"]', 'X LOS LAGOS');
        await page.select('select[name="centro"]', 'CM28');
        await page.click('button.construmartcl-map-init-0-x-buttonStoreModal');
        await page.waitForNavigation({waitUntil: 'networkidle2'})
        let data = await page.evaluate(() => {
            let results = [];
            let items = document.querySelectorAll('a.vtex-product-summary-2-x-clearLink.vtex-product-summary-2-x-clearLink--shelf-home-desktop.h-100.flex.flex-column');
            items.forEach((item) => {
                if(item != null){
                    results.push({
                        title: item.querySelector('h3.vtex-product-summary-2-x-productNameContainer.mv0.vtex-product-summary-2-x-nameWrapper.overflow-hidden.c-on-base.f5').innerText,
                        price: item.querySelector('div.vtex-store-components-3-x-sellingPrice.vtex-store-components-3-x-sellingPriceContainer.vtex-product-summary-2-x-sellingPriceContainer.pt1.pb3.c-on-base.vtex-product-summary-2-x-price_sellingPriceContainer').innerText,
                    })
                }

            })
            return results
        })
        console.log(data);
        await page.close();
        await browser.close();
    } catch (error) {
        console.error(error);
    }
}

scrapConstrumart();
