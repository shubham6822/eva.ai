import { Button } from '@/components/ui/button';
import {
  ConnectionStateToast,
  LiveKitRoom,
  RoomAudioRenderer,
  useLocalParticipant,
  useRoomContext,
} from '@livekit/components-react';
import '@livekit/components-styles';
import { MediaDeviceFailure } from 'livekit-client';
import { Loader2, Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { useEffect, useState } from 'react';

// Define types for room details
interface RoomDetails {
  roomName: string;
  token: string;
}

export default function Playground() {
  const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
  const [shouldConnect, setShouldConnect] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      setError(null);
      // Generate a unique user ID
      const userId = `user_${Date.now()}`
      const response = await fetch(`${import.meta.env.VITE_API_URL}/generate-token?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to connect to voice agent');
      }
      
      const data: RoomDetails = await response.json();
      setRoomDetails(data);
      setShouldConnect(true);
    } catch (err: any) {
      setError(err.message || 'Failed to connect. Please try again.');
      setShouldConnect(false);
    } finally {
      setIsLoading(false);
    }
  };

  const onDeviceFailure = (e?: MediaDeviceFailure) => {
    console.error('Media device failure:', e);
    setError('Please grant microphone access and reload.');
    setShouldConnect(false);
  };

  const handleDisconnect = () => {
    setShouldConnect(false);
    setRoomDetails(null);
    setError(null);
  };
console.log('Render Playground:', roomDetails);
  return (
    <div className="h-full flex items-center justify-center p-6">
      <div className="bg-linear-to-b from-background to-muted/30 border rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Voice Assistant</h1>
          <p className="text-muted-foreground">
            {shouldConnect && roomDetails 
              ? 'You are now connected' 
              : 'Connect to our AI voice assistant for a conversation'}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center min-h-100">
          {!shouldConnect || !roomDetails ? (
            <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
              <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-16 h-16 text-primary" />
              </div>
              
              <Button
                onClick={handleConnect}
                disabled={isLoading}
                size="lg"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Phone className="mr-2 h-4 w-4" />
                    Connect to Voice Agent
                  </>
                )}
              </Button>
              
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md w-full">
                  <p className="text-destructive text-sm text-center">{error}</p>
                </div>
              )}
            </div>
          ) : (
            <LiveKitRoom
              data-lk-theme="default"
              audio={true}
              video={false}
              token={roomDetails.token}
              connect={shouldConnect}
              serverUrl={import.meta.env.VITE_LIVEKIT_URL}
              onMediaDeviceFailure={onDeviceFailure}
              onDisconnected={handleDisconnect}
              className="w-full space-y-6"
            >
              <ConnectionStatus />
              <VoiceVisualizerWrapper />
              <ControlBar onDisconnect={handleDisconnect} />
              <RoomAudioRenderer />
              <ConnectionStateToast />
            </LiveKitRoom>
          )}
        </div>
      </div>
    </div>
  );
}

function ConnectionStatus() {
  const room = useRoomContext();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (room) {
      setIsConnected(room.state === 'connected');
    }
  }, [room]);

  return (
    <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg text-center">
      <div className="flex items-center justify-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
        <p className="text-sm font-medium">
          {isConnected ? 'Connected to AI Voice Assistant' : 'Connecting...'}
        </p>
      </div>
    </div>
  );
}

function VoiceVisualizerWrapper() {
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    // Simulate audio level for visualization
    const interval = setInterval(() => {
      setAudioLevel(Math.random() * 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-48 bg-linear-to-br from-primary/5 to-primary/10 border border-primary/10 rounded-lg flex items-center justify-center relative overflow-hidden">
      <div className="flex items-end gap-1 h-24">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-2 bg-primary rounded-full transition-all duration-100"
            style={{
              height: `${Math.max(8, (Math.sin(audioLevel / 10 + i) + 1) * 40)}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ControlBar({ onDisconnect }: { onDisconnect: () => void }) {
  const { localParticipant } = useLocalParticipant();
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = async () => {
    if (localParticipant) {
      const newMutedState = !isMuted;
      await localParticipant.setMicrophoneEnabled(!newMutedState);
      setIsMuted(newMutedState);
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-4">
      <Button
        onClick={toggleMute}
        size="lg"
        variant={isMuted ? 'destructive' : 'default'}
        className="min-w-35"
      >
        {isMuted ? (
          <>
            <MicOff className="mr-2 h-4 w-4" />
            Unmute
          </>
        ) : (
          <>
            <Mic className="mr-2 h-4 w-4" />
            Mute
          </>
        )}
      </Button>
      
      <Button
        onClick={onDisconnect}
        size="lg"
        variant="destructive"
        className="min-w-35"
      >
        <PhoneOff className="mr-2 h-4 w-4" />
        End Call
      </Button>
    </div>
  );
}