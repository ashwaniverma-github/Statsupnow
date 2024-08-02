import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { google } from "googleapis";

export async function  POST(){
    const session =  await getServerSession(authOptions)

    if(!session || !session.accessToken){
        return Response.json({message:"Unauthorized"})
    }

    const oauth2Client = new google.auth.OAuth2()
    oauth2Client.setCredentials({access_token:session.accessToken})

    const youtube = google.youtube({version:'v3',auth:oauth2Client})

    try{

        const response = await youtube.subscriptions.list({
            part:['snippet'],
            mine:true,
            maxResults:1000
        })

        
        const subscriptions = (await response).data.items||[]
        return Response.json(subscriptions)


    }catch(err){
        console.error(err)
        return Response.json({message:"error"})
    }

    

}