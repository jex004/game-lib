// app/api/send/route.ts
import { pusher } from '@/lib/pusher';
import { NextResponse } from 'next/server';

export async function POST(req: Request, {params}: { params: { id: string } }) {
  const {id:gameId} = await params;
  const { message } = await req.json();

  await pusher.trigger('my-channel', 'chat-'+gameId, {
    message,
  });

  return NextResponse.json({ success: true });
}