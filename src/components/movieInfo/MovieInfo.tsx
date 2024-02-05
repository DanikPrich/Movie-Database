import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import SkeletonInfo from '../skeleton/SkeletonInfo.tsx';
import { IMovie } from '../../types/movie';
import './movieInfo.scss';

interface IMovieInfoProps {
    movie: IMovie | null,
    star: boolean
}

function movieInfoPropsCompare(prevProps: IMovieInfoProps, nextProps: IMovieInfoProps) {
    return prevProps.movie?.id === nextProps.movie?.id
}

const MovieInfo = memo((props: IMovieInfoProps) => {
    return (
        <div className="movie__info">
            { props.movie ? <View {...props} /> : <SkeletonInfo/> }
        </div>
    )
}, movieInfoPropsCompare)

const View = ({movie, star}) => {
    const starOptions = { color: '#090907', fontSize: '30px' };
    const {title, year, poster, id} = movie

    return (
        <div className="movie__basics">
            <div className='movie__info-img'>
                <img src={poster} alt={title}  />
                { star ? <StarIcon sx={starOptions}/> : <StarBorderIcon sx={starOptions}/> }
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