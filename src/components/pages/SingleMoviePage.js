import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AppBanner from "../appBanner/AppBanner";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovie, makeMovieFavourite, removeFromFavourites } from '../../store/moviesSlice';
import './singleMoviePage.scss';
import Spinner from '../spinner/Spinner';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const SingleMovieLayout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector(state => state.movies.movie)
  const favouritesMoviesIds = useSelector(state => state.movies.favourites)
  const movieLoadingStatus = useSelector(state => state.movies.movieLoadingStatus)

  const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    dispatch(fetchMovie(id))
    //eslint-disable-next-line
  }, [id])

  useEffect(() => {
    setIsFavourite(favouritesMoviesIds.includes(id))
    //eslint-disable-next-line
  }, [favouritesMoviesIds])

  const onStar = () => {
    if(!isFavourite) {
      dispatch(makeMovieFavourite(id))
    } else {
      dispatch(removeFromFavourites(id))
    }
  }

  return (
    <>
      {movieLoadingStatus === 'loading' ? <Spinner/> : <View data={movie} onStar={onStar} isFavourite={isFavourite}/> }
    </>
  )
}

const View = ({data, onStar, isFavourite}) => {
  const {title, poster, year, actors, country, genre, imdbRating, imdbVotes, plot, writer} = data;
  return (
    <>
      <Link to="/" className="single-movie__back">{'< Back to all'}</Link>

      <div className="single-movie">
        <Helmet>
            <meta
                name="description"
                content={`${title} info`}
            />
            <title>{title}</title>
        </Helmet>
        <img src={poster} alt={title} className="single-movie__img"/>
        <div className="single-movie__info">
          <h1 className="single-movie__name">{title}</h1>
          <p className="single-movie__descr">{plot}</p>
          <p className="single-movie__descr">IMDb RATING: {imdbRating}/10 ({imdbVotes})</p>
          <p className="single-movie__descr">Year: {year}</p>
          <p className="single-movie__descr">Actors: {actors}</p>
          <p className="single-movie__descr">Country: {country}</p>
          <p className="single-movie__descr">Genre: {genre}</p>
          <p className="single-movie__descr">Writer: {writer}</p>
        </div>
        <div className='single-movie__actions'>
          <button className='single-movie__actions-star' onClick={onStar}>
            {isFavourite ? <StarIcon sx={{ color: '#F5C518', fontSize: '50px' }}/> : <StarBorderIcon sx={{ color: '#F5C518', fontSize: '50px' }}/>}
          </button>
        </div>
      </div>
    </>
  )
}

export default SingleMovieLayout;