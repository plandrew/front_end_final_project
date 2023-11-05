import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchPosts } from "./homeSlice";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('fetchPosts changes status of the postsLoaded state for /r/pics subreddit', async () => {
    const store = mockStore({
        home: {
            postsLoaded: false
        }
    });

    const givenSubreddit = '/r/pics';
    await store.dispatch(fetchPosts(givenSubreddit));

    const newState = store.getActions().find(action => action.type === 'home/fetchPosts/fulfilled');
    expect(newState).toBeDefined();
    expect(newState.payload).toEqual(expect.any(Array));  // Assuming the payload is an array of posts
});
