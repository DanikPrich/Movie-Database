import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition, TransitionGroup } from 'react-transition-group';

import { fetchMovieList, setActiveCard } from '../../store/movieSlice';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MovieSkeleton from '../movieSkeleton/MovieSkeleton';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import './movieList.scss';

const MovieList = (props) => {
    const movieList = useSelector(state => state.movie.movieList)
    const movieTotal = useSelector(state => state.movie.total)
    const movieListLoadingStatus = useSelector(state => state.movie.movieListLoadingStatus);
    const activeSearchValue = useSelector(state => state.movie.activeSearchValue);
    const page = useSelector(state => state.movie.page);
    const activeMovieCard = useSelector(state => state.movie.activeMovieCard)
    const favouriteIds = useSelector(state => state.favourite.favouriteIds)

    const dispatch = useDispatch();
    
    useEffect(() => {
        props.onMovieSelected(activeMovieCard);
        //eslint-disable-next-line
    }, []) 

    const onRequest = () => {
        const query = {
            title: activeSearchValue,
            page: page + 1,
        }
        dispatch(fetchMovieList(query))
    }
    

    const selectMovie = (movie) => {
        dispatch(setActiveCard(movie))
        props.onMovieSelected(movie);
    }

    const duration = 200;
    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
        visibility: 'hidden'
    }
    const transitionStyles = {
        entering: { opacity: 0, visibility: 'hidden' },
        entered: { opacity: 1, visibility: 'visible' },
        exiting: { opacity: 1, visibility: 'visible' },
        exited: { opacity: 0, visibility: 'hidden' },
    }

    const renderItems = (list) => {
        const items = list.map((item,i) => {
            const starOptions = { color: '#F5C518', fontSize: '30px' };
            const isFavourite = favouriteIds.includes(item.id) 

            return (
                <Transition 
                    timeout={duration} 
                    key={item.id}
                >
                    {(state) => {
                        return (
                            <li className="movie__item" 
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                            onClick={() => {
                                selectMovie(item);
                            }}
                            onKeyDown={(e) => {
                                if(e.key === "Enter" || e.key === 'e') {
                                    selectMovie(item);
                                }
                            }}
                            tabIndex={0}
                            >
                                {isFavourite ? <StarIcon sx={starOptions}/> : <StarBorderIcon sx={starOptions}/>}
                                <img src={item.poster} alt={item.title} />
                                <div className="movie__name">{item.title}</div>
                            </li>
                    )}}
                </Transition>
            )
        })

        if (items.length === 0) {
            return (
                <ul className="movie__grid">
                    {Array.from({ length: 6 }).map((item, i) => (
                        <MovieSkeleton key={i} />
                    ))}
                </ul>
            )
        }

        return (
            <ul className="movie__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const renderButton = (loadingStatus, movieList, movieTotal) => {
        const isDisabled = loadingStatus === "loading"
        const style = {'display' : movieList.length === movieTotal ? 'none' : 'block'}

        return (
            <button 
                className="button button__main button__long"
                disabled={isDisabled}
                style={style}
                onClick={() => onRequest()}
            >
                <div className="inner">load more</div>
            </button>
        )
    }

    const items = renderItems(movieList)
    const button = renderButton(movieListLoadingStatus, movieList, movieTotal)

    return (
        <div className="movie__list">
            {movieListLoadingStatus === "error" ? <ErrorMessage/> : items}
            {button}
        </div>
    )
}

export default MovieList;