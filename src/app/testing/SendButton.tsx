'use client';
import { useState } from 'react';
export default function SendButton() {

const [text, setText] = useState('');


  const send = async () => {
    if (!text.trim()) return;
    await fetch('/api/testing/send', {
      method: 'POST',
      body: JSON.stringify({ message: text  }),
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