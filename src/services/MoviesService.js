import { useHttp } from "../hooks/http.hook";

const useMovieService = () => {
  const { request } = useHttp();

  const _apiBase = 'http://omdbapi.com/';
  const _apiKey = 'apikey=655cdc5c';
  const proxy = 'http://cors-anywhere.herokuapp.com/'

  const getMoviesByTitle = async ({title, page = 1}) => {
    const data = await request(`${proxy}${_apiBase}?${_apiKey}&s=${title}&page=${page}`);
    return {
      data: data.Search.map(_transformMovie), 
      total: data.totalResults,
      page
    };
  }

  const _transformMovie = (movie) => {
    return {
      id: movie.imdbID,
      year: movie.Year,
      type: movie.Type,
      title: movie.Title,
      poster: movie.Poster
    }
  }

  return {
    getMoviesByTitle,
  }
}

export default useMovieService;

