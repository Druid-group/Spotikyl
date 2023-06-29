import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import { useParams } from "react-router";
import {BrowserRouter, Routes, Route, Switch, Link} from "react-router-dom";
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Main from './views/Main';
import SongList from './components/SongList';
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

//👇🏻 Websockets configuration

import { io } from "socket.io-client";


//http://192.168.1.22:3000/

function App() {

  const socket = io.connect("http://localhost:3000");

  return (
    <div className="App">

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/' element={<Login socket={socket} />} />
        <Route path='/' element={<Main />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
