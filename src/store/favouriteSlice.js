import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useMovieService from '../services/MoviesService';

const initialState = {
  favouriteList: [],
  favouriteLoadingStatus: 'idle',
  favouriteIds: JSON.parse(localStorage.getItem('favourites')) || [],
}

export const fetchFavourites = createAsyncThunk(
  'favourite/fetchFavourites', 
  async (favouriteIds, thunkApi) => { 
    const { getFavouritesByIds } = useMovieService();
    const { data } = await getFavouritesByIds(favouriteIds);
    return { data };
  }
)

const favouriteSlice  = createSlice({
  name: 'favourite',
  initialState,
  reducers: { 
    makeFavourite: (state, action) => {
      state.favouriteIds.push(action.payload)
      localStorage.setItem('favourites', JSON.stringify(state.favouriteIds));
    },
    removeFavourite: (state, action) => {
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
