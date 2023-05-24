// pages/api/folder/[folderId].js
import archidekt from 'archidekt';
import cors from 'cors';
import "babel-polyfill";

const allowlist = ['https://dollarydo.vercel.app'];
const corsOptionsDelegate = function(req, callback) {
  let corsOptions;
  // console.log(req);
  corsOptions = { origin: true };
  // if (allowlist.indexOf(req.rawHeaders('Origin')) !== -1) {
  //   corsOptions = { origin: true };
  // } else {
  //   corsOptions = { origin: false };
  // }
  callback(null, corsOptions);
};

export default async function handler(req, res) {
  // await cors(corsOptionsDelegate)(req, res);

  if (req.method === 'GET') {
    const folderId = req.query.folderId;
    const folderUri = `${archidekt.api.getUri()}decks/folders/${folderId}/?dir=asc&orderBy=name`;
    const response = await archidekt.api.request(folderUri);
    res.status(200).json(response.data.decks);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}