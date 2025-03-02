const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://tommurphy.me', { waitUntil: 'networkidle2' });

    const content = await page.content(); // Get full rendered HTML
    console.log(content); // Print to console

    // Save to file
    const fs = require('fs');
    fs.writeFileSync('live-rendered.html', content);

    await browser.close();
})();
