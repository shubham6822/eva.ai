import type { Request, Response } from "express";
import { AccessToken, RoomServiceClient } from "livekit-server-sdk";
import { v4 as uuid } from "uuid";

export const getToken = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const apiKey = process.env.LIVEKIT_API_KEY!;
    const apiSecret = process.env.LIVEKIT_API_SECRET!;
    const host = process.env.LIVEKIT_URL!;

    const roomName = uuid();

    const roomService = new RoomServiceClient(
      host,
      apiKey,
      apiSecret
    );

    await roomService.createRoom({ name: roomName });

    const accessToken = new AccessToken(apiKey, apiSecret, {
      identity: userId,
    });

    accessToken.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      canPublishData: true,
    });

    const token = await accessToken.toJwt();

    res.json({
      token,
      roomName,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};