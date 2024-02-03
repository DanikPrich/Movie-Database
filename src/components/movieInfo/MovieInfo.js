import { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import Skeleton from '../skeleton/Skeleton';
import { Link } from 'react-router-dom';

import './movieInfo.scss';

const MovieInfo = (props) => {
    
    const [movie, setMovie] = useState(null);
    const movies = useSelector(state => state.movies.movies);

    useEffect(() => {
        updateMovie();
        //eslint-disable-next-line
    }, [props.movieId])

    const updateMovie = () => {
        const {movieId} = props;
        if(!movieId) return;
        setMovie(movies.filter(movie => props.movieId === movie.id)[0])
    }
    
    return (
        <div className="movie__info">
            {movie ? <View data={movie} star={props.star}/> : <Skeleton/>}
        </div>
    )
}

const View = ({data, star}) => {
    
    const {title, year, poster, id} = data
    return (
        <div className="movie__basics">
            <div className='movie__info-img'>
                <img src={poster} alt={title}  />
                {star}
            </div>
            <div className="movie__info-wrapper">
                <div>
                    <div className="movie__info-name">{title}</div>
                    <div className="movie__descr">Year: {year}</div>
                </div>
                <div className="movie__btns">
                    <Link to={`/movie/${id}`} className="button button__main">
                        <div className="inner">Movie page</div>
                    </Link>
                </div>
            </div>
        </div>
    )
} 

export default MovieInfo;