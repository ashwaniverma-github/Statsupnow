import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { google, youtube_v3 } from "googleapis";

type SubscriptionItem = youtube_v3.Schema$Subscription;
type SubscriptionListResponse = youtube_v3.Schema$SubscriptionListResponse;

export async function POST() {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    try {
        let subscriptions: SubscriptionItem[] = [];
        let nextPageToken: string | null | undefined = null;

        do {
            const response = await youtube.subscriptions.list({
                part: ['snippet'],
                mine: true,
                maxResults: 1000,
                pageToken: nextPageToken || undefined,
            });

            const data: SubscriptionListResponse = response.data;
            const items: SubscriptionItem[] = data.items || [];
            subscriptions = subscriptions.concat(items);
            nextPageToken = data.nextPageToken;

        } while (nextPageToken);

        return new Response(JSON.stringify(subscriptions), { status: 200 });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "error" }), { status: 500 });
    }
}
