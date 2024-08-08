
import dynamic from 'next/dynamic';


const Preferences = dynamic(() => import('../topic'), { ssr: false });

export default Preferences;
