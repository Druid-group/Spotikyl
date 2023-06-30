
const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node')
const port = 8000;
const http = require("http").Server(app);
const {Server} = require('socket.io') 

const redURi = process.env.URI
const clientId = process.env.CID
const clientS = process.env.CS


// require("./config/mongoose.config");

app.use(cors())
app.use(bodyParser.json())
app.use(express.json(), express.urlencoded({ extended: true }), cors());
app.use(express.static("client"));

// const AllMyUserRoutes = require("./routes/user.routes");


app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });

});

app.post('/login', (req, res) => {
    const code = req.body.code
    // console.log(code, req.body, req.params, req.query)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: redURi,
        clientId: clientId,
        clientSecret: clientS
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err) => {
        // console.log(err)
        res.sendStatus(400)
    })
})

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken,
    })

    spotifyApi.refreshAccessToken().then(data => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            })
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(400)
        })
})

const io = new Server({cors: {
    origin: "http://localhost:3000"
}})

io.on("connection", (socket) => {

    socket.on("vote", ({songId, vote}) => {
        console.log(
            socket.id,
            songId,
            vote
        )
        
        socket.broadcast.emit("update", { songId, vote });
    });
})

const server = app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

io.attach(server)




