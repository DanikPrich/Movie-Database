import { lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

const MainPage = lazy(() => import('../pages/MainPage'));


const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                    </Routes>
               </main>
            </div>
        </Router>
    )
}

export default App;