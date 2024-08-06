import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import prisma from "../../../../prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
        return Response.json({ error: "User not signed in or email not available" }, { status: 401 });
    }

    try {
        const { preferences } = await req.json();
        
        // Ensure preferences is an array of strings
        if (!Array.isArray(preferences)) {
            return Response.json({ error: "Invalid data format. Expected an array of topics." }, { status: 400 });
        }

        // Find the user's existing preferences
        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { preferences: true }
        });

        if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
        }

        if (user.preferences.length > 0) {
            // Update the existing preferences
            await prisma.preference.update({
                where: { id: user.preferences[0].id },
                data: { topics: preferences }
            });
        } else {
            // Create new preferences if they don't exist
            await prisma.preference.create({
                data: {
                    userId: user.id,
                    topics: preferences
                }
            });
        }

        return Response.json({ success: true });
    } catch (e) {
        console.error(e);
        return Response.json({ error: "An error occurred while updating preferences" }, { status: 500 });
    }
}
