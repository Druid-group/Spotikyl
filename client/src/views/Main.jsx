
import React, { useEffect, useState } from 'react';

import axios from 'axios'
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import { useSearchParams } from 'react-router-dom';



export default () => {
    
    const [ searchParams, setSearchParams ] = useSearchParams()

    console.log(searchParams.get('code'))

    return (
        <div>
            { searchParams.get('code') ? <Dashboard code={searchParams.get('code')} /> : <Login /> }
        </div>
    )
}



