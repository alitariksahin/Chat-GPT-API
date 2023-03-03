const puppeteer = require("puppeteer-extra");
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const {executablePath} = require('puppeteer')
const fs = require("fs").promises

puppeteer.use(StealthPlugin());

const login = async (email, password) => {
    const browser = await puppeteer.launch({headless: "new", executablePath: executablePath()});
    const page = await browser.newPage();
    await page.goto('https://chat.openai.com/chat');
    await page.setDefaultTimeout(0);
    await page.waitForSelector("div > div.flex.flex-row.gap-3 > button:nth-child(1)");
    await page.click("div > div.flex.flex-row.gap-3 > button:nth-child(1)");
    await page.waitForSelector("#username");
    await page.type("#username", email);
    await page.keyboard.press("Enter");
    await page.waitForSelector("#password");
    await page.type("#password", password);
    await page.keyboard.press("Enter");
    await page.waitForSelector(".h-4.w-4.mr-1", {visible: true});
    const cookies = await page.cookies();
    await fs.writeFile("./cookies/cookies.json", JSON.stringify(cookies, null, 2));
    await browser.close();
}

module.exports = login;
    
