import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import useMovieService from '../services/MoviesService.ts';
import { IMovie, IMovieList } from "../types/movie";
import { IQueryMovieList } from '../services/MoviesService.ts'

interface IMovieState {
  movieList: IMovieList,
  movie: IMovie | null,
  movieListLoadingStatus: string,
  movieLoadingStatus: string,
  activeSearchValue: string,
  activeMovieCard: IMovie | null,
  total: number,
  page: number,
}

const initialState: IMovieState = {
  movieList: [],
  movie: null,
  activeMovieCard: null,
  activeSearchValue: '',
  movieListLoadingStatus: 'idle',
  movieLoadingStatus: 'idle',
  total: 0,
  page: 0,
}

export const fetchMovieList = createAsyncThunk(
  'movie/fetchMovieList',
  async (query: IQueryMovieList) => {
    const { getMoviesByTitle } = useMovieService();
    const { data, total, page } = await getMoviesByTitle(query);

    return {
      data,
      total,
      title: query.title,
      page,
    };
  }
);

export const fetchMovie = createAsyncThunk(
  'movie/fetchMovie', 
  async (id: string) => { 
    const { getMovieById } = useMovieService();
    const data = await getMovieById(id);
    return { data };
  }
)

const movieSlice  = createSlice({
  name: 'movie',
  initialState,
  reducers: { 
    setActiveCard: (state, action: PayloadAction<IMovie | null>) => {
      state.activeMovieCard = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieList.pending, state => {state.movieListLoadingStatus = 'loading'}) 
    builder.addCase(fetchMovieList.fulfilled, (state, action) => { 
      state.movieListLoadingStatus = 'idle'
      if(action.payload.page === 1) state.movieList = action.payload.data
      else state.movieList.push(...action.payload.data)
      state.total = action.payload.total;
      state.activeSearchValue = action.payload.title;
      state.page = action.payload.page
    })
    builder.addCase(fetchMovieList.rejected, state => {state.movieListLoadingStatus = 'error'})

    builder.addCase(fetchMovie.pending, state => {state.movieLoadingStatus = 'loading'}) 
    builder.addCase(fetchMovie.fulfilled, (state, action) => { 
      state.movieLoadingStatus = 'idle'
      state.movie = action.payload.data
    })
    builder.addCase(fetchMovie.rejected, state => {state.movieLoadingStatus = 'error'})
    builder.addDefaultCase(() => {})
  }
});

const { actions, reducer } = movieSlice

export default reducer 
export const {
  setActiveCard
} = actions
