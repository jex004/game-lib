'use client';

import { useState } from 'react';
import PusherClient from './PusherClient';
import SendButton from './SendButton';
import game from '@/lib/testing/singletontest';


export default function TestingPage() {
    
const [message, setMessage] = useState('');
const quickOnMsg=(msg:string)=>{
    game.msgs=game.msgs+msg;
    setMessage(game.msgs);
};

// console.log({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: process.env.PUSHER_CLUSTER,
// });

  return (
    <div>
        <h1>uwu{Date.now()}</h1>
      <h1>Realtime Messaging Test</h1>
      <h1>Test:{message}</h1>
      <SendButton />
      <PusherClient onMessage={quickOnMsg} />
    </div>
  );
}
