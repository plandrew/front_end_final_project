import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchSubreddits } from "./headerSlice";
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import * as redux from 'react-redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the react-redux module
jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
    useSelector: jest.fn()
}));

// Provide mock data for useSelector
const mockSubreddits = [
    { id: 1, display_name: 'subreddit1', header_img: 'img1', url: '/r/subreddit1' },
    { id: 2, display_name: 'subreddit2', header_img: 'img2', url: '/r/subreddit2' },
    { id: 3, display_name: 'subreddit3', header_img: 'img3', url: '/r/subreddit3' },
    { id: 4, display_name: 'subreddit4', header_img: 'img4', url: '/r/subreddit4' },
    { id: 5, display_name: 'subreddit5', header_img: 'img5', url: '/r/subreddit5' },
];

describe('Header Component', () => {

    beforeEach(() => {
        // Reset useSelector mock to return the default data each time
        redux.useSelector.mockImplementation(selector => selector({
            header: {
                subreddits: mockSubreddits
            }
        }));
    });

    test('fetchSubreddits changes status of the subredditsLoaded state for /r/pics subreddit', async () => {
        const store = mockStore({
            header: {
                subredditsLoaded: false
            }
        });
        await store.dispatch(fetchSubreddits(5));
        const newState = store.getActions().find(action => action.type === 'header/fetchSubreddits/fulfilled');
        expect(newState).toBeDefined();
        expect(newState.payload).toEqual(expect.any(Array));  // Assuming the payload is an array of subreddits
    });

    test('renders 5 subreddits', () => {
        // Render the Header component
        render(<Header />);

        // Assert that there are 5 list items (subreddits)
        const subredditItems = screen.getAllByRole('listitem');
        expect(subredditItems).toHaveLength(5);
    });
});
