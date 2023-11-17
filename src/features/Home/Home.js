import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, getSelectedSubreddit, getPostsForSelectedSubreddit, isHomeLoadingPosts, isHomeLoadingPostsError, arePostsLoaded } from './homeSlice';
import { Post } from '../Post/Post';
import { getSearchTerm } from '../Header/headerSlice';
import './Home.css'; 

const Home = () =>
{
    const dispatch = useDispatch();

    const selectedSubreddit = useSelector(getSelectedSubreddit);

    const posts = useSelector(getPostsForSelectedSubreddit);

    const searchTerm = useSelector(getSearchTerm);

    const postsLoaded = useSelector(arePostsLoaded)

    useEffect(() => {
        dispatch(fetchPosts(selectedSubreddit));
        }, [selectedSubreddit])

    if (postsLoaded)
    {
        return (
            <main>
            {
                posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())).map((post, index) => (
                    <Post 
                    key = {post.id}
                    post = {post}
                    className="post"
                    />
                ))
            }
            </main>
        );
    }
}

export default Home;