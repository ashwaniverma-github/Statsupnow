import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface UnsubscribeButtonProps {
  subscriptionId: string;
  onComplete: () => void;
}

export default function UnsubscribeButton({ subscriptionId, onComplete }: UnsubscribeButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleUnsubscribe = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analytics/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId }),
      });

      if (response.ok) {
        onComplete();
      } else {
        console.error('Failed to unsubscribe');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleUnsubscribe} disabled={loading}>
      {loading ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        'Unsubscribe'
      )}
    </Button>
  );
}
