import { useState } from "react";
import { Helmet } from "react-helmet";
import MovieList from "../movieList/MovieList";
import MovieInfo from "../movieInfo/MovieInfo";
import MovieSearchForm from "../movieSearchForm/movieSearchForm";
import { useSelector } from 'react-redux';

const MainPage = () => {
    const favouriteIds = useSelector(state => state.favourite.favouriteIds)

    const [selectedMovie, setMovie] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false);

    const onMovieSelected = (movie) => {
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