import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

//Extra Reducers

export const fetchPosts = createAsyncThunk(
    'home/fetchPosts',
    async (subreddit) => {
      const API_ROOT = 'https://www.reddit.com';
      const data = await fetch(`${API_ROOT}${subreddit}.json`);
      const json = await data.json();
      return json.data.children.map((post) => post.data);
    }
);

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        selectedSubreddit: '/r/pics',
        postsForSubreddit: {},
        isLoadingPosts: false,
        loadingPostsHasError: false,
        postsLoaded: false
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
            state.isLoadingPosts = true;
            state.loadingPostsHasError = false;
            state.postsLoaded = false;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoadingPosts = false;
            state.loadingPostsHasError = false;
            state.postsLoaded = true;
            console.log(action.payload)
            state.postsForSubreddit = action.payload;
            })
            .addCase(fetchPosts.rejected, (state) => {
            state.isLoadingPosts = false;
            state.loadingPostsHasError = true;
            state.postsLoaded = false;
            state.postsForSubreddit = {};
            })
        },
    });

export default homeSlice.reducer;
export const getSelectedSubreddit = (state) => state.home.selectedSubreddit;
export const isHomeLoadingPosts = (state) => state.home.isLoadingPosts;
export const isHomeLoadingPostsError = (state) => state.home.loadingPostsHasError;
export const arePostsLoaded = (state) => state.home.postsLoaded;
export const getPostsForSelectedSubreddit = (state) => state.home.postsForSubreddit;