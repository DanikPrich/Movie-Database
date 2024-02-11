import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Spinner from "../spinner/Spinner.tsx";

const Page404 = lazy(() => import("../pages/404.tsx"));
const MainPage = lazy(() => import("../pages/MainPage.tsx"));
const SingleMoviePage = lazy(() => import("../pages/SingleMoviePage.tsx"));
const FavouritesPage = lazy(() => import("../pages/FavouritesPage.tsx"));

const AppRouter = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie/:id" element={<SingleMoviePage />} />
        <Route path="/favourites/" element={<FavouritesPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  )
}

export default AppRouter;