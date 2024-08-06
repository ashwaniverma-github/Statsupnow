'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useToast } from './ui/use-toast';
import SkeletonLoader from './sm-components/feed-skeleton';

type Video = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string };
    };
  };
};

export default function VideoFeed() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      if (session) {
        try {
          const res = await fetch('/api/get-videos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await res.json();

          if (Array.isArray(data)) {
            setVideos(data);
          } else {
            setError('Invalid response');
            toast({ description: 'Enter topics to get your feed' });
          }
          setLoading(false);
        } catch (err) {
          console.error('Error fetching videos:', err);
          setError('Failed to load videos');
          setLoading(false);
        }
      }
    };

    fetchVideos();
  }, [session,toast])

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Recommended Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-card rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-56"
            ></iframe>
            <div className="p-4">
              <h2 className="text-lg font-medium">{video.snippet.title}</h2>
              <p className="text-sm text-gray-600">{video.snippet.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
