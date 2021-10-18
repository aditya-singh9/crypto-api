const express = require("express");
const cors = require("cors");
const app = express();
const got = require("got");
const cheerio = require("cheerio");
const fs = require("fs");
app.use(cors());

const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "Usage:   \nGo to https://coincrypto-api.herokuapp.com/crypto for all top 100 cryptocurrency data.    To get details of specific cryptocurrency - https://coincrypto-api.herokuapp.com/crypto{cryptoName}"
    );
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
      data.push(info);
    });
    res.status(200).send(JSON.stringify(data));
  } catch (err) {
    res.send(err);
  }
});

app.get("/crypto/:name", async (req, res) => {
  let searchQuery = req.params.name;
  try {
    const resp = await got("https://goldprice.org/cryptocurrency-price");
    const $ = cheerio.load(resp.body);
    var data = null;
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
      var finalInfo = {
        name: title.trim(),
        price: price.trim(),
        marketCapital: markCap.trim(),
        circulatingSupply: circSupply.trim(),
      };
      if (title.trim().toLowerCase() === searchQuery.trim().toLowerCase()) {
        data = JSON.stringify(finalInfo);
      }
    });
    if (data !== null) return res.status(200).send(data);
    else
      return res
        .status(404)
        .send(`info about ${searchQuery} does not exist in our database`);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.get("/crypto/:name", async (req, res) => {
  let srchParam = req.params.name;
  try {
    const resp = await got("https://goldprice.org/cryptocurrency-price");
    const $ = cheerio.load(resp.body);
    var data = null;
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
      var finalInfo = {
        name: title.trim(),
        price: price.trim(),
        marketCapital: markCap.trim(),
        circulatingSupply: circSupply.trim(),
      };
      if (title.trim().toLowerCase() === srchParam.trim().toLowerCase()) {
        data = JSON.stringify(finalInfo);
      }
    });
    if (data !== null) return res.status(200).send(data);
    else
      return res
        .status(404)
        .send(`Details about ${srchParam} are not available in our database.`);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});
