const { link } = require("fs");
const puppeteer = require("puppeteer");
function run() {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--incognito"],
      });
      const page = await browser.newPage();
      await page.goto("https://openwebinars.net/buscador/?s=frontend");
      let list = [];
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
        const list = [];
        for (const curso of cursos) {
          list.push({
            description: curso.querySelector("p").textContent,
            title: curso.querySelector(".card-title").textContent,
          });
        }
        return list;
      });
      list = list.concat(cursitos);
      console.log(list);
      for (linktogo of resultsvalues) {
        await page.waitForSelector(".list-unstyled");
        let base = "https://openwebinars.net";
        await page.goto(base + linktogo.url);
      }
    } catch (e) {
      return reject(e);
    }
  });
}
run();
