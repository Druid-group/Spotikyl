import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
import SpotifyPlayer from 'react-spotify-web-playback'


const spotifyApi = new SpotifyWebApi({
    clientId: '7c7ec56729db4416b88c933966532ad3'
})

const Dashboard = ({ code }) => {

    const [tracks, setTracks] = useState();
    const [playingTrack, setPlayingTrack] = useState();


    const accessToken = useAuth(code)

    useEffect(() => {
        // console.log(accessToken)
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        getSongs()
    }, [accessToken])

    const getSongs = () => {
        // spotifyApi.setAccessToken(accessToken)
        spotifyApi.getMySavedTracks({
            limit: 50,
            offset: 0
        }).then(res => {
            console.log(res.body.items)
            setTracks(res.body.items)
            setPlayingTrack(res.body.items[0].track.id)
        })
    }





    //playlist/60f1nzRcNlccZYSqDo6Az0


    return (
        <>
            {/* <div>Dashboard {accessToken} </div> */}
            {/* <button onClick={getSongs} >load songs</button> */}
            {
                tracks ? tracks.map((song) =>
                    <div key={song.track.id}>
                        <p>{song.track.name}</p>
                    </div>) : <></>
            }

            {tracks && <iframe style={{ borderRadius: '12px' }} src={`https://open.spotify.com/embed/track/${playingTrack}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowFullScreen="" allow="" loading="lazy"></iframe>}
        </>
    )
}

export default Dashboard