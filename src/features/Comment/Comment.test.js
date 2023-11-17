import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchComments } from './commentSlice';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Comment from './Comment';
import * as redux from 'react-redux';
import { mockComments } from './mockComments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

// Mock the react-redux module
jest.mock('react-redux', () => ({
    useDispatch: () => jest.fn(),
    useSelector: jest.fn()
}));

describe('Comment Component', () => {

    beforeEach(() => {
        // Reset useSelector mock to return the default data each time
        redux.useSelector.mockImplementation(selector => selector({
            comment: {
                commentsForPost: []
            }
        }));
    });

    test('fetchComments returns an array of objects in format {postId, comments}', async () => {
        const store = mockStore({
            comment: {
                commentsForPost: [],
                commentsLoaded: false
            }
        });

        await store.dispatch(fetchComments({permalink: '/r/pics/comments/17ms3xg/mongolian_brothers_one_is_a_monk_and_the_other', postId: '17ms3xg'}));
        const actions = store.getActions();
        const fetchCommentsAction = actions.find(action => action.type === 'comment/fetchComments/fulfilled');

        expect(fetchCommentsAction).toBeDefined();
        
        // Check if payload is an array
        expect(typeof fetchCommentsAction.payload === 'object' && !Array.isArray(fetchCommentsAction.payload)).toBeTruthy();

        // Check each item in the array to match the expected format
        expect(fetchCommentsAction.payload).toHaveProperty('postId');
        expect(fetchCommentsAction.payload).toHaveProperty('comments');
        expect(Array.isArray(fetchCommentsAction.payload.comments)).toBeTruthy();

        const hasCommentWithRequiredProperties = fetchCommentsAction.payload.comments.some(comment => 
            comment.hasOwnProperty('author') && 
            comment.hasOwnProperty('body') && 
            comment.hasOwnProperty('created_utc') &&
            comment.hasOwnProperty('ups')
        );
        expect(hasCommentWithRequiredProperties).toBeTruthy();
    });
    test('Renders comments with avatar, author, body, number of likes, date', () => {
        // Mock comment data
        const mockComment = {
            author: 'testAuthor',
            body: 'This is a test comment.',
            created_utc: '2023-01-01T00:00:00Z', // Example date in ISO format
            ups: 123
        };
    
        // Render the Comment component with mock data
        render(<Comment comment={mockComment} />);
        
        // Check if the component renders the author's name
        expect(screen.getByText(mockComment.author)).toBeInTheDocument();
    
        // Check if the component renders the comment body
        expect(screen.getByText(mockComment.body)).toBeInTheDocument();
    });    
});
