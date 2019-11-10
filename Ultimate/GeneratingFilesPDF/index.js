const puppeteer = require('puppeteer');

(async () => {
  
  /* 1. Creating a PDF from the website */
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://learnscraping.com/');
  await page.pdf({
    path: './page.pdf',
    format: 'A4'
  })
  await browser.close();


  /* 2. Getting the URL or the Title of the current page */
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://learnscraping.com/');
  
  let title = await page.title();
  console.log(`Title of the page is ${title}`);

  let url = await page.url();
  console.log(`URL of the page is ${url}`);

  await browser.close();


  /* 3. Emulate a phone */
  const devices = require('puppeteer/DeviceDescriptors');

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.emulate(devices['iPhone X']);

  await page.goto('https://learnscraping.com/');

  await browser.close();
  
})();