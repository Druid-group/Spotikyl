
const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();
const SpotifyWebApi = require('spotify-web-api-node')
const port = process.env.PORT;

const redURi = process.env.URI
const clientId = process.env.CID
const clientS = process.env.CS


require("./config/mongoose.config");

app.use(cors())
app.use(bodyParser.json())
app.use(express.json(), express.urlencoded({ extended: true }), cors());

// const AllMyUserRoutes = require("./routes/user.routes");
// AllMyUserRoutes(app);


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

app.listen(port, () => console.log(`Listening on port: ${port}`));

// app.get('/login', function (req, res) {
    
//     var state = generateRandomString(16);
//     var scope = 'user-read-private user-read-email';

//     res.redirect('https://accounts.spotify.com/authorize?' +
//         querystring.stringify({
//             response_type: 'code',
//             client_id: client_id,
//             scope: scope,
//             redirect_uri: redirect_uri,
//             state: state
//         }));
// });

