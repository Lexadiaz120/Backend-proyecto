const axios = require("axios");
const { JSDOM } = require("jsdom");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const fs = require("fs/promises");
const { response } = require("express");

async function main() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--incognito"],
    });
    const [browserPage] = await browser.pages();
    let data = [];
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
    );
    let pagesToScrape = 5;
    let currentPage = 1;
    await page.waitForSelector(".list-unstyled");
    const cursos = await page.$(".list-unstyled");
    console.log(cursos);
    await page.goto("https://openwebinars.net/buscador/?s=frontend", {
      waitUntil: "networkidle2",
    });
    while (currentPage <= pagesToScrape) {
      const cursitos = await cursos.evaluate((node) => {
        let cursos = node.querySelectorAll(".mb-3");
        const list = [];
        for (const curso of cursos) {
          list.push({
            description: curso.querySelector("p").textContent,
            title: curso.querySelector(".card-title").textContent,
          });
        }
        return list;
      });
      console.log(cursitos);
      const button = await page.$(".d-md-none");
      await button.evaluate((b) => b.click());
    }
    // await page.waitForSelector(".d-md-none ");
    page.screenshot({
      path: "udemy.png",
      fullPage: true,
    });
  } catch (error) {
    console.log(error.message);
  }
}

main();
