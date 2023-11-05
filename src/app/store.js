import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/Home/homeSlice'

export default configureStore({
    reducer: {
      home: homeReducer,
    },
  });