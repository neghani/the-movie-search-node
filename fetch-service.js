const fetch = require("node-fetch");

https: module.exports = {
  fetchMovies: async function (movieName, page) {
    try {
      console.log(process.env.API_KEY);
      const url = `${process.env.THE_TMDB_URL}?api_key=${process.env.API_KEY}&query=${movieName}&page=${page}`;
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };

      const response = await fetch(url, options);
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Could not talk to data provider.");
    }
  },
};
