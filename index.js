const express = require("express");
const cors = require("cors");
const app = express();
const got = require("got");
const cheerio = require("cheerio");
const fs = require("fs");
app.use(cors());

const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.status(200).send("API is running!");
});

app.get("/crypto", async (req, res) => {
  try {
    const resp = await got("https://goldprice.org/cryptocurrency-price");
    const $ = cheerio.load(resp.body);
    var data = [];
    $("tbody tr").each((i, element) => {
      var title, markCap, price, circSupply;
      $(element)
        .find("td")
        .each((rowNo, td) => {
          if (rowNo === 1) {
            title = $(td).text();
          }
          if (rowNo === 2) {
            markCap = $(td).text();
          }
          if (rowNo === 3) {
            price = $(td).text();
          }
          if (rowNo === 4) {
            circSupply = $(td).text();
          }
        });
      var info = {
        name: title.trim(),
        price: price.trim(),
        marketCapital: markCap.trim(),
        circulatingSupply: circSupply.trim(),
      };
    });
  } catch (err) {
    res.send(err);
  }
});

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});
