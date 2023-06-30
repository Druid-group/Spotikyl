import React, { useState, useEffect, useRef } from 'react'




const WebPlayback = (props) => {

    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(props.song.track);
    const gotPlayer = useRef(false)

    // const { song } = props
    // console.log(song)

    // const track = {
    //     name: song.name,
    //     album: {
    //         images: [
    //             { url: "" }
    //         ]
    //     },
    //     artists: [
    //         { name: "" }
    //     ]
    // }



    useEffect(() => {
        if (!gotPlayer.current){
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);
        gotPlayer.current = true;
        window.onSpotifyWebPlaybackSDKReady = () => {
        
            const player = new window.Spotify.Player({
                name: 'Another one',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }
                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then(state => {
                    (!state) ? setActive(false) : setActive(true)
                });

            }));

            player.connect();

            player.togglePlay().then(() => {
                console.log('Toggled playback!');
            });

        };
        }
    }, []);




    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <img height={352} src={current_track.album.images[0].url}
                        className="now-playing__cover" alt="" />
                    <div className="now-playing__side">
                        <div className="now-playing__name">{
                            current_track.name
                        }</div>

                        <div className="now-playing__artist">{
                            current_track.artists[0].name
                        }</div>
                    <button className="btn-spotify playbtn" onClick={() => { player.togglePlay() }} >
                        {is_paused ? "PLAY" : "PAUSE"}
                    </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WebPlayback