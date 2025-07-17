'use client';
import { useState } from 'react';
export default function SendButton({nick,roomId}:{nick:string,roomId:string}) {

const [text, setText] = useState('');


  const send = async () => {
    if (!text.trim()) return;
    
    await fetch(`/api/poetry_for_neanderthals/${roomId}/chat`, {
      method: 'POST',
      body: JSON.stringify({ message: nick+": "+text  }),
    });
  };

  return (
    <div>
        <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message"
        />
        <button style={{ display: 'block', color:"#ffaaaa", backgroundColor :"#aaaaaa" }} onClick={send}>Send Message</button>
    </div>
    );
}