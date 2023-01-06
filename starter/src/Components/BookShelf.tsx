import { render } from '@testing-library/react';
import React from 'react';
import { useState, useEffect } from "react";
import store from '../redux/store.ts';
import Book from './Book.tsx';
import { moveBook } from '../helpers/bookHelpers.ts';

function BookShelf(props) {
    function dropHandler(event){
        event.dataTransfer.getData("id");  

        const id = event.dataTransfer.getData("id");
        const source = event.dataTransfer.getData("type");
        moveBook(props.type, source, id)
        
    }

    function allowDrop(event) {
        event.preventDefault();
    }

    function renderBooks() {
        let renderedBooks = []
        if (props.type === "read") {
            //map read
            let readBooks = store.getState().readBooks;
            renderedBooks = readBooks.map((book) => {
                return (
                    <li key = {book.id}>
                        <Book book = {book}/>
                    </li>
                )
            });
        } else if (props.type === "want") {
            //map want
            let wantBooks = store.getState().wantBooks;
            renderedBooks = wantBooks.map((book) => {
                return (
                    <li key = {book.id}>
                        <Book book = {book}/>
                    </li>
                )
            });
        } else if (props.type === "currently") {
            //map currently
            let currentlyBooks = store.getState().currentlyBooks;
            renderedBooks = currentlyBooks.map((book) => {
                return (
                    <li key = {book.id}>
                        <Book book = {book}/>
                    </li>
                )
            });
        }
        else if (props.type === "search") {
            //map currently
            let searchResults = store.getState().searchResults;
            if (searchResults !== undefined && !searchResults.error) {
                renderedBooks = searchResults.map((book) => {
                    return (
                        <li key = {book.id}>
                            <Book book = {book}/>
                        </li>
                    )
                });
            }
        }
        return renderedBooks;
    }

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.title}</h2>
            <div onDragOver={allowDrop} onDrop={dropHandler} className="bookshelf-books">
                <ol className="books-grid">
                    {renderBooks()}
                </ol>
            </div>
        </div>
    )
}

export default BookShelf;