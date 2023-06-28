import { io } from "socket.io-client";


//👇🏻 http://localhost:4000 is where the server host URL.

const socket = io.connect("http://localhost:3000");

socket.on("update", (candidates) => {
    candidates = Object.entries(candidates);
    for (const [key, candidate] of candidates){
        if(typeof)
    }
})


function App() {

    return (

        <div>

            <p>Hello World!</p>

        </div>

    );

}

export default App;