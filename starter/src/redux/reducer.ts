import { act } from "react-dom/test-utils/index.js";
import { setBooks } from "../actions/BSActions.js";
import { MOVE_BOOK , SET_BOOK, SEARCH_BOOKS} from "../actionTypes.js";
import { update } from "../BooksAPI.js";
import { getCurrently, getRead, getWantToRead } from "../helpers/bookHelpers.ts";

const initialState = {
  readBooks: [],
  currentlyBooks: [],
  wantBooks: [],
  searchResults: []
};


const updateBooks = (state, books) => {
  let stateClone = JSON.parse(JSON.stringify(state));
  stateClone.readBooks = books.read;
  stateClone.currentlyBooks = books.currently;
  stateClone.wantBooks = books.want
  return stateClone;

}

const changeShelf = (stateClone, target, id) => {
  let allBooks: any[];
  let found = false;
  allBooks = [].concat(stateClone.readBooks, stateClone.currentlyBooks, stateClone.wantBooks);
  allBooks.concat(stateClone.currentlyBooks, stateClone.wantBooks);
  for (let i = 0 ; i< allBooks.length; i++) {
    if (allBooks[i].id === id) {
      allBooks[i].shelf = target;
      update(allBooks[i], target);
      found = true;
    }
  }
  if (!found) {
      const searchResults = stateClone.searchResults;
      const book = searchResults.find( book => book.id === id);
      book.shelf  = target;
      update(book, target)
      allBooks.push(book);
  }
 


  stateClone.readBooks = getRead(allBooks);
  stateClone.wantBooks = getWantToRead(allBooks);
  stateClone.currentlyBooks = getCurrently(allBooks);

} 

const moveBook = (stateClone, payload) => {
  let target = payload.target;
  let id = payload.id;
  if (target === "want") {
    target = "wantToRead";
  } else if (target === "read") {
    target = "read";
  } else {
    target = "currentlyReading";
  }
 
  changeShelf(stateClone,target, id);
  return stateClone;
  
}

const getSearchResults = (stateClone, payload) => {
  stateClone.searchResults = payload.searchResults;

  return stateClone;
}

const bookReducer = (state = initialState, action) => {

  if (action.type === MOVE_BOOK) {
      let stateClone = JSON.parse(JSON.stringify(state));
      return moveBook(stateClone, action.payload);
    } else if (action.type === SET_BOOK) {
      let stateClone = updateBooks(state, action.payload);
      return stateClone;
    } else if (action.type === SEARCH_BOOKS) {
      let stateClone = getSearchResults(state, action.payload);
      return stateClone;
    } else {
      return state;
    }
      
}


export default bookReducer
