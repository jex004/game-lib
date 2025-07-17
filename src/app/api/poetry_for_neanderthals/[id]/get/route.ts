import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function GET(req: Request, context: { params: { id: string } }) {
  const {id:gameId} = await context.params;

  const client = await clientPromise;
  const db = client.db('game-libDB');
  const games = db.collection('game-lib');


  const game= await games.findOne({ _id: new ObjectId(gameId) });


  return Response.json({ game });
}