const axios = require("axios");
const { JSDOM } = require("jsdom");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const fs = require("fs/promises");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
  );
  await page.goto("https://www.udemy.com/", {
    waitUntil: "networkidle2",
    timeout: 0,
  });
  await sleep(1000);
  await sleep(1000);
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  await page.setViewport({ width: bodyWidth, height: bodyHeight });
  await sleep(1000);
  await page.waitForSelector(".main-content");
  const cursos = await page.$(".main-content");
  const cursitos = await cursos.evaluate((node) => {
    let cursos = node.querySelectorAll("p");
    console.log(cursos, "cursillos");
    // const list = [];
    // for (const curso of cursos) {
    //   list.push({
    //     description: curso.querySelector("p").textContent,
    //     title: curso.querySelector(".card-title").textContent,
    //   });
    // }
    // return list;
    return cursos;
  });
  console.log(cursitos);

  await page.screenshot({ path: "amazon.png", fullPage: true });
}

main();

// module.exports = main;
