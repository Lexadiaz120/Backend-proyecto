const axios = require("axios");
const { JSDOM } = require("jsdom");
const puppeteer = require("puppeteer");
const fs = require("fs/promises");

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--incognito"],
  });
  // const input = await Actor.getInput();
  const [browserPage] = await browser.pages();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
  );
  await page.goto("https://www.udemy.com/courses/search/?src=ukw&q=frontend", {
    waitUntil: "networkidle2",
  });

  // await page.type("#email", input.username);
  // await page.type("#pass", input.password);
  page.screenshot({
    path: "udemy.png",
    fullPage: true,
  });
}

main();
