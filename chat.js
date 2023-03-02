const puppeteer = require('puppeteer-extra')
const {executablePath} = require('puppeteer')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const fs = require("fs").promises
puppeteer.use(StealthPlugin());

const chat = async (input) => {
    return new Promise((resolve) => {
        puppeteer.launch({ headless: "new",
          executablePath:process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : executablePath()
      }).then(async browser => {
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
           const cookiesString = await fs.readFile("./cookies.json");
           const cookies = JSON.parse(cookiesString);
           await page.setCookie(...cookies);
            await page.goto('https://chat.openai.com/chat', {waitUntil: "networkidle2"}) 
            console.log("on the site");
            await page.setDefaultTimeout(0);
            
            await page.waitForSelector("textarea", {visible: true});
            await page.type("textarea", input);
            await page.keyboard.press("Enter");
            await page.waitForTimeout(10000);
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