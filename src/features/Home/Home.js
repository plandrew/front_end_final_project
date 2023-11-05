import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getSelectedSubreddit, getPostsForSelectedSubreddit, isHomeLoadingPosts, isHomeLoadingPostsError, arePostsLoaded } from './homeSlice';
import { Post } from '../Post/Post';

const Home = () =>
{
    const dispatch = useDispatch();

    const selectedSubreddit = useSelector(getSelectedSubreddit);

    const posts = useSelector(getPostsForSelectedSubreddit)

    console.log(posts);

    const postsLoaded = useSelector(arePostsLoaded)

    useEffect(() => {
        dispatch(fetchPosts(selectedSubreddit));
        }, [selectedSubreddit])

    if (postsLoaded)
    {
        return (
            <main>
            {
                posts.map((post, index) => (
                    <Post 
                    key = {post.id}
                    post = {post}
                    />
                ))
            }
            </main>
        );
    }
}

export default Home;