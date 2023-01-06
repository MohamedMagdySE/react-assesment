import React from 'react';
import '../styles/search-bar.scss';
import { search } from '../BooksAPI';
import {searchBooks} from '../helpers/bookHelpers.ts'

function SearchBar() {
    let searchTimeOut;

    let handleChange = async (event) => {          
        clearTimeout(searchTimeOut);
        searchTimeOut = setTimeout (async()=>
        {
            console.log(event.target.value);
            await searchBooks(event.target.value);
        },300)
        
    }

    
    return (
    <div className='search' >
        <input  onChange ={(e) => handleChange(e)} className = "search-bar" placeholder="search"/>
    </div>
    
    );
    
};


export default SearchBar;
