'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import TesterForm from "@/components/testerForm"

export default function Homepage(){
    const router = useRouter()

    return (
        <div className="flex flex-col min-h-screen">
            <div className="navbar flex justify-between items-center p-4">
                <div className="flex-1">
                    <h1 className="font-bold text-xl m-4 ">Statsupnow</h1>
                </div>
                <div className="hidden  px-10">
                    <button className="font-semibold" onClick={()=>{alert('we are free for now')}}>Pricing</button>
                </div>
                <div className="flex-none">
                    <Button className="text-lg" onClick={() => router.push('/signin')}>
                        Sign in
                    </Button>
                </div>
            </div>
            <TesterForm />
            <div className="hero mt-10 text-center font-kalnia-glaze">
                <motion.header 
                    className="text-3xl sm:text-5xl font-semibold" 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    Learn What Matters
                </motion.header>
            </div>
            <div className="text-center pt-5 font-mono text-wrap">
                <motion.h1 
                    className="text-lg sm:text-2xl" 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                >
                'Manage your YouTube user account for better focus'<br className="hidden sm:block"/> Unsubscribe to unnecessary channels
                </motion.h1>
            </div>
            <div className="text-center m-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
                >
                    <Button className="font-bold text-lg" onClick={() => router.push('/signin')}>
                        Get Started
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}
