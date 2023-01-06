import "./App.css";
import { useState, useEffect } from "react";
import { getAll } from "./BooksAPI";
import { getBooks } from './helpers/bookHelpers.ts';
import MainPage from "./Components/MainPage.tsx";

function App() {

  return (
    <div className="app">
      <MainPage/>
    </div>
  );
}

export default App;
