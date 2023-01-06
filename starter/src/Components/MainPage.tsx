import React from 'react';
import WantToReadBS from './WantToReadBS.tsx'
import ReadBS from './ReadBS.tsx'
import CurrentlyReadingBS from './CurrentlyReadingBS.tsx'
import { useState, useEffect } from "react";
import store from '../redux/store.ts';
import BookShelf from './BookShelf.tsx';
import { getBooks } from '../helpers/bookHelpers.ts';
import SearchBar from './SearchBar.tsx';
import { search } from '../BooksAPI';
import SearchResults from './SearchResults';


function MainPage() {
    
    const [showSearchPage, setShowSearchpage] = useState(false);
    let currentlyBooks = store.getState().currentlyBooks;
    let readBooks = store.getState().readBooks;
    let wantBooks = store.getState().wantBooks;
 
    useEffect(() => {
        fetchBooks();
      }, [])
    
      async function fetchBooks() {
        await getBooks();
    }

    function renderCurrentlyBooks() {
      
        return (
            <BookShelf type = {"currently"} title = {"Currently Reading"} />
        )
    }

    function renderWantBooks() {

        return (
            <BookShelf type = {"want"} title = {"Want To Read"} />
        )
    }
    function renderReadBooks() {

        return (
            <BookShelf type = {"read"} title = {"Read"} />
        )
    }
    function renderSearchBar() {

        return (
            <SearchBar/>
        )
    }
    function renderSearchResults() {
        let searchResults = store.getState().searchResults;
        if (searchResults !== undefined && searchResults.length !== 0 && !searchResults.error){
            return (
                <BookShelf type = {"search"} title = {"Search Results"} />
            )
        }
    }
    
    

    return (
        <div className='main-page'>
            {renderSearchBar()}

            {showSearchPage ? (
                <div className="search-books">
                <div className="search-books-bar">
                    <a
                    className="close-search"
                    onClick={() => setShowSearchpage(!showSearchPage)}
                    >
                    Close
                    </a>
                    <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                    />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid"></ol>
                </div>
                </div>
            ) : (
                <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                   

                </div>

               
                <div className="list-books-content">
                    <div>
                        {renderSearchResults()}
                        {renderCurrentlyBooks()}
                        {renderWantBooks()}
                        {renderReadBooks()}
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
                </div>
                </div>
            )}
        </div>
    );
};

export default MainPage;
