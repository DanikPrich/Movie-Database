import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/index.tsx";
import Spinner from "../spinner/Spinner.tsx";
import { fetchFavourites } from "../../store/favouriteSlice.ts";
import ErrorMessage from "../errorMessage/ErrorMessage.tsx";

import "./favouritesPage.scss";
import { IMovie, IMovieList } from "../../types/movie.ts";

const FavouritesPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const favouriteList = useSelector(
    (state: RootState) => state.favourite.favouriteList
  );
  const favouriteLoadingStatus = useSelector(
    (state: RootState) => state.favourite.favouriteLoadingStatus
  );
  const favouriteIds = useSelector(
    (state: RootState) => state.favourite.favouriteIds
  );

  useEffect(() => {
    if (favouriteIds) dispatch(fetchFavourites(favouriteIds));
    //eslint-disable-next-line
  }, [favouriteIds]);

  const renderItems = (movieList: IMovieList) => {
    const items = movieList.map(({ id, title, poster }: IMovie) => {
      return (
        <Link to={`/movie/${id}`} key={id}>
          <li className="favourite__item">
            <img src={poster} alt={title} />
            <div className="favourite__name">{title}</div>
          </li>
        </Link>
      );
    });
    return <ul className="favourite__grid">{items}</ul>;
  };

  const items = renderItems(favouriteList);

  const pageStatus = (loadingStatus: 'idle' | 'loading' | 'error') => {
    if (loadingStatus === "loading") {
      return <Spinner />;
    } else if (loadingStatus === "error") {
      return <ErrorMessage />;
    }
  }
  
  return (
    <div data-testid="favourites-page">
      {
        favouriteLoadingStatus === 'idle' 
          ? <View favoutiresIds={favouriteIds} items={items} />
          : pageStatus(favouriteLoadingStatus) 
      }
    </div>
  );
};

const View = ({ favoutiresIds, items }) => {

  const favouritesList = (
    <div className="favourite__list">
      {items}
    </div>
  )

  const favouritesEmpty = (
    <div className="favourite__empty">
      <h1>Please add movie to favourites</h1>
    </div>
  )

  return favoutiresIds.length ? favouritesList : favouritesEmpty
}

export default FavouritesPage;
