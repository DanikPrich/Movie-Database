import './movieSkeleton.scss';

const MovieSkeleton = () => {
    return (
        <li className="skeleton-movie">
            <div className="pulse skeleton-movie__header"></div>
            <div className="pulse skeleton-movie__mini"></div>
            <div className="pulse skeleton-movie__mini"></div>
            <div className="pulse skeleton-movie__mini"></div>
        </li>
    )
}

export default MovieSkeleton;