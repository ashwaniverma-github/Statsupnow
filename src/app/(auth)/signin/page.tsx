'use client'
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { YoutubeIcon  } from "lucide-react"




export default function Signin(){
    return <div className="flex justify-center items-center min-h-screen bg-stone-950" >
        <div className=" flex flex-col items-center p-20 rounded-2xl shadow-lg space-y-4 bg-zinc-900 bg-car ">
            <YoutubeIcon size={50}/>
            <h1 className=" font-bold text-2xl mb-4 " >Welcome to Detoxify</h1>
            <Button onClick={()=>{
            signIn('google',{callbackUrl:'/dashboard'})
        }}   className="w-full font-semibold ">  <GoogleIcon className="h-5 w-5 mx-1" /> <span>Continue with Google</span></Button>
        </div>
        
        
    </div>
}


function GoogleIcon(props:any) {
    return (
        <img src="/g.svg" alt="Google icon" {...props} />
    )
}