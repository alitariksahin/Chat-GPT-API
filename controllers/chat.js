const puppeteer = require('puppeteer-extra')
const {executablePath} = require('puppeteer-core')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin());

const chat = async (input) => {
    return new Promise((resolve) => {
        puppeteer.launch({ headless: "new", executablePath: executablePath(), userDataDir: "./tmp" }).then(async browser => {
            const page = await browser.newPage()
            await page.setViewport({
              width: 1920 + Math.floor(Math.random() * 100),
              height: 3000 + Math.floor(Math.random() * 100),
              deviceScaleFactor: 1,
              hasTouch: false,
              isLandscape: false,
              isMobile: false,
          });
          await page.setJavaScriptEnabled(true);
            await page.goto('https://chat.openai.com/chat', {waitUntil: "networkidle2"}) 
            await page.setDefaultTimeout(0);
            await page.waitForSelector("textarea", {visible: true});
            await page.type("textarea", input);
            await page.click(".h-4.w-4.mr-1");
            await page.waitForSelector(".h-4.w-4.mr-1", {visible: true});
            const response = await page.$$eval("div.flex.flex-grow.flex-col.gap-3 > div > div > p", (response) => {
                let res = []
                for (p of response) {
                  res.push(p.textContent);
                }
                return res.join("\n");
              })
            await browser.close();
            resolve(response);
          })
    })
    
      
}

module.exports = chat;