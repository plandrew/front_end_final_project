import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSubreddits = createAsyncThunk(
    'header/fetchSubreddits',
    async (requestedNumberOfSubreddits) => {
      const API_ROOT = 'https://www.reddit.com';
      const response = await fetch(`${API_ROOT}/subreddits.json`);
      const json = await response.json();
      const subredditsArray = json.data.children.map((post) => post.data);
  
      function getRandomItemsWithHeaderImg(items, count) {
        const itemsWithHeaderImg = items.filter(item => item.header_img);
        const shuffled = itemsWithHeaderImg.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      }

      return getRandomItemsWithHeaderImg(subredditsArray, requestedNumberOfSubreddits);
    }
  );
  
export const headerSlice = createSlice({
    name: 'header',
    initialState: {
        searchTerm: '',
        subreddits: [],
        isLoadingSubreddits: false,
        loadingSubredditsHasError: false,
        subredditsLoaded: false

    },
    reducers: {
        setSearchTermInState: (state, action) =>
        {
            state.searchTerm = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubreddits.pending, (state) => {
            state.isLoadingSubreddits = true;
            state.loadingSubredditsHasError = false;
            state.subredditsLoaded = false;
            })
            .addCase(fetchSubreddits.fulfilled, (state, action) => {
            state.isLoadingSubreddits = false;
            state.loadingSubredditsHasError = false;
            state.subredditsLoaded = true;
            state.subreddits = action.payload;
            })
            .addCase(fetchSubreddits.rejected, (state) => {
            state.isLoadingSubreddits = false;
            state.loadingSubredditsHasError = true;
            state.subredditsLoaded = false;
            state.subredditsForSubreddit = {};
            })
    }
    });

export default headerSlice.reducer;
export const { setSearchTermInState } = headerSlice.actions;
export const getSearchTerm = (state) => state.header.searchTerm;
export const getSubreddits = (state) => state.header.subreddits;