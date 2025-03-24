import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navigation from './components/navigation';

import homePage from './pages/homePage/landingPage.js'
import signupPage from './pages/homePage/signupPage.js';
import loginPage from './pages/homePage/loginPage.js';


function App() {
  return (
    
    <div className="App">
      <header className="App-header">
        <h1>To Do List</h1>
        <img src="./android-chrome-192x192.png" alt="Davidson Designs Logo"/>
        <p>
          This is the start of my To-Do List App.
        </p>
        <p>
          The application allows users to sign up, log in, create, read,
          update, and delete tasks.
        </p>
      </header>
      
    </div>

  );
}

export default App;
