import { chromium } from "playwright";

//generar resultados

async function getResultsFromCPA(query) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('https://codigo-postal.co/');
    await page.waitForSelector('div[class="col-md-4 col-md-offset-4"]');

    const listResult = await page.evaluate(() => {
        let result = [];
        document.querySelectorAll('div[class="col-md-4 col-md-offset-4"] ul li').forEach((li, i) => {
            const a = li.querySelector('a');
            result.push({
                index: i,
                title: a.innerText,
                url: a.getAttribute('href')
            });
        });
        return result;
    });

     // Acceder a la primera URL en la lista de resultados
     const selectedUrl = listResult[0].url;
     const internalPage = await browser.newPage();
     await internalPage.goto(selectedUrl);

     await internalPage.waitForSelector('ul[class="column-list"]');
 
     const internalData = await page.evaluate(() => {
        let result = [];
        document.querySelectorAll('div[class="col-md-6"] ul li').forEach((li, i) => {
            const a = li.querySelector('a');
            result.push({
                index: i,
                title: a.innerText,
                url: a.getAttribute('href')
            });
        });
        return result;
    });
 
     console.log(internalData);
    console.log(listResult);
    await browser.close();
}



getResultsFromCPA('nodejs');

// visitar resultados y extraer informacion