# Movie data base application
Movie App is an application for searching movies, created with React. It consists of three pages: **Movie Search, Movie Detail and My Favorite Movies**.

## Movie Search

Search input field on the top of the page. When the user submits the search, all search results are displaying under the search input field.

User can enter the title of the movie in the search field and press the search button. After that, all the search results are displayed using the OMDb API on the page under the search panel. User can view the search results using infinite scrolling. If the user goes to another page and returns back, the last search and results will be saved.

## Movie Detail

On this page, the user can see all the details of the selected movie (poster, title, plot, IMDB rating, year, etc.). The user can clicks on the star icon to add the movie to favourites.

## My Favorite Movies

On this page, the user can view the list of their favorite movies and go to the movie details.

## Technologies
- OMDb API to get all the necessary data,
- Typescript,
- React-router for page navigation,
- Redux and Redux-toolkit for store management,
- Handle side effects and asynchronous calls using Redux-thunk,
- Save the user's favorite movies on the client side.
- Styled components and SASS for styling,
- Lazy component rendering
- Added demo proxy server to fix CORS errors
