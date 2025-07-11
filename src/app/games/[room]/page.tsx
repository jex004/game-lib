"use client";

import { useState, useEffect, type FC } from "react"; // Import FC for explicit typing
import Pusher from "pusher-js";

// Define an interface for the component's props.
interface GamePageProps {
  params: {
    room: string;
  };
}

interface Move {
  player: string;
  cardId: number;
  time: number;
}

// Define the component as a const with an explicit FC<GamePageProps> type.
// This is a robust way to type components and resolves the inference issue.
const GamePage: FC<GamePageProps> = ({ params }) => {
  const { room } = params;
  const [moves, setMoves] = useState<Move[]>([]);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_PUSHER_KEY || !process.env.NEXT_PUBLIC_PUSHER_CLUSTER) {
      console.error("Pusher environment variables are not set.");
      return;
    }

    const p = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    });
    const channel = p.subscribe(`room-${room}`);

    channel.bind("move", (data: Move) => {
      setMoves((prev) => [...prev, data]);
    });

    return () => {
      channel.unbind_all();
      p.unsubscribe(`room-${room}`);
      p.disconnect();
    };
  }, [room]);

  const sendMove = async () => {
    await fetch("/api/play", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room,
        event: "move",
        payload: { player: "You", cardId: Math.floor(Math.random() * 52), time: Date.now() },
      }),
    });
  };

  return (
    <div className="max-w-lg mx-auto my-8 p-4 border rounded-lg bg-white dark:bg-black text-foreground">
      <h1 className="text-2xl font-bold mb-4">Room: {room}</h1>
      <ul className="list-none p-2 mb-4 max-h-40 overflow-y-auto border rounded bg-white dark:bg-gray-900">
        {moves.length > 0 ? (
          moves.map((m, i) => (
            <li key={i} className="bg-gray-100 dark:bg-gray-800 p-2 mb-1 rounded text-sm">
              {m.player} played card #{m.cardId} at {new Date(m.time).toLocaleTimeString()}
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">No moves yet.</li>
        )}
      </ul>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full font-semibold"
        onClick={sendMove}
      >
        Send Move
      </button>
    </div>
  );
};

export default GamePage;