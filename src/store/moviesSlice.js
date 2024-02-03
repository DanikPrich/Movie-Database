import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useMovieService from '../services/MoviesService';

const initialState = {
  movies: [],
  movie: {},
  moviesLoadingStatus: 'idle',
  movieLoadingStatus: 'idle',
  total: null,
  page: 0,
  activeQueryValue: '',
  favourites: []
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

const moviesSlice  = createSlice({
  name: 'movies',
  initialState,
  reducers: { 
    moviesFetching: state => {
      state.moviesLoadingStatus = 'loading'
    },
    moviesFetchingPayload: {
      reducer: (state, action) => state.movies.push(action.payload), 
      prepare: (data) => { 
        const transfomeredMovies = data.Search.map((movie) => ({
          id: movie.imdbID,
          year: movie.Year,
          type: movie.Type,
          title: movie.Title,
          poster: movie.Poster
        }))
        return { payload: transfomeredMovies}
      },
    },
    moviesFetched: (state, action) => { 
      state.moviesLoadingStatus = 'idle'
      state.movies = action.payload; 
    },
    moviesFetchingError: (state, action) => { 
      state.moviesLoadingStatus = 'error' 
    },
    makeMovieFavourite: (state, action) => {
      state.favourites.push(action.payload)
    },
    removeFromFavourites: (state, action) => {
      state.favourites = state.favourites.filter(id => id !== action.payload)
    }
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
    builder.addDefaultCase(() => {})
  }
});

const { actions, reducer } = moviesSlice

export default reducer 
export const {
  moviesFetching,
  moviesFetched,
  moviesFetchingError,
  makeMovieFavourite,
  removeFromFavourites
} = actions
