import { RootState } from '../../store/index.ts';
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import MovieList from "../movieList/MovieList.tsx";
import MovieInfo from "../movieInfo/MovieInfo.tsx";
import MovieSearchForm from "../movieSearchForm/movieSearchForm.tsx";
import { useSelector } from 'react-redux';
import { IMovie } from '../../types/movie.ts';

const MainPage = () => {
    const favouriteIds = useSelector((state: RootState) => state.favourite.favouriteIds)

    const [selectedMovie, setMovie] = useState<IMovie | null>(null);
    const [isFavourite, setIsFavourite] = useState<boolean>(false);

    const onMovieSelected = (movie: IMovie | null) => {
        setMovie(movie);
        if(movie) setIsFavourite(favouriteIds.includes(movie.id))
    }

    return (
      <>
        <Helmet>
            <meta
                name="description"
                content="MovieDB information portal"
            />
            <title>Movie Database</title>
        </Helmet>
        <MovieSearchForm />
        <div className="movie__content">
            <MovieList onMovieSelected={onMovieSelected}/>
            <div style={{position: 'sticky', top: 25}}>
                <MovieInfo movie={selectedMovie} star={isFavourite}/>
            </div>
        </div>
      </>
    )
}

export default MainPage;