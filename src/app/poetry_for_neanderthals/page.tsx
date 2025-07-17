'use client';

import { useState, useEffect } from 'react';
import PusherClient from './PusherClient';
import SendButton from './SendButton';
import ConsoleBox from './ConsoleBox';

import { useRouter } from 'next/navigation';

// import {createGame} from './Game';

export default function TestingPage() {
    
const [message, setMessage] = useState('');

const [logs, setLogs] = useState<string[]>([]);
const [nick, setNick] = useState('');
const [roomName, setRoomName] = useState('');

  const router = useRouter();


  const addLog = (log: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${log}`]);
  };

  const createGame=async ()=>{
    
    if (!roomName.trim()||localStorage.getItem("nickname") == null) return;
    
addLog("creating new game("+roomName+")");
    const data = {
      name: roomName,
      initialState: { /* your initial state object */ },
    };

  const res = await fetch('/api/poetry_for_neanderthals/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create game');
  }

  const json = await res.json();
  console.log('Created game ID:', json.gameId);
        
addLog("created game("+roomName+") -> ID:" + json.gameId);
  router.push(`/poetry_for_neanderthals/${json.gameId}`);
  };




  const setNickname=()=>{
    if (!nick.trim()) return;
    localStorage.setItem("nickname",nick);
    addLog("Set Nickname -> "+nick);
  }

  useEffect(() => {
    const storedName = localStorage.getItem('nickname');
    if (storedName) {
      setNick(storedName);
    }
  }, []);
// console.log({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
// });

  return (
    <div>
        <h1>uwu{Date.now()}</h1>
      <h1>Poetry For Neanderthals!!! Create a Game</h1>
      <h1>Test:{message}</h1>
      <ConsoleBox messages={logs}/>
      <br/>
      {/* <input
        type="text"
        value={nick}
        onChange={(e) => setNick(e.target.value)}
        placeholder="Type your nickname :)"
        />

        <br/>
        <button style={{ display: 'block', color:"#ff0000", backgroundColor :"#ddaa00" }} onClick={setNickname}>Set Nickname</button>
        <br/> */}
        <br/>
        <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Type room name :)"
        />
      <br/>
      <button style={{ display: 'block', color:"#ff0000", backgroundColor :"#ddaa00" }} onClick={createGame}>Create Room</button>

      <br/><br/><br/><br/><br/><br/><br/>
      <SendButton />
      <PusherClient onMessage={addLog} />
    </div>
  );
}
