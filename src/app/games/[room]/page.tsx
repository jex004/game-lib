"use client";

import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import styles from "./page.module.css";

interface Move {
  player: string;
  cardId: number;
  time: number;
}

export default function GamePage({ params }: { params: { room: string } }) {
  const { room } = params;
  const [moves, setMoves] = useState<Move[]>([]);

  useEffect(() => {
    const p = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
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

  const sendMove = () => {
    fetch("/api/play", {
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
    <div className={styles.container}>
      <h1>Room: {room}</h1>
      <ul className={styles.log}>
        {moves.map((m, i) => (
          <li key={i}>
            {m.player} played card #{m.cardId} at {new Date(m.time).toLocaleTimeString()}
          </li>
        ))}
      </ul>
      <button className={styles.button} onClick={sendMove}>
        Send Move
      </button>
    </div>
  );
}
