'use client';

import axios from 'axios';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

type SubscribeButtonProps = {
  channelId: string;
  onComplete: () => void;
};

export default function SubscribeButton({ channelId, onComplete }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      await axios.post('/api/subscribe', { channelId });
      onComplete();
    } catch (error) {
      console.error('Failed to subscribe to channel:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSubscribe} disabled={loading}>
      {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : 'Subscribe'}
    </Button>
  );
}
