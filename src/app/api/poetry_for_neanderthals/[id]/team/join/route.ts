import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request, {params}: { params: Promise<{ id: string }> }) {
  const {id:gameId} = await params;
  const { playerNick, team } = await req.json();

  const client = await clientPromise;
  const db = client.db('game-libDB');
  const games = db.collection('game-lib');


  const game= await games.findOne({ _id: new ObjectId(gameId) });



  const updateData:any={};
  if(game!&&team!=game.players?.[playerNick]?.team){

    updateData.$push= { [`teams.${team}.players`]: playerNick};


    updateData.$set={ [`players.${playerNick}.team`]:team };


console.log("prev team "+game.players?.[playerNick]?.team);
    if(game.players?.[playerNick]?.team!=null&&game.players?.[playerNick]?.team.length>0&&game.players?.[playerNick]?.team!=team){
      console.log("removed from team "+game.players?.[playerNick]?.team);
      updateData.$pull= { [`teams.${game.players?.[playerNick]?.team}.players`]: playerNick };
    }
    
  }
  const result = await games.findOneAndUpdate(
      { _id: new ObjectId(gameId) },
      updateData,
      
    { returnDocument: 'after' }
    );
  

  return Response.json({ updatedGame: result });
}