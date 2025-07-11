import { NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId:   process.env.PUSHER_APP_ID!,
  key:     process.env.PUSHER_KEY!,
  secret:  process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS:  true,
});

export async function POST(request: Request) {
  const { room, event, payload } = await request.json();
  // ── broadcasts your game event on channel `room-<room>`
  await pusher.trigger(`room-${room}`, event, payload);
  return NextResponse.json({ success: true });
}