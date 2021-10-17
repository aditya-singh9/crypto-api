const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.status(200).send("API is running!");
});

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});
