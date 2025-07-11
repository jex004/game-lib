// app/api/send/route.ts
import { pusher } from '@/lib/pusher';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { message } = await req.json();

  await pusher.trigger('my-channel', 'my-event', {
    message,
  });

  return NextResponse.json({ success: true });
}