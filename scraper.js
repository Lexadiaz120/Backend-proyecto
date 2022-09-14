const { link } = require("fs");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
function run() {
  const list = [];
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--incognito"],
      });
      let pagesToScrape = 2;
      let currentPage = 1;
      const page = await browser.newPage();
      await page.goto("https://openwebinars.net/buscador/?s=frontend", {
        waitUntil: "networkidle2",
      });
      await page.waitForSelector(".list-unstyled");
      const cursos = await page.$(".list-unstyled");
      await page.waitForSelector(".pagination");
      let links = await page.$(".pagination");
      await page.waitForSelector(".list-unstyled");
      let results = await links.evaluate((node) => {
        let linkitem = node.querySelectorAll("a");
        let links = [];
        console.log(links, "enlaces");
        for (let link of linkitem) {
          links.push({
            url: link.getAttribute("href"),
          });
        }
        return links;
      });
      let resultsvalues = results.slice(1, 2);
      console.log(resultsvalues);
      const cursitos = await cursos.evaluate((node) => {
        let cursos = node.querySelectorAll(".mb-3");
        for (const curso of cursos) {
          list.push({
            description: curso.querySelector("p").textContent,
            title: curso.querySelector(".card-title").textContent,
          });
        }
        return list;
      });
      console.log(list);
      console.log(cursitos);
      while (currentPage <= pagesToScrape) {
        if (currentPage < pagesToScrape) {
          for (linktogo of resultsvalues) {
            let base = "https://openwebinars.net";
            await page.goto(
              "https://openwebinars.net/buscador/?s=frontend&page=2",
              {
                waitUntil: "networkidle2",
              }
            );
            await page.waitForSelector(".list-unstyled");
            let curslist = await page.$(".list-unstyled");
            let cursosTwo = await curslist.evaluate((node) => {
              let cursos = node.querySelectorAll(".mb-3");
              console.log(cursos);
              for (let curso of cursos) {
                list.push({
                  description: curso.querySelector("p").textContent,
                  title: curso.querySelector(".card-title").textContent,
                });
                return list;
              }
              list = list.concat(cursosTwo);
              console.log(list);
            });
          }
        }
        currentPage++;
        console.log(list);
      }
    } catch (e) {
      return reject(e);
    }
  });
}
run();
