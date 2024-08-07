'use client'
import { signIn, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { YoutubeIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Signin() {
    const router = useRouter()
    const { data: session } = useSession()

    if (session) {
        router.push('/dashboard')
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-stone-950 px-4 sm:px-0">
            <div className="flex flex-col items-center p-6 sm:p-20 rounded-2xl shadow-lg space-y-4 bg-zinc-900 w-full max-w-md">
                <YoutubeIcon size={50} className="text-white"/>
                <h1 className="font-bold text-2xl mb-4 text-white">Welcome to Statsupnow</h1>
                <Button onClick={() => {
                    signIn('google', { callbackUrl: '/dashboard' })
                }} className="w-full font-semibold flex items-center justify-center space-x-2">
                    <GoogleIcon className="h-5 w-5" />
                    <span>Continue with Google</span>
                </Button>
            </div>
        </div>
    )
}

function GoogleIcon(props: any) {
    return (
        <Image src="/g.svg" alt="Google icon" width={20} height={20} {...props} />
    )
}
