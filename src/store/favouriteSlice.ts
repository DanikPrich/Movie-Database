import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import useMovieService from '../services/MoviesService.ts';
import { IMovieList } from "../types/movie";

interface IFavouriteState {
  favouriteList: IMovieList,
  favouriteLoadingStatus: string,
  favouriteIds: Array<string>,
}

const initialState: IFavouriteState = {
  favouriteList: [],
  favouriteLoadingStatus: 'idle',
  favouriteIds: JSON.parse(localStorage.getItem('favourites') as string) || [],
}

export const fetchFavourites = createAsyncThunk(
  'favourite/fetchFavourites', 
  async (favouriteIds: Array<string>, thunkApi) => { 
    const { getFavouritesByIds } = useMovieService();
    const { data } = await getFavouritesByIds(favouriteIds);
    return { data };
  }
)

const favouriteSlice  = createSlice({
  name: 'favourite',
  initialState,
  reducers: { 
    makeFavourite: (state, action: PayloadAction<string>) => {
      state.favouriteIds.push(action.payload)
      localStorage.setItem('favourites', JSON.stringify(state.favouriteIds));
    },
    removeFavourite: (state, action: PayloadAction<string>) => {
      state.favouriteIds = state.favouriteIds.filter(id => id !== action.payload)
      localStorage.setItem('favourites', JSON.stringify(state.favouriteIds));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavourites.pending, state => {state.favouriteLoadingStatus = 'loading'}) 
    builder.addCase(fetchFavourites.fulfilled, (state, action) => { 
      state.favouriteLoadingStatus = 'idle'
      state.favouriteList = action.payload.data  
    })
    builder.addCase(fetchFavourites.rejected, state => {state.favouriteLoadingStatus = 'error'})
    builder.addDefaultCase(() => {})
  }
});

const { actions, reducer } = favouriteSlice

export default reducer 
export const {
  makeFavourite,
  removeFavourite,
} = actions
