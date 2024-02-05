import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from '../spinner/Spinner.tsx';
import AppHeader from "../appHeader/AppHeader.tsx";

const Page404 = lazy(() => import('../pages/404.tsx'));
const MainPage = lazy(() => import('../pages/MainPage.tsx'));
const FavouritesPage = lazy(() => import('../pages/FavouritesPage.tsx'));
const SingleMoviePage = lazy(() => import('../pages/SingleMoviePage.tsx'));

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/movie/:id" element={<SingleMoviePage/>}/>
                            <Route path="/favourites/" element={<FavouritesPage/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
               </main>
            </div>
        </Router>
    )
}

export default App;