// dynamicSubscriptions.tsx
import dynamic from 'next/dynamic';


const Subscriptions = dynamic(() => import('../subscription'), { ssr: false });

export default Subscriptions;
