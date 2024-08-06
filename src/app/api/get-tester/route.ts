import prisma from "../../../../prisma/db";

export async function POST(req:Request) {
    const {email} = await req.json()
    try{
        const user = await prisma.user.findUnique({
            where:{email:email}
        })
        if(!user){
            const tester = await prisma.tester.create({
                data:{email:email}
            })
            return Response.json({message:"email saved successfully"})
        } 

        return Response.json({message:"email already exist"})

    }catch(err){
        console.error(err)
    }
}