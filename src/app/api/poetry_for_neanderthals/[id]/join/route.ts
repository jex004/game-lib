import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request, context: { params: { id: string } }) {
  const {id:gameId} = await context.params;
  const { playerNick } = await req.json();

  const client = await clientPromise;
  const db = client.db('game-libDB');
  const games = db.collection('game-lib');

  const result = await games.findOneAndUpdate(
    { _id: new ObjectId(gameId),[`players.${playerNick}`]:{$exists:false} },
    {
      $set: { [`players.${playerNick}`]: {name:playerNick,team:null} }
    },
    { returnDocument: 'after' }
  );
  

  return Response.json({ updatedGame: result });
}