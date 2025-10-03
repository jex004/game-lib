import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request, {params}: { params: Promise<{ id: string }> }) {
  const {id:gameId} = await params;
  const { teamName } = await req.json();

  const client = await clientPromise;
  const db = client.db('game-libDB');
  const games = db.collection('game-lib');


  const game= await games.findOne({ _id: new ObjectId(gameId) });
    

  const result = await games.findOneAndUpdate(
      { _id: new ObjectId(gameId) },
      {
        $set : {
            [`teams.${teamName}`]:{name:teamName,players:[]} as any,
            teamCount:game!.teamCount+1
        }
      },
      
    { returnDocument: 'after' }
    );
  

  return Response.json({ updatedGame: result });
}