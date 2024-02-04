import Skeleton from '../skeleton/Skeleton';
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import './movieInfo.scss';

const MovieInfo = ({movie, star}) => {
    return (
        <div className="movie__info">
            {movie ? <View data={movie} star={star}/> : <Skeleton/>}
        </div>
    )
}

const View = ({data, star}) => {
    const starOptions = { color: '#F5C518', fontSize: '30px' };
    const {title, year, poster, id} = data

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