import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const useAuth = (code) => {

    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()
    const gotToken = useRef(false)


    useEffect(() => {
        if (!gotToken.current) {
            console.log('HII-----------------------------', code)
            gotToken.current = true
            axios.post('http://localhost:8000/login',
                { code }
            ).then(res => {
                console.log('RESPONSE', res.data)
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
            }).catch((err) => {
                console.log(err)
                // window.location = '/'
            })
        }
    }, [code])

    return accessToken

}

export default useAuth