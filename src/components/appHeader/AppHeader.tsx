import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const AppHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
`;

const AppHeaderTitle = styled.h1`
  font-weight: bold;
  font-size: 28px;
  line-height: 37px;

  span {
    color: #9F0013;
  }
`;

const AppHeaderMenu = styled.nav`
  ul {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;

    li {
      margin: 0 8px;

      a:hover {
        color: #9F0013;
      }
    }
  }
`;

const AppHeader = () => {
  const headerStyle = (isActive: boolean) => ({ color: isActive ? '#9F0013' : 'inherit' });

  return (
    <AppHeaderContainer>
      <AppHeaderTitle>
        <Link to="/">
          <span>Movie Database</span> portal
        </Link>
      </AppHeaderTitle>
      <AppHeaderMenu>
        <ul>
          <li>
            <NavLink data-testid="movies-link" end style={({ isActive }) => headerStyle(isActive)} to="/">
              Movies
            </NavLink>
          </li>
          /
          <li>
            <NavLink data-testid="favourites-link" style={({ isActive }) => headerStyle(isActive)} to="/favourites">
              Favourites
            </NavLink>
          </li>
        </ul>
      </AppHeaderMenu>
    </AppHeaderContainer>
  );
};

export default AppHeader;
