'use client';

//import { useState } from 'react';
import PusherClient from './PusherClient';
import SendButton from './SendButton';


export default function TestingPage() {
    
//const [message, setMessage] = useState('');


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
      <SendButton />
      <PusherClient /*onMessage={setMessage}*/ />
    </div>
  );
}
