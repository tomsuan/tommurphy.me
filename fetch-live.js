const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://tommurphy.me', { waitUntil: 'networkidle2' });

    const content = await page.content();
    fs.writeFileSync('live-site.html', content);

    await browser.close();
})();
