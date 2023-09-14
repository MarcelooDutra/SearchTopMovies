import { useState, useEffect } from "react";
import MovieCards from "../components/MovieCards";

import './MovieGird.css'

const urlMovies = import.meta.env.VITE_API;
const keyApi = import.meta.env.VITE_API_KEY;

const Home = () => {
  const [topMovies, setTopMovies] = useState([]);

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setTopMovies(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const movies = `${urlMovies}/top_rated?${keyApi}`;

    getMovies(movies);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>Carregando...</p>}
        {topMovies.length > 0 && topMovies.map((movie) => <MovieCards movie={movie} key={movie.id}/>)}
      </div>
    </div>
  );
};

export default Home;
