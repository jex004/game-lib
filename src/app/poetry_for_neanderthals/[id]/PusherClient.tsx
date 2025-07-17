'use client';

import { useEffect } from 'react';
import Pusher from 'pusher-js';

export default function PusherClient({ onMessage, roomId }: { onMessage: (msg: string) => void , roomId:string}) {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusher.subscribe('my-channel');

    channel.bind('chat-'+roomId, (data: any) => {
      onMessage(data.message);
    console.log(data.message);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return <div>Listening for messages... (check console)</div>;
}