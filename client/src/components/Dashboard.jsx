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
    const [i, setI] = useState(0);

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
            setPlayingTrack(res.body.items[0].track)
            const uris = res.body.items.map((song) => song.track.id) 
            uris && setPlayingTrack(uris)
            console.log('playing tracks', playingTrack)
        })
    }


    const nextSong = (i) => {
        setI(i = i+1)
        console.log(i)
        return i
    }


    // window.onSpotifyIframeApiReady = (IFrameAPI) => {
    //     const element = document.getElementById('embed-iframe');
    //     const options = {
    //         width: '100%',
    //         height: '350',
    //         uri: playingTrack[0]
    //     };
    //     const callback = (EmbedController) => {
    //         document.querySelectorAll('.episode').forEach(
    //             episode => {
    //                 episode.addEventListener('click', () => {
    //                     EmbedController.loadUri(episode.dataset.spotifyId)
    //                 });
    //             })
    //     };
    //     IFrameAPI.createController(element, options, callback);
    // };





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
                        <button onClick={() => nextSong(i)}>Next</button>
                        {/* {tracks && <div id="embed-iframe"></div>} */}
                        {tracks && <iframe  src={`https://open.spotify.com/embed/track/${playingTrack[i]}?utm_source=generator`} width="100%" height="352" frameBorder="0" autoPlay={true} allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>}
                        {/* {tracks && <SpotifyPlayer
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

                        {/* <h2>{tracks && playingTrack.name}</h2>
            <h3>{tracks && playingTrack.artists[0].name}</h3> */}
                        {/* <p>{tracks && playingTrack.album.release_date}</p>
            <p>{tracks && playingTrack.name}</p> */}
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