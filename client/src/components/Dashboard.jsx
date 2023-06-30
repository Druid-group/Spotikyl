import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
<<<<<<< HEAD
import SpotifyPlayer from 'react-spotify-web-playback'
import WebPlayback from './WebPlayback'
=======
import { io } from "socket.io-client";
//import SpotifyPlayer from 'react-spotify-web-playback'

>>>>>>> af940b727276f49a3d75abdb291eb6e774ba6152

const spotifyApi = new SpotifyWebApi({
    clientId: '7c7ec56729db4416b88c933966532ad3'
})


const Dashboard = ({ code }) => {
    const [socket] = useState(() => io.connect("http://localhost:3000"))
    const [tracks, setTracks] = useState();
<<<<<<< HEAD
    const [playingTrack, setPlayingTrack] = useState();
=======
    // const [trackIds, setTrackIds] = useState();
>>>>>>> af940b727276f49a3d75abdb291eb6e774ba6152
    const [i, setI] = useState(0);

    const accessToken = useAuth(code)

    useEffect(() => {
        socket.on("update", ({songId, vote}) => {
            updateVoteCounts(songId, vote)
        })
        // console.log(accessToken)
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        getSongs()
        return () => socket.removeAllListeners()
    }, [accessToken])

    const getSongs = () => {
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getMySavedTracks({
            limit: 50,
            offset: 0
        }).then(res => {
<<<<<<< HEAD
            console.log(res.body.items)
            setTracks(res.body.items)
            setPlayingTrack(res.body.items[0].track)
            const uris = res.body.items.map((song) => song.track.id)
            uris && setPlayingTrack(uris)
            // console.log('playing tracks', playingTrack)

=======
            const resItems = res.body.items
            const votedItems=resItems.map( song => ({...song, 'votes':0 }) )
            const sorted = sortByVotes(votedItems);
            setTracks(sorted)
>>>>>>> af940b727276f49a3d75abdb291eb6e774ba6152
        })
    }
    
    // Used by the iFrame
    const getPlayListIds = () => {
        return tracks.map( x=> x.track.id )
    }

    // Not currently use, but might be needed
    // const getTrackById = (idStr) => {
    //     return tracks.filter( t => t.track.id === idStr)[0]
    // }

    const getCurrentVotesById = (idStr) => {
        const thisTrack = tracks.filter( track => track.track.id === idStr)[0]
        return thisTrack.votes;
    }
    
    const upVoteTrackById = (e) => {
        const idStr = e.target.id;
        socket.emit("vote", {songId: idStr, vote : 1})
        updateVoteCounts(idStr, +1);
    }
    
    const downVoteTrackById = (e) => {
        const idStr = e.target.id;
        socket.emit("vote", {songId: idStr, vote : -1})
        updateVoteCounts(idStr, -1);
    }

    const updateVoteCounts = (id, change) => {
        // This is going to change ONE track's vote count, but +/- 1
        // Filter the tracks for all t where t.id !== id
        // Filter / change the vote count for t where t.id === id
        // Recombine the results
        // const currTrack = getTrackById(id)
        const currCount = getCurrentVotesById(id)
        // console.log('\n---------------------------------------------------- Updating vote counts...')
        // console.log('Pre - sorted copy, 1st & Last 5 entries = ')
        // console.log(tracks.slice(0,5), tracks.slice(-5))

        const updatedTracks = tracks?.map( t => t.track.id !== id ? t : ({...t, votes: (currCount + change)}))
        // re-sort tracks
        const sorted = sortByVotes(updatedTracks);
        // console.log('Sorted Tracks: ', sorted)
        // console.log('Post - sorted tracks, 1st & Last 5 entries = ')
        // console.log(sorted.slice(0,5), sorted.slice(-5))


        setTracks(sorted)
};

    const sortByVotes = (tracks) => {
        let copy = [...tracks]
        copy = copy.sort( (a,b) => a.votes <= b.votes ? 1 : -1)

        console.log('unsorted : ', tracks)
        console.log('sorted : ', copy)
        
        return copy
    }


<<<<<<< HEAD

    //.contentWindow.body
    const nextSong = (i) => {
        setI(i = i + 1)
        // console.log(i)
=======
    const nextSong = (i) => {
        setI(i = (i+1) % tracks.length )
>>>>>>> af940b727276f49a3d75abdb291eb6e774ba6152
        return i
    }






<<<<<<< HEAD
//playlist/60f1nzRcNlccZYSqDo6Az0


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
            <h2>Vote on the music <span class="animate-charcter title bold ">YOU</span> want to hear</h2>
            <h3>Welcome to our music app. Vote on what's up next and create rankings on the playlist. Up and down votes will
                help shape what plays next.</h3>
            {/* <button onClick={getSongs} >Do it</button> */}
        </div>
        <div class="main">
            {/* <!-- LEFT SIDE  --> */}
            <div class="current-song">
                <h2 class="animate-charcter">Playing Now</h2>
                <div class="song">
                    {/* <button onClick={() => nextSong(i)}>Next</button> */}
                    { tracks && <WebPlayback song={tracks[0]} token={accessToken} /> }
                    {/* {tracks && <iframe id='myIFrame' src={`https://open.spotify.com/embed/track/${playingTrack[i]}?utm_source=generator`} width="100%" height="352" frameBorder="0" autoPlay={true} allowfullscreen=""  loading="lazy"></iframe>} */}
                    {/* {tracks && <SpotifyPlayer
=======
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
        // <SpotifyPlayer token={accessToken} ids={[trackIds]} /> 
        // } */}
        // <iframe style={{borderRadius: '12px'}} src={`https://open.spotify.com/embed/track/${trackIds}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        // </>

        <div>
            <header>
                <h1 class="title animate-character">SpotiKyl</h1>
            </header>
            <div class="description">
                <h2>Vote on the music <span class="animate-character title bold ">YOU</span> want to hear</h2>
                <h3>Welcome to our music app. Vote on what's up next and create rankings on the playlist. Up and down votes will
                    help shape what plays next.</h3>
                {/* <button onClick={getSongs} >Do it</button> */}
            </div>
            <div class="main">

                {/* <!-- LEFT SIDE  --> */}
                <div class="current-song">
                    <h2 class="animate-character">Playing Now</h2>
                    <div class="song">
                        <button onClick={() => nextSong(i)}>Next</button>
                        {/* {tracks && <div id="embed-iframe"></div>} */}
                        {tracks && <iframe title={getPlayListIds()[i]} src={`https://open.spotify.com/embed/track/${getPlayListIds()[i]}?utm_source=generator`} width="100%" height="352" frameBorder="0" autoPlay={true} allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>}
                        {/* {tracks && <iframe  src={`https://open.spotify.com/embed/track/${playListIds[i]}?utm_source=generator`} width="100%" height="352" frameBorder="0" autoPlay={true} allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>} */}
                        {/* {tracks && <iframe  src={`https://open.spotify.com/embed/track/${trackIds[i]}?utm_source=generator`} width="100%" height="352" frameBorder="0" autoPlay={true} allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>} */}
                        {/* {tracks && <SpotifyPlayer
>>>>>>> af940b727276f49a3d75abdb291eb6e774ba6152
                            // onClick={songEnds}
                            token={accessToken}
                            uris={[playingTrack[0]]}
                            magnifySliderOnHover={true}
                            styles={{
                                bgColor: '#333',
                                color: '#fff',
                                loaderColor: '#fff',
                                sliderColor: '#1cb954',
                                savedColor: '#fff',
                                trackArtistColor: '#ccc',
                                trackNameColor: '#fff',
                                loaderSize: '1px',
                                height: '200px'
                            }}
                        />} */}

<<<<<<< HEAD
                    {/* <h2>{tracks && playingTrack.name}</h2>
            <h3>{tracks && playingTrack.artists[0].name}</h3> */}
                    {/* <p>{tracks && playingTrack.album.release_date}</p>
            <p>{tracks && playingTrack.name}</p> */}
=======
                        {/* <h2>{tracks && trackIds.name}</h2>
            <h3>{tracks && trackIds.artists[0].name}</h3> */}
                        {/* <p>{tracks && trackIds.album.release_date}</p>
            <p>{tracks && trackIds.name}</p> */}
                    </div>
                </div>

                {/* <!-- RIGHT SIDE  --> */}
                <div class="upcoming-songs">
                    <h2>Upcoming Next</h2>

                    {/* <!-- PLACEHOLDERS  --> */}
                    {
                        // tracks ? tracks.filter((_, index) => index > 0).map((song, i) =>
                        tracks ? tracks.map((song, i) =>
                            <div key={song.track.id} class="upcoming-list">
                                <div>
                                    <h4>{song.track.name}</h4>
                                    <h5>{song.track.artists[0].name}</h5>
                                </div>
                                <div class="arrows">
                                    <p id={song.track.id} onClick={upVoteTrackById} class="arrow up"></p>
                                    <p id={song.track.id} onClick={downVoteTrackById} class="arrow down"></p>
                                </div>
                            </div>
                        )
                            : <></>
                    }
>>>>>>> af940b727276f49a3d75abdb291eb6e774ba6152
                </div>
            </div>

            {/* <!-- RIGHT SIDE  --> */}
            <div class="upcoming-songs">
                <h2>Upcoming Next</h2>

                {/* <!-- PLACEHOLDERS  --> */}
                {
                    tracks ? tracks.map((song, i) =>
                        <div key={song.track.id} class="upcoming-list">
                            <div>
                                <h4>{song.track.name}</h4>
                                <h5>{song.track.artists[0].name}</h5>
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