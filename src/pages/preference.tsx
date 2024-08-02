'use client'
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader2, X } from "lucide-react"
import Topics from "@/components/saved-topics"

export default function PreferenceInput() {
    const { toast } = useToast()
    const [currentPreference, setCurrentPreference] = useState<string>("");
    const [preferences, setPreferences] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPreference(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentPreference.trim() !== "") {
            setPreferences([...preferences, currentPreference.trim()]);
            setCurrentPreference("");
        }
    };

    const handleRemovePreference = (index: number) => {
        const newPreferences = preferences.filter((_, i) => i !== index);
        setPreferences(newPreferences);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/set-preference', { preferences });
            setLoading(false);
            if (response.data) {
                toast({ description: "Preferences saved successfully" });
            }
        } catch (err) {
            setLoading(false);
            console.error(err);
            toast({ description: "Error saving preferences" });
        }
        setPreferences([]);
    };

    return (
        <div>
            <div className="text-center">
                <h1 className="font-semibold font-mono">What do you want to learn?</h1>
            </div>
            <div className="flex flex-col justify-center m-5">
                <div className="m-5">
                    <h1 className="m-2 font-thin" >Enter New Topics</h1>
                    <Input 
                        placeholder="Exa-Coding" 
                        value={currentPreference} 
                        onChange={handleInputChange} 
                        onKeyPress={handleKeyPress} 
                    />
                </div>
                <div className="m-5">
                    <ul>
                        {preferences.map((preference, index) => (
                            <li key={index} className="text-md font-serif flex items-center justify-between">
                                {preference}
                                <Button variant="ghost" size="sm" onClick={() => handleRemovePreference(index)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex justify-center">
                    {loading ? (
                        <Button disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Loading
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit}>Submit</Button>
                    )}
                </div>
                <Topics />
            </div>
        </div>
    );
}
