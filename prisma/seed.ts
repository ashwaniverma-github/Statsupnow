import prisma from "./db";

async function main(){
    const user = await prisma.user.upsert({
        where:{email:"dummyUser@gmail.com"},
        update:{},
        create:{
            email:"dummyUser@gmail.com",
            name:"DummyUser",
            image:"whocares",

            preferences:{
                create:{
                    topics:["gaming","coding","hard working"]
                }
            }
        }
        
        
    })
    console.log(user)
}
main()
.then(async()=>{
    await prisma.$disconnect()
})
.catch(async(e)=>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
