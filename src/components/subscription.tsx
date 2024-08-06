'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import UnsubscribeButton from './sm-components/unsubscribeButton';
import Image from 'next/image';

type Subscription = {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
};

export default function Subscriptions() {
  const { data:session } = useSession();
  const [channels, setChannels] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptions = useCallback(async () => {
    if (session) {
      try {
        const res = await fetch('/api/analytics/get-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();

        if (Array.isArray(data)) {
          setChannels(data);
        } else {
          setError('Invalid response format');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setError('Failed to load subscriptions');
        setLoading(false);
      }
    }
  }, [session]);

  useEffect(() => {
    fetchSubscriptions();
  }, [session, fetchSubscriptions]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        <span>Loading...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Subscribed Channels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {channels.map((channel) => (
          <div key={channel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={channel.snippet.thumbnails.medium.url}
              alt={channel.snippet.title}
              className="w-full h-48 object-cover"
              
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-black">{channel.snippet.title}</h2>
              <p className="text-sm text-gray-600">
                {channel.snippet.description.slice(0, channel.snippet.description.indexOf('.'))}
              </p>
              <div className="mt-4">
                <UnsubscribeButton subscriptionId={channel.id} onComplete={fetchSubscriptions} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
