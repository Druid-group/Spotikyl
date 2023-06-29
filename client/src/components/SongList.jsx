import { io } from "socket.io-client";


//👇🏻 http://localhost:4000 is where the server host URL.

const socket = io.connect("http://localhost:3000");
// put in useEffect on component
socket.on("update", ({index, vote}) => {
    
})


function SongList() {

    return (

        <div>

            <p>Hello World!</p>

        </div>

    );

}

export default App;