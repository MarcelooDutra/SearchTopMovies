import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import MovieCards from "../components/MovieCards"
import './MovieGird.css'

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

const Search = () => {
  const [SearchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const query = SearchParams.get("q")

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const movies = `${searchURL}?${apiKey}&query=${query}`;

    getMovies(movies);
  }, [query]);
  
  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Carregando...</p>}
        {movies.length > 0 && movies.map((movie) => <MovieCards movie={movie} key={movie.id}/>)}
      </div>
    </div>
  )
}

export default Search