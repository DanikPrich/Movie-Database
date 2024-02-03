import { useHttp } from "../hooks/http.hook";

const useMovieService = () => {
  const { request } = useHttp();

  const _apiBase = 'http://omdbapi.com/';
  const _apiKey = 'apikey=655cdc5c';
  const proxy = 'http://cors-anywhere.herokuapp.com/'

  const getMoviesByTitle = async ({title, page = 1}) => {
    const data = await request(`${proxy}${_apiBase}?${_apiKey}&s=${title}&page=${page}`, 'GET');
    return {
      data: data.Search.map(_transformMovie), 
      total: data.totalResults,
      page
    };
  }

  const getMovieById = async (id) => {
    const data = await request(`${proxy}${_apiBase}?${_apiKey}&i=${id}`, 'GET');
    return _transformMovie(data);
  }

  const _transformMovie = (movie) => {
    return {
      id: movie.imdbID,
      year: movie.Year,
      type: movie.Type,
      title: movie.Title,
      poster: movie.Poster,
      plot: movie?.Plot,
      writer: movie?.Writer,
      imdbRating: movie?.imdbRating,
      imdbVotes: movie?.imdbVotes,
      genre: movie?.Genre,
      country: movie?.Country,
      actors: movie?.Actors,
    }
  }

  return {
    getMoviesByTitle,
    getMovieById
  }
}

export default useMovieService;

