import type { Request, Response } from "express";
import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';
import { v4 as uuid } from 'uuid';

export const getToken = async (req:Request, res:Response) => {
  try {
    const livekitUrl = process.env.LIVEKIT_URL 
    const livekitApiKey = process.env.LIVEKIT_API_KEY 
    const livekitApiSecret = process.env.LIVEKIT_API_SECRET

    if (!livekitUrl || !livekitApiKey || !livekitApiSecret) return res.status(500).json({ error: 'LiveKit configuration is missing' });

    const roomName = uuid();
    const roomClient = new RoomServiceClient(livekitUrl, livekitApiKey, livekitApiSecret);

    const grant = {
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    }

    const accessToken = new AccessToken(livekitApiKey,livekitApiSecret,{ identity: uuid() });
    accessToken.addGrant(grant);
    const token = await accessToken.toJwt();

    await res.json({ token, roomName });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}