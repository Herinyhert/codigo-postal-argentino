import { chromium } from "playwright";
import { createObjectCsvWriter } from "csv-writer";
// import { createObjectCsvWriter } from "csv-writer";

// //generar resultados

// async function getResultsFromCPA(query) {
//   const browser = await chromium.launch();
//   const page = await browser.newPage();
//   await page.goto("https://codigo-postal.co/");
//   await page.waitForSelector("ul li");

//   const listResultCountry = await page.evaluate(() => {
//     let result = [];
//     document
//       .querySelectorAll('div[class="col-md-4 col-md-offset-4"] ul li')
//       .forEach((li, i) => {
//         const a = li.querySelector("a");
//         result.push({
//           index: i,
//           title: a.innerText,
//           url: a.getAttribute("href"),
//         });
//       });
//     return result;
//   });

//   const selectedUrl = listResultCountry[0].url;
//   const internalPage = await browser.newPage();
//   await internalPage.goto(selectedUrl);
//   await internalPage.waitForSelector("ul li");

//   const listResultProvince = await internalPage.evaluate(() => {
//     let result = [];
//     document.querySelectorAll('ul[class="column-list"] li').forEach((li, i) => {
//       const a = li.querySelector("a");
//       result.push({
//         index: i,
//         title: a.innerText,
//         url: a.getAttribute("href"),
//       });
//     });
//     return result;
//   });

//   const selectedInternalUrl = listResultProvince[0].url;
//   const nextPage = await browser.newPage();
//   await nextPage.goto(selectedInternalUrl);
//   await nextPage.waitForSelector('ul[class="cities"]');

//   const listResultLocalities = await nextPage.evaluate(() => {
//     let result = [];
//     document.querySelectorAll('ul[class="cities"] li').forEach((li, i) => {
//       const a = li.querySelector("a");
//       result.push({
//         index: i,
//         title: a.innerText,
//         url: a.getAttribute("href"),
//       });
//     });
//     return result;
//   });

//   const selectedInternalUrlLocalities = listResultLocalities[0].url;
//   const nextPageLocalities = await browser.newPage();
//   await nextPageLocalities.goto(selectedInternalUrlLocalities);
//   await nextPageLocalities.waitForSelector("div.table-responsive table tbody");

//   const listResultLocalitiesDos = await nextPageLocalities.evaluate(() => {
//     let result = [];
//     document
//       .querySelectorAll("div.table-responsive table tbody tr")
//       .forEach((row) => {
//         const columns = row.querySelectorAll("td");
//         const provincia = columns[0].innerText;
//         const localidad = columns[1].innerText;
//         const codigoPostal = columns[2].innerText;
//         const cpaUrl = columns[3].querySelector("a").getAttribute("href");

//         result.push({
//           provincia,
//           localidad,
//           codigoPostal,
//           cpaUrl,
//         });
//       });
//     return result;
//   });

//   const selectedInternalUrlStreet = listResultLocalitiesDos[0].cpaUrl;
//   const nextPageStreet = await browser.newPage();
//   await nextPageStreet.goto(selectedInternalUrlStreet);
//   await nextPageStreet.waitForSelector('ul[class="three_columns"]');

//   const listResultStreet = await nextPageStreet.evaluate(() => {
//     let result = [];
//     document
//       .querySelectorAll('ul[class="three_columns"] li')
//       .forEach((li, i) => {
//         const a = li.querySelector("a");
//         result.push({
//           index: i,
//           title: a.innerText,
//           url: a.getAttribute("href"),
//         });
//       });
//     return result;
//   });

//   const selectedInternalUrlEndStreet = listResultStreet[0].url;
//   const nextPageEndStreet = await browser.newPage();
//   await nextPageEndStreet.goto(selectedInternalUrlEndStreet);
//   await nextPageEndStreet.waitForSelector("div.table-responsive table tbody");

//   const listResultEndStreet = await nextPageEndStreet.evaluate(() => {
//     let result = [];
//     document
//       .querySelectorAll("div.table-responsive table tbody tr")
//       .forEach((row) => {
//         const columns = row.querySelectorAll("td");
//         const calleAvenida = columns[0].innerText;
//         const desde = columns[1].innerText;
//         const hasta = columns[2].innerText;
//         const aplicaA = columns[3].innerText;
//         const codigoPostal = columns[4].innerText;
//         const cpaUrl = columns[5].querySelector("a").getAttribute("href");

//         result.push({
//           calleAvenida,
//           desde,
//           hasta,
//           aplicaA,
//           codigoPostal,
//           cpaUrl,
//         });
//       });
//     return result;
//   });

//   const selectedInternalUrlHeight = listResultEndStreet[0].cpaUrl;
//   const nextPageHeight = await browser.newPage();
//   await nextPageHeight.goto(selectedInternalUrlHeight);
//   await nextPageHeight.waitForSelector("div.table-responsive table tbody");

