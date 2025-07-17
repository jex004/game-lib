'use client';
import { useEffect, useRef } from 'react';

export default function ConsoleBox({ messages }: { messages: string[] }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div
      className="bg-black text-green-400 font-mono p-4 rounded-lg shadow-lg"
      style={{
        height: '480px',
        overflowY: 'auto',
        border: '1px solid #444',
        backgroundColor: '#111',
      }}
    >
      {messages.map((msg, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {msg}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}