import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, initialState } = body;

  const client = await clientPromise;
  const db = client.db('game-libDB');
  const games = db.collection('game-lib');

  const game = {
    name,
    players: {},
    teamCount: 2,
    teams:{glad:{name:"glad",players:[]},mad:{name:"mad",players:[]}},
    turnOrder:[],
    currentTurn:0,
    shuffledDeck:[],
    currentDeckCard:0,
    points:[0,0],
    cardHistory:[],
    state: initialState,
    createdAt: new Date(),
    status: 'waiting',
  };

  const result = await games.insertOne(game);

  return Response.json({ gameId: result.insertedId, game });
}