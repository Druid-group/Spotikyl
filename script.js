
const redirect_uri = 'http://localhost:3000'
const client_id = ''
const client_secret = ''
const scope = 'user-modify-playback-state user-read-playback-position user-library-read'

const authorize = 'https://accounts.spotify.com/authorize'

const getAuth = () => {

    const url = `${authorize}?client_id=${client_id}&response_type=code&redirect_uri=${encodeURI(redirect_uri)}&show_dialog=true&scope=${scope}`
    // window.location.href = url;
    console.log(url)
}
getAuth()