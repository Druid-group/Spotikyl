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
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.searchTracks('jump').then(res => {
            console.log(res.body.tracks.items) 
            setTracks(res.body.tracks.items)
            setPlayingTrack(res.body.tracks.items[0].id)
        } )
    }



    console.log(playingTrack, '--------------------------')

    return (
        <>
        {/* <div>Dashboard {accessToken} </div> */}
        <button onClick={getSongs} >Do it</button>
        {
            tracks? tracks.map((track, i) => 
            <div>
                <p>{track.name}</p>
            </div>) : <></>
        }
        {/* { accessToken &&
        <SpotifyPlayer token={accessToken} uris={[playingTrack]} /> 
        } */}
        <iframe style={{borderRadius: '12px'}} src={`https://open.spotify.com/embed/track/${playingTrack}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </>
    )
}

export default Dashboard