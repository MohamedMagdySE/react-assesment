import React from 'react';
import { useSelector } from 'react-redux';
import books from '../data/booksData.ts';
import { parseBooks, getBookByStatus } from '../helpers/bookHelpers.ts';
import Book from './Book.tsx';

function CurrentlyReadingBS() {
    function dropHandler(event){
        event.dataTransfer.getData("uID");    
        console.log( event.dataTransfer.getData("uID"));
        
    }

    function allowDrop(event) {
        event.preventDefault();
    }
    const state = useSelector((state) => state);
    
    
    function renderBooks() {
        let booksArr = books;
        
        let currBooks = getBookByStatus(state.bookItems, "currently");
        let renderedCurrBooks = currBooks.map(book => {
            return (
                <li key={book.uID}>
                    <Book item = {book} />
                </li>
            )
        })
        return renderedCurrBooks;
    }
    
    return (
        <div onDragOver={allowDrop} onDrop={dropHandler} className = "bs">
            <h1> Currently Reading </h1>
            <ul> {renderBooks()} </ul>
        </div>
    );
};

export default CurrentlyReadingBS;
