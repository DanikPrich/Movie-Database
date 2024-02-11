import movie from './movieSlice.ts';
import favourite from './favouriteSlice.ts';
import { configureStore } from '@reduxjs/toolkit';


export const createReduxStore = (initialState = {}) => {
  return configureStore({
    reducer: {movie, favourite},
    preloadedState: initialState,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production', 
  })
}
const store = createReduxStore()
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>