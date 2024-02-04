import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useMovieService from '../services/MoviesService';

const initialState = {
  movies: [],
  movie: {},
  moviesLoadingStatus: 'idle',
  movieLoadingStatus: 'idle',
  favouritesLoadingStatus: 'idle',
  activeQueryValue: '',
  activeMovieCard: null,
  favouritesIds: JSON.parse(localStorage.getItem('favourites')) || [],
  favouritesList: [],
  total: 0,
  page: 0,
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies', 
  async (query, thunkApi) => { 
    const { getMoviesByTitle } = useMovieService();
    const {data, total, page} = await getMoviesByTitle(query)
    
    return {
      data, 
      total, 
      title: query.title,
      page,
    }
  }
)

export const fetchMovie = createAsyncThunk(
  'movies/fetchMovie', 
  async (id, thunkApi) => { 
    const { getMovieById } = useMovieService();
    const data = await getMovieById(id);
    return { data };
  }
)

export const fetchFavourites = createAsyncThunk(
  'movies/fetchFavourites', 
  async (favouritesIds, thunkApi) => { 
    const { getFavouritesByIds } = useMovieService();
    const { data } = await getFavouritesByIds(favouritesIds);
    return { data };
  }
)

const moviesSlice  = createSlice({
  name: 'movies',
  initialState,
  reducers: { 
    makeMovieFavourite: (state, action) => {
      state.favouritesIds.push(action.payload)
      localStorage.setItem('favourites', JSON.stringify(state.favouritesIds));
    },
    removeFromFavourites: (state, action) => {
      state.favouritesIds = state.favouritesIds.filter(id => id !== action.payload)
      localStorage.setItem('favourites', JSON.stringify(state.favouritesIds));
    },
    setActiveCard: (state, action) => {
      state.activeMovieCard = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, state => {state.moviesLoadingStatus = 'loading'}) 
    builder.addCase(fetchMovies.fulfilled, (state, action) => { 
      state.moviesLoadingStatus = 'idle'
      if(action.payload.page === 1) state.movies = action.payload.data
      else state.movies.push(...action.payload.data)
      state.total = action.payload.total;
      state.activeQueryValue = action.payload.title;
      state.page = action.payload.page
    })
    builder.addCase(fetchMovies.rejected, state => {state.moviesLoadingStatus = 'error'})

    builder.addCase(fetchMovie.pending, state => {state.movieLoadingStatus = 'loading'}) 
    builder.addCase(fetchMovie.fulfilled, (state, action) => { 
      state.movieLoadingStatus = 'idle'
      state.movie = action.payload.data
    })
    builder.addCase(fetchMovie.rejected, state => {state.movieLoadingStatus = 'error'})

    builder.addCase(fetchFavourites.pending, state => {state.favouritesLoadingStatus = 'loading'}) 
    builder.addCase(fetchFavourites.fulfilled, (state, action) => { 
      state.favouritesLoadingStatus = 'idle'
      state.favouritesList = action.payload.data  
    })
    builder.addCase(fetchFavourites.rejected, state => {state.favouritesLoadingStatus = 'error'})
    builder.addDefaultCase(() => {})
  }
});

const { actions, reducer } = moviesSlice

export default reducer 
export const {
  makeMovieFavourite,
  removeFromFavourites,
  setActiveCard
} = actions
