const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const {executablePath} = require('puppeteer')
const fs = require("fs").promises

puppeteer.use(StealthPlugin());

const func = async () => {
    const browser = await puppeteer.launch({headless: false, executablePath:process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : executablePath()});
    const page = await browser.newPage();
    await page.goto('https://chat.openai.com/chat');
    await page.waitForSelector("div > div.flex.flex-row.gap-3 > button:nth-child(1)");
    await page.click("div > div.flex.flex-row.gap-3 > button:nth-child(1)");
    await page.waitForSelector("#username");
    await page.type("#username", "alitarksahin635@gmail.com");
    await page.keyboard.press("Enter");
    await page.waitForSelector("#password");
    await page.type("#password", "Babaking90");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(10000);
    await page.waitForSelector(".h-4.w-4.mr-1", {visible: true});
    const cookies = await page.cookies();
    await fs.writeFile("./cookies.json", JSON.stringify(cookies, null, 2));
    await browser.close();
}

func();
    
