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
  fetchMoviesDetails: async function (movieId) {
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`;
    const fullInfoUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&api_key=${process.env.API_KEY}`;
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    const allDetails = await Promise.all([
      await fetch(creditsUrl, options),
      await fetch(fullInfoUrl, options),
    ]);

    const cast_crew = await allDetails[0].json();
    const movieInfo = await allDetails[1].json();

    return { ...movieInfo, ...cast_crew };
  },
};
