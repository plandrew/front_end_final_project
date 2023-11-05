import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getSelectedSubreddit, getPostsForSelectedSubreddit, isHomeLoadingPosts, isHomeLoadingPostsError } from './homeSlice';

const Home = () =>
{
    const dispatch = useDispatch();

    const selectedSubreddit = useSelector((state) => state.home.selectedSubreddit);

    const posts = useSelector(getPostsForSelectedSubreddit)

    console.log(posts);

    useEffect(() => {
        console.log('a')
        dispatch(fetchPosts(selectedSubreddit));
        }, [selectedSubreddit])

    if (isHomeLoadingPosts && isHomeLoadingPostsError)
    {
        return (
            <main>
            {
                posts.map((post, index) => (
                    <p>{post.id}</p>
                ))
            }
            </main>
        );
    }

    
}

export default Home;