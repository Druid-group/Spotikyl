import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import SpotifyWebApi from 'spotify-web-api-node'
//import SpotifyPlayer from 'react-spotify-web-playback'


const spotifyApi = new SpotifyWebApi({
    clientId: '7c7ec56729db4416b88c933966532ad3'
})

const Dashboard = ({ code }) => {

    const [tracks, setTracks] = useState();
    const [trackIds, setTrackIds] = useState();
    const [i, setI] = useState(0);
    const [playListIds, setPlayListIds] = useState();
    const [votes, setVotes] = useState(
        []
        // [{trackId: '6l8GvAyoUZwWDgF1e4822w', votes: 14},  // Bohemian Rhapsody
        //  {trackId: '0KMGxYKeUzK9wc5DZCt3HT', votes: 6 }] // If you leave me now
);   // an array of dictionaries [{id, count}]

    const accessToken = useAuth(code)

    useEffect(() => {
        // console.log(accessToken)
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        getSongs()
    }, [accessToken])

    const getSongs = () => {
        spotifyApi.setAccessToken(accessToken)
        spotifyApi.getMySavedTracks({
            limit: 50,
            offset: 0
        }).then(res => {
            const resItems = res.body.items
            const votedItems=resItems.map( song => ({...song, ['votes']:0 }) )
            const sorted = sortByVotes(votedItems);
            setTracks(sorted)
            // map over items, adding x.track.votes=0 
            // eventually re-sort these items by vote count, if exists
            // then store into setTracks
            // Need to also update the state of the BE spotify playlist
            // end

            /* 
            

            // Include current ordering of songs with votes.
            console.log(resItems)
            setTracks(resItems)
            // setTrackIds(res.body.items[0].track)
            const ids = res.body.items.map((song) => song.track.id) 
            ids && setTrackIds(ids)

            // Sort ids by votes, ideally before the setTrackIds, perhaps as part of the dot chain
            // updateVoteCounts()

            const foo = sortIdsByVotes(ids)
            setPlayListIds( foo );
            // Here, we need to integrate the songs w/ their current votes to determine playlist order
            console.log('playlist ids', foo)
            console.log('playing tracks', ids)
            */
        })
    }
    const getPlayListIds = () => {
        const foo = tracks
        let order = tracks.map( x=> x.track.id )
        // console.log( 'Intended track order is: ', order)
        return order
    }
    const getTrackById = (idStr) => {
        return tracks.filter( t => t.track.id === idStr)[0]
    }

    const getCurrentVotesById = (idStr) => {
        const foo = tracks;
        console.log('id is ', idStr)
        console.log('tracks are:', foo)
        const thisTrack = foo.filter( track => track.track.id === idStr)[0]
        return thisTrack.votes;
    }
    const upVoteTrackById = (e) => {
        const idStr = e.target.id;
        updateVoteCounts(idStr, +1);
    }
    const downVoteTrackById = (e) => {
        const idStr = e.target.id;
        updateVoteCounts(idStr, -1);
    }

    const updateVoteCounts = (id, change) => {
        // This is going to change ONE track's vote count, but +/- 1
        // Filter the tracks for all t where t.id !== id
        // Filter / change the vote count for t where t.id === id
        // Recombine the results
        console.log('id is ', id)
        const currTrack = getTrackById(id)
        const currCount = getCurrentVotesById(id)
        console.log('\n---------------------------------------------------- Updating vote counts...')
        console.log('Pre - sorted copy, 1st & Last 5 entries = ')
        console.log(tracks.slice(0,5), tracks.slice(-5))

        const updatedTracks = tracks?.map( t => t.track.id != id ? t : ({...t, votes: (currCount + change)}))
        // re-sort tracks
        const sorted = sortByVotes(updatedTracks);
        console.log('Sorted Tracks: ', sorted)
        console.log('Post - sorted tracks, 1st & Last 5 entries = ')
        console.log(sorted.slice(0,5), sorted.slice(-5))


        setTracks(sorted)
};

    // const sortIdsByVotes = (trackIds) => {
    //     const copy = [...trackIds];
    //     console.log('Pre - sorted copy, 1st & Last 2 entries = ')
    //     console.log(copy.slice(0,2), copy.slice(-2))

    //     let votesCopy = [...votes]
    //     votesCopy = votesCopy.sort( (a,b) => a.count < b.count ? 1 : -1 ).map( x => x.trackId );
    //     const unVotedTracks = trackIds.filter( id => !votesCopy.includes(id));
    //     const alltracks = votesCopy.concat(unVotedTracks);

    //     console.log('Post - sorted copy, 1st & Last 2 entries = ')
    //     console.log(alltracks.slice(0,2), alltracks.slice(-2))
    //     console.log('Votes are: ', votesCopy)

    //     return alltracks;
    // }

    const sortByVotes = (tracks) => {
        let copy = [...tracks]
        copy = copy.sort( (a,b) => a.votes <= b.votes ? 1 : -1)

        console.log('unsorted : ', tracks)
        console.log('sorted : ', copy)
        
        return copy
    }


    const nextSong = (i) => {
        setI(i = (i+1) % tracks.length )
        return i
    }


    // window.onSpotifyIframeApiReady = (IFrameAPI) => {
    //     const element = document.getElementById('embed-iframe');
    //     const options = {
    //         width: '100%',
    //         height: '350',
    //         uri: trackIds[0]
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
        // <SpotifyPlayer token={accessToken} ids={[trackIds]} /> 
        // } */}
        // <iframe style={{borderRadius: '12px'}} src={`https://open.spotify.com/embed/track/${trackIds}?utm_source=generator`} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
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
                        {tracks && <iframe  src={`https://open.spotify.com/embed/track/${getPlayListIds()[i]}?utm_source=generator`} width="100%" height="352" frameBorder="0" autoPlay={true} allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>}
                        {/* {tracks && <iframe  src={`https://open.spotify.com/embed/track/${playListIds[i]}?utm_source=generator`} width="100%" height="352" frameBorder="0" autoPlay={true} allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>} */}
                        {/* {tracks && <iframe  src={`https://open.spotify.com/embed/track/${trackIds[i]}?utm_source=generator`} width="100%" height="352" frameBorder="0" autoPlay={true} allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>} */}
                        {/* {tracks && <SpotifyPlayer
                            // onClick={songEnds}
                            token={accessToken}
                            ids={[trackIds[0]]}
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
                </div>
            </div>
            <footer>
                <h6>Made with Love and just enough Hate</h6>
            </footer>
        </div>
    )
}

export default Dashboard