import { useHttp } from "../hooks/http.hook.ts";
import { IMovie, IMovieData } from "../types/movie";

export interface IQueryMovieList {
  title: string,
  page: number
}

const useMovieService = () => {
  const { request } = useHttp();

  const _apiBase = 'http://omdbapi.com/';
  const _apiKey = 'apikey=655cdc5c';
  const proxy = 'http://cors-anywhere.herokuapp.com/' 

  const getMoviesByTitle = async ({title, page = 1}: IQueryMovieList) => {
    const data = await request(`${proxy}${_apiBase}?${_apiKey}&s=${title}&page=${page}`, 'GET');
    return {
      data: data.Search.map(_transformMovie), 
      total: +data.totalResults,
      page
    };
  }

  const getMovieById = async (id: string) => {
    const data = await request(`${proxy}${_apiBase}?${_apiKey}&i=${id}`, 'GET');
    if(data?.Error) return Promise.reject(data.Error);
    else return _transformMovie(data);
  }

  const getFavouritesByIds = async (ids: Array<string>) => {
    try {
      const requests = ids.map(async (id) => {
        const movie = await request(`${proxy}${_apiBase}?${_apiKey}&i=${id}`, 'GET');
        return _transformMovie(movie);
      });
  
      const data = await Promise.all(requests);
      return { data };
    } catch (error) {
      throw error;
    }
  };

  const _transformMovie = (movie: IMovieData): IMovie => {
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
    getMovieById,
    getFavouritesByIds
  }
}

export default useMovieService;

