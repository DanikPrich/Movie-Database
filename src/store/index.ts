import movie from './movieSlice.ts';
import favourite from './favouriteSlice.ts';
import { configureStore } from '@reduxjs/toolkit';

const store  = configureStore({
  reducer: {movie, favourite}, 
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', 
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;