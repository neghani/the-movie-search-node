const express = require("express");
require("dotenv").config();
const cors = require("cors");
const fetchService = require("./fetch-service");
const app = express();
const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;
app.use(cors("http://localhost:3001/"));

app.get("/find-movie", async (req, res) => {
  try {
    let query;
    let page = req.query.page ? req.query.page : 1;
    if (req.query.query == undefined) {
      throw new Error("No query found for the search.");
    }

    if (API_KEY == undefined) {
      throw new Error("<Local>: You must be granted a valid key.");
    }
    query = req.query.query;
    const response = await fetchService.fetchMovies(query, page);
    if (response.success == false) {
      throw new Error(response.status_message);
    }
    res.send(response);
  } catch (error) {
    res.statusCode = 422;
    res.send({ error: error.message, success: false });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
