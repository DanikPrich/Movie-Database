import { render, screen, fireEvent } from "@testing-library/react";
import { renderTestApp } from "./helpers/renderTestApp.js";

describe('TEST ROUTER',() => {

  test('Main page routing', async () => {
    render(renderTestApp({
      route: '/',
      initialState: {}
    }))
    const moviesLink = screen.getByTestId('movies-link')

    fireEvent.click(moviesLink)
    expect(await screen.findByTestId('main-page')).toBeInTheDocument()
  });

  test('Favourites page routing', async () => {
    render(renderTestApp({
      route: '/',
      initialState: {}
    }))
    const mainPage = await screen.findByTestId('main-page')
    expect(mainPage).toBeInTheDocument()
    
    const favouritesLink = screen.getByTestId('favourites-link')

    fireEvent.click(favouritesLink)
    expect(await screen.findByTestId('favourites-page')).toBeInTheDocument()
  });
});