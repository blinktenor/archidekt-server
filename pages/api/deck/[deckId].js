// pages/api/decks/[deckId].js
import archidekt from 'archidekt';
import "babel-polyfill";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const deckId = req.query.deckId;
    console.log(deckId);
    const response = await archidekt.fetchDeckById(deckId);
    res.status(200).json(response.data);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}