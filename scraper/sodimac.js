const puppeteer = require("puppeteer");

async function scrapSodimac() {
    try {
        const URL = 'https://www.sodimac.cl/sodimac-cl/search?Ntt=cemento&currentpage=1&f.product.attribute.Contenido=25%2520kg&f.product.attribute.Tipo=cemento'
        const browser = await puppeteer.launch({
            defaultViewport: null
        });
        const page = await browser.newPage();
        let region = 'LAGOS';
        let ciudad = 'OSORNO';

        await page.goto(URL);
        await page.setViewport({
            width: 700, height: 872
        });

        await page.click('[id="testId-btn-zone-modal-link-name"]');
        await page.click('div[id="testId-Dropdown-divgeofieldoptions2-value"]');
        await page.type('#testId-input-dropdown-search-box', region);
        await page.click('[id="testId-li-testId-DropdownList-testId-Dropdown-divgeofieldoptions2-dropdown-list-item-0"]');
        await page.click('div[id="testId-Dropdown-divgeofieldoptions4-value"]');
        await page.type('#testId-input-dropdown-search-box', ciudad);
        await page.click('[id="testId-li-testId-DropdownList-testId-Dropdown-divgeofieldoptions4-dropdown-list-item-0"]');
        await page.setViewport({
            width: 1600, height: 929
        });
        await page.click('[id="testId-btn-zone-selection-change"]');
        await page.waitForNavigation();
        await page.waitForNavigation();
        const urlNueva = page.url();
        console.log(URL);
        console.log(urlNueva);
        await page.goto(urlNueva);
        let data = await page.evaluate(() => {
            let results = []
            let items = document.querySelectorAll('div.jsx-4095377833.product-basic-info')
            items.forEach((item) => {
                results.push({
                    title: item.querySelector('h1.jsx-4095377833.product-title').innerText,
                    price: item.querySelector('div.jsx-2016778456.primary').innerText,
                })
            })
            return results
        })
        console.log(data);

        // await Promise.all([
        //   page.screenshot({
        //     path: ('screenshot/productos' + region + ciudad + '.png')
        //   })
        // ]);
        await page.close();
        await browser.close();

    } catch (error) {
        console.error(error);
    }
}

scrapSodimac();
// //Variables de asignacion de etiqueta
// let productTitle = '';
// let productPrice ='';
// let data = await page.evaluate(() => {
//   let results = []
//   let items = document.querySelectorAll('div.ie11-product-container')
//   items.length > 1 ? (document.querySelectorAll('div.ie11-product-container'), productTitle = 'h2.product-title', productPrice = 'span.jsx-4135487716') :
//    document.querySelector('div.jsx-4095377833.product-basic-info' ,  productTitle = 'h1.jsx-4095377833.product-title', productPrice = 'span.jsx-2016778456');
//   items.forEach((item) => {
//     results.push({
//       title: item.querySelector(productTitle).innerText,
//       price: item.querySelector(productPrice).innerText,
//     })
//   })
//   return results
// })
// console.log(data);
