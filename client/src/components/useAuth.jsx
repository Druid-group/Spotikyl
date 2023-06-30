import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const useAuth = (code) => {

    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()
    const gotToken = useRef(false)


    useEffect(() => {
        if (!gotToken.current) {
            // console.log('HII-----------------------------', code)
            gotToken.current = true
            axios.post('http://localhost:8000/login',
                { code }
            ).then(res => {
                // console.log('RESPONSE', res.data)
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                const timeOfToken = new Date();
                console.log(timeOfToken.toUTCString())
            }).catch((err) => {
                console.log(err)
                // window.location = '/'
            })
        }
    }, [code])


    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios.post("http://localhost:8000/refresh", {
                    refreshToken,
                })
                .then(res => {
                    setAccessToken(res.data.accessToken)
                    setExpiresIn(res.data.expiresIn)
                    const timeOfToken = new Date();
                    console.log(timeOfToken.toUTCString())
                })
                .catch(() => {
                    window.location = "/"
                })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])



    return accessToken

}




export default useAuth