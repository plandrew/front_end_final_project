import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/Home/homeSlice'
import headerReducer from '../features/Header/headerSlice'
import commentReducer from '../features/Comment/commentSlice'

export default configureStore({
    reducer: {
      home: homeReducer,
      header: headerReducer,
      comment: commentReducer
    },
  });