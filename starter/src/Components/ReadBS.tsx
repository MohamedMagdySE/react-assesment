import React from 'react';
import { useSelector } from 'react-redux';
import { getBookByStatus } from '../helpers/bookHelpers.ts';
import Book from './Book.tsx';

function ReadBS() {
    function dropHandler(event){
        event.dataTransfer.getData("uID");    
        console.log( event.dataTransfer.getData("uID"));
        
    }

    function allowDrop(event) {
        event.preventDefault();
    }
    const state = useSelector((state) => state);
    
    
    function renderBooks() {
        
        let readBooks = getBookByStatus(state.bookItems, "read");
        let renderedreadBooks = readBooks.map(book => {
            return (
                <li key={book.uID}>
                    <Book item = {book} />
                </li>
            )
        })
        return renderedreadBooks;
    }
    return (
        <div onDragOver={allowDrop} onDrop={dropHandler} className = "bs">
            <h1> Read </h1>
            <ul> {renderBooks()} </ul>
        </div>
    );
};

export default ReadBS;
