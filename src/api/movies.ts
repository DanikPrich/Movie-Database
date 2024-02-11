import axios from "axios";
import { useHttp } from "../hooks/http.hook";
import { IMovie, IMovieData } from "../types/movie";

export interface IQueryMovieList {
  title: string,
  page: number
}

const _apiBase = 'https://www.omdbapi.com/';
const _apiKey = 'apikey=655cdc5c';

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

export const apiMovies = {

  async getMoviesByTitle({title, page = 1}: IQueryMovieList) {
    const { data } = await axios.get(`${_apiBase}?${_apiKey}&s=${title}&page=${page}`);
    return {
      data: data.Search.map(_transformMovie), 
      total: +data.totalResults,
      page
    };
  },

  async getMovieById(id: string) {
    const { data } = await axios.get(`${_apiBase}?${_apiKey}&i=${id}`);
    if(data?.Error) return Promise.reject(data.Error);
    else return _transformMovie(data);
  },

  async getFavouritesByIds(ids: Array<string>){
    try {
      const requests = ids.map(async (id) => {
        const { data } = await axios.get(`${_apiBase}?${_apiKey}&i=${id}`);
        return _transformMovie(data);
      });
  
      const data = await Promise.all(requests);
      return { data };
    } catch (error) {
      throw error;
    }
  }
}