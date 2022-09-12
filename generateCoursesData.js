const axios = require("axios");
const { JSDOM } = require("jsdom");
const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
  );
  await page.waitForSelector(".course-list--container--3zXPS img");
  await page.goto("https://www.eltiempo.es/", {
    waitUntil: "networkidle2",
    timeout: 0,
  });
  await page.screenshot({ path: "amazon.png", fullPage: true });
}

main();

// module.exports = main;
