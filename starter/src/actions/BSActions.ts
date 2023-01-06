import { SET_BOOK, MOVE_BOOK, SEARCH_BOOKS } from "../actionTypes";

const moveBooks = () => {
  return MOVE_BOOK;
};

const setBooks = () => {
  return SET_BOOK;
}

const searchAction = () => {
  return SEARCH_BOOKS;
}


export {moveBooks, setBooks, searchAction};
