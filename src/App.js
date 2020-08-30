import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Main from './components/mainComponent';

function App() {
  localStorage.setItem('isLoggedin','false');
  localStorage.setItem('username','');
  return (
    <BrowserRouter>
    <div className="App">
      <Main/>
    </div>
    </BrowserRouter>
  );
}

export default App;
