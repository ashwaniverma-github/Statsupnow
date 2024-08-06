'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import { useEffect, useState } from "react"
import TesterForm from "@/components/testerForm"
export default function Homepage(){
    
    const router = useRouter()

   
    return (
        <div className="">
            <div className="navbar">
                <div className="navbar-start">
                    <h1 className="font-bold text-xl m-4 font-kalnia-glaze">Statsupnow</h1>
                </div>
                <div className="">
                    <div className=" px-10">
                        <button className="font-semibold" onClick={()=>{alert('we are free for now')}} >Pricing</button>
                    </div>
                </div>
                <div className="navbar-end m-5">
                    <Button className="text-lg" onClick={() => router.push('/signin')}>
                        Signin
                    </Button>
                </div>
            </div>
            <TesterForm/>
            <div className="hero mt-10 text-center font-kalnia-glaze">
                <motion.header 
                    className="text-5xl font-semibold" 
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    Learn What Matters
                </motion.header>
            </div>
            <div className="text-center pt-5 text-style">
                <motion.h1 
                    className="text-2xl" 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
                >
                    Manage your youtube user account with Stats <br/> to improve your youtube experience
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
