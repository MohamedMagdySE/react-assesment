import React from 'react';
import { useSelector } from 'react-redux';
import books from '../data/booksData';
import { getBookByStatus } from '../helpers/bookHelpers.ts';
import Book from './Book.tsx';

function WantToReadBS() {
    function dropHandler(event){
        event.dataTransfer.getData("uID");    
        console.log( event.dataTransfer.getData("uID"));
        
    }

    function allowDrop(event) {
        event.preventDefault();
    }
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
        <div onDragOver={allowDrop} onDrop={dropHandler} className = "bs">
            <h1> Want To Read </h1>
            <ul> {renderBooks()} </ul>
        </div>
    );
};

export default WantToReadBS;
