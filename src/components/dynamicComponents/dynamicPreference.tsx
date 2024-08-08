
import dynamic from 'next/dynamic';


const Preferences = dynamic(() => import('../topic'), { ssr: true });

export default Preferences;
