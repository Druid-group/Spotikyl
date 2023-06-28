import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import SpotifyPlayer from 'react-spotify-web-playback'


const spotifyApi = new SpotifyWebApi({
    clientId: '7c7ec56729db4416b88c933966532ad3'
})


const Dashboard = ({ code }) => {

    const accessToken = useAuth(code)
    const [tracks, setTracks] = useState();
    const [playingTrack, setPlayingTrack] = useState('spotify:track:4vTXBC7QOjEbi8DcJvCNE2');

    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [tracks])

    const getSongs = () => {
        spotifyApi.searchTracks('jump').then(res => {
            console.log(res.body.tracks.items) 
            setTracks(res.body.tracks.items)
            setPlayingTrack(res.body.tracks.items[0].id)
        } )
    }



    // console.log(playingTrack, '--------------------------')

    return (
        // <>
        // {/* <div>Dashboard {accessToken} </div> */}
        // <button onClick={getSongs} >Do it</button>
        // {
        //     tracks? tracks.map((track, i) => 
        //     <div>
        //         <p>{track.name}</p>
        //     </div>) : <></>
        // }
        // {/* { accessToken &&
        // <SpotifyPlayer token={accessToken} uris={[playingTrack]} /> 
        // } */}
        // <iframe style={{borderRadius: '12px'}} src={`https://open.spotify.com/embed/track/${playingTrack}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        // </>

<div>
<header>
    <h1 class="title animate-charcter">SpotiKyl</h1>
</header>
<div class="description">
    <h2>Vote on the music <span class="animate-charcter">YOU</span> want to hear</h2>
    <h3>Welcome to our music app. Vote on what's up next and create rankings on the playlist. Up and down votes will
        help shape what plays next.</h3>
        {/* <button onClick={getSongs} >Do it</button> */}
</div>
<div class="main">
    
    {/* <!-- LEFT SIDE  --> */}
    <div class="current-song">
        <h2 class="animate-charcter">Playing Now</h2>
        <div class="song">
            <iframe src="https://open.spotify.com/embed/track/5XUuldRjPXcP5QxyEN4IXT?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            <h2>Song Title</h2>
            <h3>Artist</h3>
            <p>Release Year</p>
            <p>Genre</p>
        </div>
    </div>

    {/* <!-- RIGHT SIDE  --> */}
    <div class="upcoming-songs">
        <h2>Upcoming Next</h2>

        {/* <!-- PLACEHOLDERS  --> */}
        {
                tracks? tracks.map((track, i) => 
        <div class="upcoming-list">
            <div>
                <h4>Song</h4>
                <h5>Artist</h5>
            </div>
            <div class="arrows">
                <p class="arrow up"></p>
                <p class="arrow down"></p>
            </div>
        </div>
        ) 
    : <></>
    }
    </div>
</div>
<footer>
    <h6>Made with Love and just enough Hate</h6>
</footer>
</div>
    )
}

export default Dashboard