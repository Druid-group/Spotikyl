import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import { useParams } from "react-router";
import {Routes, Route, Switch, Link} from "react-router-dom";
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
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
