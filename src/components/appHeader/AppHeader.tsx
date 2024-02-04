import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import './appHeader.scss';

const AppHeader = () => {
    const headerStyle = (isActive: boolean) => ({color: isActive ? '#9F0013' : 'inherit'})
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Movie Database</span> portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink 
                            end 
                            style={({isActive}) => headerStyle(isActive)}
                            to="/">
                                Movies
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink 
                            style={({isActive}) => headerStyle(isActive)}
                            to="/favourites">
                                Favourites
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;