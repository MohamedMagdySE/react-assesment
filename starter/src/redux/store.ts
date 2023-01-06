import {createStore} from 'redux';
import bookReducer from './reducer.ts';

const store = createStore(bookReducer);

export default store;
