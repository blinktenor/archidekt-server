const express = require('express');
const app = express();
const port = 8080;
const archidekt = require('archidekt');
require("regenerator-runtime/runtime");
const cors = require('cors')

app.use(cors())

function censor(censor) {
  var i = 0;
  
  return function(key, value) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
      return '[Circular]'; 
    
    if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
      return '[Unknown]';
    
    ++i; // so we know we aren't using the original object anymore
    
    return value;  
  }
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
  console.log(response.data);
  res.write(JSON.stringify(response.data));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})