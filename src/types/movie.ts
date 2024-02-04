export interface IMovieData {
  imdbID: string;
  Year: string;
  Type: string;
  Title: string;
  Poster: string;
  Plot?: string;
  Writer?: string;
  imdbRating?: string;
  imdbVotes?: string;
  Genre?: string;
  Country?: string;
  Actors?: string;
}

export interface IMovie {
  id: string,
  year: string,
  type: string,
  title: string,
  poster: string,
  plot?: string,
  writer?: string,
  imdbRating?: string,
  imdbVotes?: string,
  genre?: string,
  country?: string,
  actors?: string,
}

export type IMovieList = Array<IMovie>