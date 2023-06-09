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

  const selectedUrl = listResultCountry[0].url;
  const internalPage = await browser.newPage();
  await internalPage.goto(selectedUrl);
  await internalPage.waitForSelector('ul li');

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

  const selectedInternalUrl = listResultProvince[0].url;
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

  const selectedInternalUrlLocalities = listResultLocalities[0].url;
  const nextPageLocalities = await browser.newPage();
  await nextPageLocalities.goto(selectedInternalUrlLocalities);
  await nextPageLocalities.waitForSelector('div.table-responsive table tbody');

  const listResultLocalitiesDos = await nextPageLocalities.evaluate(() => {
    let result = [];
    document.querySelectorAll('div.table-responsive table tbody tr').forEach((row) => {
      const columns = row.querySelectorAll('td');
      const provincia = columns[0].innerText;
      const localidad = columns[1].innerText;
      const codigoPostal = columns[2].innerText;
      const cpaUrl = columns[3].querySelector("a").getAttribute("href");
      
      result.push({
        provincia,
        localidad,
        codigoPostal,
        cpaUrl,
      });
    });
    return result;
  });

  const selectedInternalUrlStreet = listResultLocalitiesDos[0].url;
  const nextPageStreet = await browser.newPage();
  await nextPageStreet.goto(selectedInternalUrl);
  await nextPageStreet.waitForSelector('ul[class="cities"]');

  const listResultStreet = await nextPageStreet.evaluate(() => {
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
  // console.log(listResultProvince);
  // console.log(listResultLocalities);
  console.log(listResultLocalitiesDos);
  await browser.close();
}

getResultsFromCPA("nodejs");

// visitar resultados y extraer informacion