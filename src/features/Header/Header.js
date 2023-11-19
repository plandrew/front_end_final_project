import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTermInState, getSearchTerm } from './headerSlice';
import { fetchSubreddits, getSubreddits } from './headerSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setSubreddit } from '../Home/homeSlice';
import './Header.css'; 

const Header = () =>
{
    //BoilerPlate
    const dispatch = useDispatch();

    //Code
    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
      };

    useEffect(() => {
        if (searchTerm)
        {
            dispatch(setSearchTermInState(searchTerm));
        }
        
    }, [searchTerm])

    useEffect(() => {
        dispatch(fetchSubreddits(5));
      }, []);

    const onSearchTermSubmit = () =>
    {
        dispatch(setSearchTerm(searchTerm));
    }

    const subreddits = useSelector(getSubreddits);

    const onSubredditClick = () =>
    {

    }

    return (
        <header>
            <figure>
                <img src="/Visual Elements/Logo.png" alt="ReadIt Logo" />
            </figure>
            <form onSubmit={onSearchTermSubmit}>
                <input
                    type="text"
                    placeholder="Filter posts by text"
                    value={searchTerm}
                    onChange={onSearchTermChange}
                    aria-label="Search posts"
                />
                <button type="submit" aria-label="Search">
                    Search
                </button>
            </form>
            <menu>
            {
            subreddits.map(subreddit => (
                <li className="subreddit">
                    <img className="subredditLogo" src={subreddit.header_img} />
                    <button className="subredditButton"
                    type="button"
                    onClick={() => dispatch(setSubreddit(subreddit.url))}
                    >
                        <p>r/{subreddit.display_name}</p>
                    </button>
                </li>
            ))
            }
            </menu>
        </header>
    );
}

export default Header;