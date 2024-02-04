import movie from './movieSlice';
import favourite from './favouriteSlice';
import { configureStore } from '@reduxjs/toolkit';

const store  = configureStore({
  reducer: {movie, favourite}, 
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', 
})
export default store;