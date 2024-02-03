import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../spinner/Spinner';
import { fetchFavourites } from '../../store/moviesSlice';

import './favouritesPage.scss';

const FavouritesPage = () => {
    const dispatch = useDispatch();
    
    const favouritesList = useSelector(state => state.movies.favouritesList)
    const favouritesLoadingStatus = useSelector(state => state.movies.favouritesLoadingStatus)
    const favouritesIds = useSelector(state => state.movies.favouritesIds)


    useEffect(() => {
        if(favouritesIds) dispatch(fetchFavourites(favouritesIds))
        //eslint-disable-next-line
    }, [favouritesIds])


    const renderItems = (movieList) => {
        const items = movieList.map((item) => {
            const imgStyle = {'objectFit' : 'cover'}

            return (
                <Link to={`/movie/${item.id}`} key={item.id}>
                    <li className="favourite__item">
                        <img src={item.poster} alt={item.title} style={imgStyle}/>
                        <div className="movie__name">{item.title}</div>
                    </li>
                </Link>
            )
        })
        return (
            <ul className="favourite__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(favouritesList)

    if (!favouritesList.length) {
        return (
            <div className="favourite__empty">
                <h1>Please add movie to favourites</h1>
            </div>
        )
    }

    return (
        <div className="favourite__list">
            {favouritesLoadingStatus === 'loading' ? <Spinner/> : items }
        </div>
    )

}

export default FavouritesPage;