import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComments = createAsyncThunk(
    'comment/fetchComments',
    async ({permalink, id}, postId) => {
      const API_ROOT = 'https://www.reddit.com';
      const response = await fetch(`${API_ROOT}${permalink}.json`);
      const json = await response.json();
      const commentsArray = json[1].data.children.map((subreddit) => subreddit.data);
  
      function getTenRandomComments(items) {
        const shuffled = items.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 9);
      }

      const arrayOfComments = getTenRandomComments(commentsArray)

      return {
        postId: id,
        comments: arrayOfComments
      };
    }
  );

  export const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        commentsForPost: [],
        isLoadingComments: false,
        loadingCommentsHasError: false,
        commentsLoaded: false

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
            state.isLoadingComments = true;
            state.loadingCommentsHasError = false;
            state.commentsLoaded = false;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
            state.isLoadingComments = false;
            state.loadingCommentsHasError = false;
            state.commentsLoaded = true;
            console.log('Action Payload:', action.payload);
            state.commentsForPost.push(action.payload);
            console.log(state.commentsForPost)
            })
            .addCase(fetchComments.rejected, (state) => {
            state.isLoadingComments = false;
            state.loadingCommentsHasError = true;
            state.commentsLoaded = false;
            state.comments = [];
            })
    }
    });

export default commentSlice.reducer;
export const getComments = (state, postId) => {
  const wantedItem = state.comment.commentsForPost.filter(comment => comment.postId === postId);
  return wantedItem[0];
}