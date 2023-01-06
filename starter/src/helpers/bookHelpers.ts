import { getAll, search } from "../BooksAPI";
import { setBooks, moveBooks , searchAction } from "../actions/BSActions.ts";
import store from "../redux/store.ts";

export function parseBooks(booksArr) {
    let booksParsed : any = [];
    for (var i = 0; i < booksArr.length; i++) {
        let elem = {uID : booksArr[i].uID , status:  booksArr[i].status };
        booksParsed.push(elem);
    }
    return booksParsed;   
}

export function getBookByStatus(books, status) {
    const result = books.filter( book => book.status === status);
    
    return result;
}

export function getBookByUID(books, uID) {
    const result = books.find( book => book.uID === uID);
    
    return result;
}

export function moveBook(target, source, id) {
    store.dispatch({
        type: moveBooks(),
        payload: {
            target,
            source,
            id
        }
    })
}

export async function getBooks() {
    let booksArr = await getAll();
    let read = getRead(booksArr);
    let currently = getCurrently(booksArr);
    let want = getWantToRead(booksArr);    
    store.dispatch({
        type: setBooks(),
        payload: {
            read,
            currently,
            want
        }
    })

}

export async function searchBooks(query) {
   let sr = await search(query);
    store.dispatch({
        type: searchAction(query),
        payload: {
            searchResults: sr
        }
    });
}

export function getCurrently(books) {
    let currBooks = books.filter((book) => {
        return book.shelf === "currentlyReading";
    });

    return currBooks;
}

export function getRead(books) {
    let currBooks = books.filter(book =>  book.shelf === "read");
    return currBooks;
}

export function getWantToRead(books) {
    let currBooks = books.filter((book) => {
        return book.shelf === "wantToRead";
    });

    return currBooks;
}

