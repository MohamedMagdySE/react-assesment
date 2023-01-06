import { render } from '@testing-library/react';
import React from 'react';

interface BookProps {
    title: string,
    author: string,
    status: string,
    id: string,
    category: string,
    thumbnail: any
}

function Book(props){
    
    function renderBookItem() {
        if (props.book.authors && props.book.imageLinks && props.book.imageLinks.thumbnail) {
            return (             
                <div className="book">
                    <div className="book-top">
                        <div
                            className="book-cover"
                            style={{
                            width: 128,
                            height: 193,
                            backgroundImage:
                                `url(${props.book.imageLinks.thumbnail})`,
                            }}
                        ></div>
                    </div>
                    <div className="book-title">{props.book.title}</div>
                    <div className="book-authors">{props.book.authors.join(',')}</div>
                </div>
            )
        }
        else {
            return null;
        }
    }

    function dragHandler(event) {
        event.dataTransfer.setData("id", props.book.id);
        event.dataTransfer.setData("type", props.book.shelf);
    }

    return (
        <div draggable = "true" className = "bs" onDragStart={dragHandler}>
           {renderBookItem()}
        </div>
    );
};

export default Book;
