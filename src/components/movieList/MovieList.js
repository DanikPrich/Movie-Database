import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition, TransitionGroup } from 'react-transition-group';

import { fetchMovies } from '../../store/moviesSlice';
import ErrorMessage from '../errorMessage/ErrorMessage';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import './movieList.scss';

const MovieList = (props) => {
    const moviesList = useSelector(state => state.movies.movies)
    const moviesTotal = useSelector(state => state.movies.total)
    const moviesLoadingStatus = useSelector(state => state.movies.moviesLoadingStatus);
    const activeQueryValue = useSelector(state => state.movies.activeQueryValue);
    const page = useSelector(state => state.movies.page);
    const favouritesMoviesIds = useSelector(state => state.movies.favouritesIds)

    const dispatch = useDispatch();
    
    const onRequest = () => {
        const query = {
            title: activeQueryValue,
            page: page + 1,
        }
        dispatch(fetchMovies(query))
    }
    
    const movieRefs = useRef([])
    const focusOnItem = (i) => {
        movieRefs.current.forEach(item => item.classList.remove('movie__item_selected'))
        movieRefs.current[i].classList.add('movie__item_selected')
        movieRefs.current[i].focus(); 
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

    const renderItems = (movieList) => {
        const items = movieList.map((item,i) => {
            const star = favouritesMoviesIds.includes(item.id) ? <StarIcon sx={{ color: '#F5C518', fontSize: '30px' }}/> : <StarBorderIcon sx={{ color: '#F5C518', fontSize: '30px' }}/>
            const imgStyle = {'objectFit' : 'cover'}

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
                            ref={el => movieRefs.current[i] = el}
                            onClick={() => {
                                props.onMovieSelected({id: item.id, starComponent: star});
                                focusOnItem(i)
                            }}
                            onKeyDown={(e) => {
                                if(e.key === "Enter" || e.key === 'e') {
                                    props.onMovieSelected(item.id); 
                                    focusOnItem(i);
                                }
                            }}
                            tabIndex={0}
                            >
                                {star}
                                <img src={item.poster} alt={item.title} style={imgStyle}/>
                                <div className="movie__name">{item.title}</div>
                            </li>
                    )}}
                </Transition>
            )
        })
        return (
            <ul className="movie__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(moviesList)

    if (moviesLoadingStatus === "error") {
        return (
            <ErrorMessage/>
        )
    }

    return (
        <div className="movie__list">
            {items}
            <button 
            className="button button__main button__long"
            disabled={moviesLoadingStatus === "loading" || moviesList.length === moviesTotal}
            style={{'display' : !moviesList.length ? 'none' : 'block'}}
            onClick={() => onRequest()}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default MovieList;