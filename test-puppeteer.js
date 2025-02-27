const puppeteer = require('puppeteer');

async function test() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  console.log('Page title:', await page.title());
  await browser.close();
}

test().catch(console.error);