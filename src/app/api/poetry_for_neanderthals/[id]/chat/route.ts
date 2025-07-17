// app/api/send/route.ts
import { pusher } from '@/lib/pusher';
import { NextResponse } from 'next/server';

export async function POST(req: Request, context: { params: { id: string } }) {
  const {id:gameId} = await context.params;
  const { message } = await req.json();

  await pusher.trigger('my-channel', 'chat-'+gameId, {
    message,
  });

  return NextResponse.json({ success: true });
}