import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../spinner/Spinner';
import { fetchFavourites } from '../../store/favouriteSlice';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './favouritesPage.scss';

const FavouritesPage = () => {
    const dispatch = useDispatch();
    
    const favouriteList = useSelector(state => state.favourite.favouriteList)
    const favouriteLoadingStatus = useSelector(state => state.favourite.favouriteLoadingStatus)
    const favouriteIds = useSelector(state => state.favourite.favouriteIds)


    useEffect(() => {
        if(favouriteIds) dispatch(fetchFavourites(favouriteIds))
        //eslint-disable-next-line
    }, [favouriteIds])


    const renderItems = (movieList) => {
        const items = movieList.map((item) => {
            return (
                <Link to={`/movie/${item.id}`} key={item.id}>
                    <li className="favourite__item">
                        <img src={item.poster} alt={item.title}/>
                        <div className="favourite__name">{item.title}</div>
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

    const items = renderItems(favouriteList)

    if (!favouriteIds.length) {
        return (
            <div className="favourite__empty">
                <h1>Please add movie to favourites</h1>
            </div>
        )
    }

    if(favouriteLoadingStatus === 'loading') {
        return <Spinner/>
      } else if(favouriteLoadingStatus === 'error'){
        return <ErrorMessage/>
      }

    return (
        <div className="favourite__list">
            {items}
        </div>
    )

}

export default FavouritesPage;