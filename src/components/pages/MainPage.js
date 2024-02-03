import { useState } from "react";
import { Helmet } from "react-helmet";
import MovieList from "../movieList/MovieList";
import MovieInfo from "../movieInfo/MovieInfo";
import MovieSearchForm from "../movieSearchForm/movieSearchForm";

const MainPage = () => {

    const [selectedMovie, setMovie] = useState(null);
    const [starComponent, setStarComponent] = useState(null);

    const onMovieSelected = ({id, starComponent}) => {
        setMovie(id);
        setStarComponent(starComponent);
        console.log(starComponent)
    }

    return (
      <>
        <Helmet>
            <meta
                name="description"
                content="MovieDB information portal"
            />
            <title>Movie Database portal</title>
        </Helmet>
        <MovieSearchForm />
        <div className="movie__content">
            <MovieList onMovieSelected={onMovieSelected}/>
            <div style={{position: 'sticky', top: 25}}>
                <MovieInfo movieId={selectedMovie} star={starComponent}/>
            </div>
        </div>
      </>
    )
}

export default MainPage;