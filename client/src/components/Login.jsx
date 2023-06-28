import React from 'react'

const AuthPage = () => {

    const redirect_uri = 'http://localhost:3000'
    const client_id = '7c7ec56729db4416b88c933966532ad3'
    const scope = 'streaming%20user-read-email%20user-read-private%20user-modify-playback-state%20user-read-playback-state%20user-library-read%20user-library-modify'

    const authorize = 'https://accounts.spotify.com/authorize'



    const auth_url = `${authorize}?client_id=${client_id}&response_type=code&redirect_uri=${encodeURI(redirect_uri)}&show_dialog=true&scope=${scope}`


    return (
        <div>
            <h3>Click to Authorize</h3>
            <a href={auth_url} className='' >Authorize</a>
        </div>
    )
}

export default AuthPage