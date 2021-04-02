const puppeteer = require("puppeteer"); // include lib
var mkdirp = require("mkdirp");
const fs = require("fs");

(async () => {
  // declare function
  const browser = await puppeteer.launch(); // run browser
  const page = await browser.newPage(); // open new tab
  await page.goto(process.argv[2]); // go to site

  // Далее #hplogo - требуемый нам селектор
  await page.waitForSelector("#largeImageParentBox > div.large-image-clear"); // wait for the selector to load
  const element = await page.$("#largeImageParentBox > div.large-image-clear"); // declare a variable with an ElementHandle
  await page.waitForSelector("#dl-info-area > div > div.dl-name > a");
  const name = await page.$("#dl-info-area > div > div.dl-name > a");
  const info = await page.$("#product-detail-wrap > div.product-setinfo-wrap > div > div.product-name-wrap > h1");  
  const p = await page.evaluate((el) => el.textContent, name);

  !fs.existsSync("./" + p) && fs.mkdirSync("./" + p);
  // var stream = fs.createWriteStream("./" + p + "/info.txt");
  // stream.once("open", function (fd) {
  //   stream.write(info);
  //   stream.end();
  // });
  await element.screenshot({ path: "./" + p + "/image.png" }); 
  await info.screenshot({ path: "./" + p + "/info.png" }); // take screenshot element in puppeteer
  await browser.close(); // close browser
})();




