import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill} from 'react-icons/bs'
import MovieCards from '../components/MovieCards'
import './Movie.css'

const urlMovies = import.meta.env.VITE_API;
const keyApi = import.meta.env.VITE_API_KEY;

const Movie = () => {
  const {id} = useParams()
  const[movies, setMovies] = useState(null)

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
    const formatCurrency = (number) => {
      return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    }

    useEffect(() => {
      const movieUrl = `${urlMovies}${id}?${keyApi}`
      getMovies(movieUrl)
    }, [id])
  return (
    <div className='movie-page'>{movies && <>
      <MovieCards movie={movies} showLink={false} />
      <p className='tagline'>{movies.tagline}</p>
      <div className='info'>
        <h3>
          <BsWallet2 /> Orçamento:
        </h3>
        <p>{formatCurrency(movies.budget)}</p>
      </div>
      <div className='info'>
        <h3>
          <BsGraphUp /> Receita:
        </h3>
        <p>{formatCurrency(movies.revenue)}</p>
      </div>
      <div className='info'>
        <h3>
          <BsHourglassSplit /> Duração:
        </h3>
        <p>{movies.runtime} minutos</p>
      </div>
      <div className='info description'>
        <h3>
          <BsFillFileEarmarkTextFill /> Descrição:
        </h3>
        <p>{movies.overview}</p>
      </div>
      </>}
    </div>
  )
}

export default Movie