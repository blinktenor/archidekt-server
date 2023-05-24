// pages/api/folder/[folderId].js
import archidekt from 'archidekt';
import cors from 'cors';
import "babel-polyfill";

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

async function handler(req, res) {
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

export default allowCors(handler);