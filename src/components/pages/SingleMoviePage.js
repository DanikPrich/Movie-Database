import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMovie } from '../../store/movieSlice';
import { makeFavourite, removeFavourite } from '../../store/favouriteSlice';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import './singleMoviePage.scss';

const SingleMovieLayout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector(state => state.movie.movie)
  const favouriteIds = useSelector(state => state.favourite.favouriteIds)
  const movieLoadingStatus = useSelector(state => state.movie.movieLoadingStatus)

  const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    dispatch(fetchMovie(id))
    //eslint-disable-next-line
  }, [id])

  useEffect(() => {
    setIsFavourite(favouriteIds.includes(id))
    //eslint-disable-next-line
  }, [favouriteIds])

  const onStar = () => {
    if(!isFavourite) {
      dispatch(makeFavourite(id))
    } else {
      dispatch(removeFavourite(id))
    }
  }

  if(movieLoadingStatus === 'loading') {
    return <Spinner/>
  } else if(movieLoadingStatus === 'error'){
    return <ErrorMessage/>
  }

  return <View data={movie} onStar={onStar} isFavourite={isFavourite}/> 
}

const View = ({data, onStar, isFavourite}) => {
  const {title, poster, year, actors, country, genre, imdbRating, imdbVotes, plot, writer} = data;
  const starOptions = { color: '#F5C518', fontSize: '30px' };
  return (
    <>
      <Link to="/" className="single-movie__back">&#60; Back to all</Link>

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
          <p className="single-movie__text">{plot}</p>
          <p className="single-movie__text"><span>IMDb RATING:</span> {imdbRating}/10 ({imdbVotes})</p>
          <p className="single-movie__text"><span>Year:</span> {year}</p>
          <p className="single-movie__text"><span>Actors:</span> {actors}</p>
          <p className="single-movie__text"><span>Country:</span> {country}</p>
          <p className="single-movie__text"><span>Genre:</span> {genre}</p>
          <p className="single-movie__text"><span>Writer:</span> {writer}</p>
        </div>
        <div className='single-movie__actions'>
          <button className='single-movie__actions-star' onClick={onStar}>
            {isFavourite ? <StarIcon sx={starOptions}/> : <StarBorderIcon sx={starOptions}/>}
          </button>
        </div>
      </div>
    </>
  )
}

export default SingleMovieLayout;