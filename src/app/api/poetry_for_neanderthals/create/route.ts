import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, initialState } = body;

  const client = await clientPromise;
  const db = client.db('game-libDB');
  const games = db.collection('game-lib');

  const game = {
    name,
    players: [],
    teamCount: 2,
    teams:[{name:"glad",players:[]},{name:"mad",players:[]}],
    points:[0,0],
    cardHistory:[],
    state: initialState,
    createdAt: new Date(),
    status: 'waiting',
  };

  const result = await games.insertOne(game);

  return Response.json({ gameId: result.insertedId });
}