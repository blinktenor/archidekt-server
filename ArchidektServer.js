const express = require('express');
const app = express();
const port = 80;
const archidekt = require('archidekt');
require("regenerator-runtime/runtime");
const cors = require('cors')

var allowlist = ['https://dollarydo.vercel.app']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  console.log(req.header('Origin'));
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.get('/folder/:folderId', (req, res) => {
  //console.log(res);
  //res.send(req.params.folderId)
  console.log(archidekt.default.api.getUri());
  //const response = await axios.get(`https://www.archidekt.com/api/decks/folders/${folderId}/?dir=asc&orderBy=name`);
  //const decks = archidekt.default.fetchFolderById(req.params.folderId, small=true)
  const folderUri = `${archidekt.default.api.getUri()}decks/folders/${req.params.folderId}/?dir=asc&orderBy=name`;
  console.log(folderUri);
  const decks = archidekt.default.api.request(folderUri);
  res.send(decks);
})

app.get('/decks/:deckId', async (req, res) => {
  const deckId = req.params.deckId;
  const response = await archidekt.default.fetchDeckById(deckId);
  res.send(JSON.stringify(response.data)); 
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})