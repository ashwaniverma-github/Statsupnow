'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "./ui/button"
import { Loader } from "lucide-react"

interface Preference {
  id: string;
  userId: string;
  topics: string[];
}

export default function Topics() {
    const { data: session } = useSession()
    const [preferences, setPreferences] = useState<Preference[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    async function getTopics() {
        setLoading(true)
        try {
            const response = await fetch('/api/get-preference')
            const topicData: Preference[] = await response.json()
            setPreferences(topicData)
        } catch (error) {
            console.error("Error fetching topics:", error)
        } finally {
            setLoading(false)
        }
    }

    if (!session) {
        return <h1>Not authenticated</h1>
    }

    return (
        <div className="m-5">
            <Button onClick={getTopics} disabled={loading}>
                {loading ? (
                    <>
                        <Loader className="animate-spin mr-2" />
                        Loading
                    </>
                ) : (
                    "Saved Topics"
                )}
            </Button>
            <div className="mt-5">
                {preferences.length > 0 ? (
                    preferences.map((preference) => (
                        <ul key={preference.id}>
                            {preference.topics.map((topic, topicIndex) => (
                                <li className="font-serif" key={topicIndex}>{topic}</li>
                            ))}
                        </ul>
                    ))
                ) : (
                    <p>No topics saved</p>
                )}
            </div>
        </div>
    )
}
