import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Spinner from '../spinner/Spinner';
import AppHeader from "../appHeader/AppHeader";

const MainPage = lazy(() => import('../pages/MainPage'));
const SingleMoviePage = lazy(() => import('../pages/SingleMoviePage'));


const App = () => {

    return (
        <Router>

            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/movie/:id" element={<SingleMoviePage/>}/>
                        </Routes>
                    </Suspense>
               </main>
            </div>
        </Router>
    )
}

export default App;