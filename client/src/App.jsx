import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import { useParams } from "react-router";
import {BrowserRouter, Routes, Route, Switch, Link} from "react-router-dom";
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Main from './views/Main';


//👇🏻 Websockets configuration

import { io } from "socket.io-client";



//http://192.168.1.22:3000/

function App() {

  const socket = io.connect("http://localhost:3000");

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
