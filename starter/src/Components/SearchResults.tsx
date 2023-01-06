import React from 'react';
import { useSelector } from 'react-redux';
import { searchBooks } from '../helpers/bookHelpers.ts';
import Book from './Book.tsx';

function SearchResults() {
   
    const state = useSelector((state) => state);
    
    function renderBooks() {
        
        let wantedBooks = getBookByStatus(state.bookItems, "want");
        let renderedWantedBooks = wantedBooks.map(book => {
            return (
                <li key={book.uID}>
                    <Book item = {book} />
                </li>
            )
        })
        return renderedWantedBooks;
    }

    return (
        <div  className = "bs">
            <h1> Search Results </h1>
            <ul> {renderBooks()} </ul>
        </div>
    );
};

export default SearchResults;
