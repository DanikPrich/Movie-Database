import {Link, NavLink} from 'react-router-dom'
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Movies</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                <li><NavLink 
                        end 
                        style={({isActive}) => ({color: isActive ? '#9F0013' : 'inherit'})}
                        to="/">
                            Movies
                    </NavLink></li>
                    /
                    <li><NavLink 
                        style={({isActive}) => ({color: isActive ? '#9F0013' : 'inherit'})}
                        to="/favourites">
                            Favourites
                    </NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;