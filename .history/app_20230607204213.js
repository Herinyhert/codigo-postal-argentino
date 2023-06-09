import { chromium } from "playwright";

//generar resultados

async function getResultsFromCPA(query) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("https://codigo-postal.co/");
  await page.waitForSelector('ul li');

  const listResultCountry = await page.evaluate(() => {
    let result = [];
    document
      .querySelectorAll('div[class="col-md-4 col-md-offset-4"] ul li')
      .forEach((li, i) => {
        const a = li.querySelector("a");
        result.push({
          index: i,
          title: a.innerText,
          url: a.getAttribute("href"),
        });
      });
    return result;
  });

  // Acceder a la primera URL en la lista de resultados
  const selectedUrl = listResultCountry[0].url;
  const internalPage = await browser.newPage();
  await internalPage.goto(selectedUrl);
  await internalPage.waitForSelector('ul[class="column-list"]');

  const listResultProvince = await internalPage.evaluate(() => {
    let result = [];
    document.querySelectorAll('ul[class="column-list"] li').forEach((li, i) => {
      const a = li.querySelector("a");
      result.push({
        index: i,
        title: a.innerText,
        url: a.getAttribute("href"),
      });
    });
    return result;
  });

  // Acceder a una URL específica dentro de la página interna
  const selectedInternalUrl = listResultProvince[2].url;
  const nextPage = await browser.newPage();
  await nextPage.goto(selectedInternalUrl);
  await nextPage.waitForSelector('ul[class="cities"]');

  const listResultLocalities = await nextPage.evaluate(() => {
    let result = [];
    document.querySelectorAll('ul[class="cities"] li').forEach((li, i) => {
      const a = li.querySelector("a");
      result.push({
        index: i,
        title: a.innerText,
        url: a.getAttribute("href"),
      });
    });
    return result;
  });


//   console.log(listResult);
  console.log(listResultProvince);
  // console.log(listResultLocalities);
  await browser.close();
}

getResultsFromCPA("nodejs");

// visitar resultados y extraer informacion