//   const listResultHeight = await nextPageHeight.evaluate(() => {
//     let result = [];
//     document
//       .querySelectorAll("div.table-responsive table tbody tr")
//       .forEach((row) => {
//         const columns = row.querySelectorAll("td");
//         const codigoPostal = columns[0].innerText;
//         const provincia = columns[1].innerText;
//         const localidad = columns[2].innerText;
//         const calleAvenida = columns[3].innerText;
//         const rangoAltura = columns[4].innerText;

//         result.push({
//           codigoPostal,
//           provincia,
//           localidad,
//           calleAvenida,
//           rangoAltura,
//         });
//       });
//     return result;
//   });

//   // console.log(listResult);
//   // console.log(listResultProvince);
//   // console.log(listResultLocalities);
//   // console.log(listResultLocalitiesDos);
//   // console.log(listResultStreet);
//   // console.log(listResultEndStreet);
//   // console.log(selectedInternalUrlHeight)
//   // console.log(listResultHeight);

//   const results = {
//     listResultCountry,
//     listResultProvince,
//     listResultLocalities,
//     listResultLocalitiesDos,
//     listResultStreet,
//     listResultEndStreet,
//     listResultHeight,
//   };

//   const combinedResults = [];
//   for (const key in results) {
//     combinedResults.push(...results[key]);
//   }
  
//   // Guardar los resultados en un archivo CSV
//   const resultKeys = Object.keys(combinedResults[0]);
//   const csvWriter = createObjectCsvWriter({
//     path: "resultados.csv",
//     header: resultKeys.map((key) => ({ id: key, title: key })),
//   });
//   await csvWriter.writeRecords(combinedResults);

//   console.log("Los datos se han guardado en el archivo resultados.csv");

//   console.log(results);
//   await browser.close();
// }

// getResultsFromCPA("nodejs");



async function scrapeCPAData() {
  const browser = await chromium.launch();

  try {
    const page = await browser.newPage();
    await page.goto("https://codigo-postal.co/");
    console.log("Página principal cargada");

    const countries = await page.$$eval(
      'div[class="col-md-4 col-md-offset-4"] ul li a',
      (links) =>
        links.map((link, index) => ({
          index,
          title: link.innerText,
          url: link.href,
        }))
    );

    for (const country of countries) {
      const countryPage = await browser.newPage();
      await countryPage.goto(country.url);
      console.log(`Página de país (${country.title}) cargada`);

      const provinces = await countryPage.$$eval(
        "ul.column-list li a",
        (links) =>
          links.map((link, index) => ({
            index,
            title: link.innerText,
            url: link.href,
          }))
      );

      for (const province of provinces) {
        const provincePage = await browser.newPage();
        await provincePage.goto(province.url);
        console.log(`Página de provincia (${province.title}) cargada`);

        const localities = await provincePage.$$eval(
          "ul.cities li a",
          (links) =>
            links.map((link, index) => ({
              index,
              title: link.innerText,
              url: link.href,
            }))
        );

        for (const locality of localities) {
          const localityPage = await browser.newPage();
          await localityPage.goto(locality.url);
          console.log(`Página de localidad (${locality.title}) cargada`);

          const streets = await localityPage.$$eval(
            "ul.three_columns li a",
            (links) =>
              links.map((link, index) => ({
                index,
                title: link.innerText,
                url: link.href,
              }))
          );

          for (const street of streets) {
            const streetPage = await browser.newPage();
            await streetPage.goto(street.url);
            console.log(`Página de calle (${street.title}) cargada`);

            const postalCodes = await streetPage.$$eval(
              "div.table-responsive table tbody tr",
              (rows) =>
                rows.map((row) => {
                  const columns = Array.from(row.querySelectorAll("td"));
                  return {
                    provincia: columns[0].innerText,
                    localidad: columns[1].innerText,
                    codigoPostal: columns[2].innerText,
                    cpaUrl: columns[3].querySelector("a")?.href || "",
                  };
                })
            );

            // Guardar los resultados en un archivo CSV
            const csvWriter = createObjectCsvWriter({
              path: "resultados1.csv",
              header: [
                { id: "provincia", title: "Provincia" },
                { id: "localidad", title: "Localidad" },
                { id: "codigoPostal", title: "Código Postal" },
                { id: "cpaUrl", title: "URL CPA" },
              ],
            });
            await csvWriter.writeRecords(postalCodes);

            await streetPage.close();
            console.log(`Página de calle (${street.title}) cerrada`);
          }

          await localityPage.close();
          console.log(`Página de localidad (${locality.title}) cerrada`);
        }

        await provincePage.close();
        console.log(`Página de provincia (${province.title}) cerrada`);
      }

      await countryPage.close();
      console.log(`Página de país (${country.title}) cerrada`);
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  } finally {
    await browser.close();
  }
}

scrapeCPAData();