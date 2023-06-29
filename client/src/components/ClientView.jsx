import React, {useState} from 'react'

const ClientView = () => {
    const [player, setPlayer] = useState(undefined);
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState();


    // const track = {
    //     name: "",
    //     album: {
    //         images: [
    //             { url: "" }
    //         ]
    //     },
    //     artists: [
    //         { name: "" }
    //     ]
    // }

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



    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <img src={current_track.album.images[0].url}
                        className="now-playing__cover" alt="" />

                    <div className="now-playing__side">
                        <div className="now-playing__name">{
                            current_track.name
                        }</div>

                        <div className="now-playing__artist">{
                            current_track.artists[0].name
                        }</div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ClientView