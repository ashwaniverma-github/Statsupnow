import prisma from "../../../../prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
export async function GET(){
    const session = await getServerSession(authOptions)
    try{
        const data = await prisma.user.findUnique({
            where:{email:session?.user.email},

            include:{preferences:true}



        })

        return Response.json(data?.preferences)
    }catch(error){
        console.error(error)
    }
}