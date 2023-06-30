import React from 'react'
import '../App.css'


const AuthPage = () => {

    const redirect_uri = 'http://localhost:3000'
    const client_id = '7c7ec56729db4416b88c933966532ad3'
    const scope = 'streaming%20user-read-email%20user-read-private%20user-modify-playback-state%20user-read-playback-state%20user-library-read%20user-library-modify'

    const authorize = 'https://accounts.spotify.com/authorize'



    const auth_url = `${authorize}?client_id=${client_id}&response_type=code&redirect_uri=${encodeURI(redirect_uri)}&show_dialog=true&scope=${scope}`


    return (
        <div className="authorization">
            <h1>Welcome to <span className="animate-character">SpotiKyl</span></h1>
            <h3>You need to Authorize acess to be able to vote on what's up next and create rankings on the playlist</h3>
            <a href={auth_url} className=''>Let's Go</a>
        </div>
    )
}

export default AuthPage