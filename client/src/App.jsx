import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import { useParams } from "react-router";
import {Routes, Route, Switch, Link} from "react-router-dom";
import Login from './components/Login'
import Dashboard from './components/Dashboard';
import Main from './views/Main';


//http://192.168.1.22:3000/

function App() {



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