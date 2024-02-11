import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition, TransitionGroup } from 'react-transition-group';
import { fetchMovieList, setActiveCard } from '../../store/movieSlice.ts';
import { AppDispatch, RootState } from '../../store/index.ts';
import ErrorMessage from '../errorMessage/ErrorMessage.tsx';
import MovieSkeleton from '../skeleton/MovieSkeleton.tsx';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import './movieList.scss';
import { IMovie, IMovieList } from '../../types/movie.ts';
import { IQueryMovieList } from '../../api/movies.ts';

interface IMovieListProps {
    onMovieSelected: (value: IMovie | null) => void;
}

const MovieList = ({onMovieSelected}: IMovieListProps) => {
    const movieList = useSelector((state: RootState) => state.movie.movieList)
    const movieTotal = useSelector((state: RootState) => state.movie.total)
    const movieListLoadingStatus = useSelector((state: RootState) => state.movie.movieListLoadingStatus);
    const activeSearchValue = useSelector((state: RootState) => state.movie.activeSearchValue);
    const page = useSelector((state: RootState) => state.movie.page);
    const activeMovieCard = useSelector((state: RootState) => state.movie.activeMovieCard)
    const favouriteIds = useSelector((state: RootState) => state.favourite.favouriteIds)

    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        onMovieSelected(activeMovieCard);
        //eslint-disable-next-line
    }, []) 

    const onRequest = () => {
        const query: IQueryMovieList = {
            title: activeSearchValue,
            page: page + 1,
        }
        dispatch(fetchMovieList(query))
    }
    

    const selectMovie = (movie: IMovie) => {
        dispatch(setActiveCard(movie))
        onMovieSelected(movie);
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

    const renderItems = (list: IMovieList) => {
        const items = list.map(item => {
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

    const renderButton = (loadingStatus: string, movieList: IMovieList, movieTotal: number) => {
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

    const items = useMemo(() => renderItems(movieList), [movieList])
    const button = useMemo(() => renderButton(movieListLoadingStatus, movieList, movieTotal), [movieListLoadingStatus, movieList, movieTotal])

    return (
        <div className="movie__list">
            {movieListLoadingStatus === "error" ? <ErrorMessage/> : items}
            {button}
        </div>
    )
}

export default MovieList;