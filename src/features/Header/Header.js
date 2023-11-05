import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Header = () =>
{
    //BoilerPlate
    const dispatch = useDispatch();

    //Code
    const [searchTermLocal, setSearchTermLocal] = useState('');


    const onSearchTermChange = (e) => {
        setSearchTermLocal(e.target.value);
      };

    const onSearchTermSubmit = (e) =>
    {
        e.preventDefault();
        //dispatch(setStateSearchTerm(searchTermLocal));
    }
    
    return (
        <header>
            <figure>
                <img src="/Visual Elements/Logo.png" alt="ReadIt Logo" />
            </figure>
            <form onSubmit={onSearchTermSubmit}>
            <input
                type="text"
                placeholder="Search"
                value={searchTermLocal}
                onChange={onSearchTermChange}
                aria-label="Search posts"
            />
            <button type="submit" aria-label="Search">
                Search
            </button>
            </form>
        </header>
    );
}

export default Header;