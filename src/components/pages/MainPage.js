import { useState } from "react";
import { Helmet } from "react-helmet";
import MovieList from "../movieList/MovieList";
import MovieInfo from "../movieInfo/MovieInfo";
import MovieSearchForm from "../movieSearchForm/movieSearchForm";
import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedMovie, setMovie] = useState(null);

    const onMovieSelected = (id) => {
        setMovie(id);
    }

    return (
      <>
        <Helmet>
            <meta
                name="description"
                content="MovieDB information portal"
            />
            <title>MovieDB information portal</title>
        </Helmet>
        <MovieSearchForm />
        <div className="movie__content">
            <MovieList onMovieSelected={onMovieSelected}/>
            <div style={{position: 'sticky', top: 25}}>
                <MovieInfo movieId={selectedMovie}/>
            </div>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
      </>
    )
}

export default MainPage;