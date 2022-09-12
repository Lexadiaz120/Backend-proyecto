require("dotenv").config();
const express = require("express");
const fs = require("fs/promises");
const app = express();
app.use(express.static("./static"));
app.get("/links", async (req, res) => {
  const links = await fs.readFile("./links.json");
  res.send(JSON.parse(links));
});
app.listen(5000, async () => {
  console.log("Servidor funcionando el puerto");
});
