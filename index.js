const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//creates the server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  // Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

//getsonglist
apiRouter.get('/songList', (_req, res) => {
  res.send(songList);
});

//Submit songList
apiRouter.get('/songList', (_req, res) => {
  song = updateSongList(req.body, songList);
  res.send(songList);
});

//sumbmitNewSong
apiRouter.get('/songList', (_req, res) => {
  songList = addSong(req.body, );
  res.send(song);
});

let songList = [];

function updateSongList(newSong, songList) {
  let found = false;
  for (const [i, prevList] of songList.entries()) {
    if (newSong.songList > prevList.songList) {
      songList.splice(i, 0, newSong);
      found = true;
      break;
    }
  }

  if (!found) {
    songList.push(newSong);
  }

  return scores;
}
