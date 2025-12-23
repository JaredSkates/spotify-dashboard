"use client";
import { useEffect, useState } from "react";
import TopFiveRow from "./TopFiveRow";

type ArtistData = {
    artist: any;
    time: number;
}

type TopTracks = {
    artist: string;
    ms_played: number;
    track_name: string;
}

export default function Main() {
    const [data, setData] = useState<ArtistData[]>([])
    const [totalHrs, setTotalHrs] = useState(0)
    const [topTracks, setTopTracks] = useState<TopTracks[]>([])

    useEffect(() => {
        async function load() {
            const res = await fetch("http://localhost:8000/top-tracks")
            const data = await res.json()

            const data_converted = Object.keys(data.artist).map((key) => ({
                artist: data.artist[key],
                time: (data.ms_played[key] / (1000 * 60 * 60))
            })).sort((a, b) => b.time - a.time)

            console.log(data_converted)
            setData(data_converted)

            let hrs = Object.values(data_converted).reduce((sum, current) => sum + current.time, 0)
            setTotalHrs(hrs)

            
        }

        load();
    }, [])

    useEffect(() => {
            async function load() {
                const result = await fetch("http://localhost:8000/spotify-data")
                const data = await result.json()
                
                const grouped = Object.keys(data.artist).map((key) => ({
                    artist: data.artist[key],
                    ms_played: data.ms_played[key],
                    track_name: data.track_name[key],
                })).slice(0,5);

                // Convert to an array
                console.log(data);
                console.log(grouped);

                setTopTracks(grouped);
                
            }
    
            load()
        }, [])


    return(
        <div className="w-full h-[35%] flex-col md:flex-row flex">
            <div className="h-full">
                {data.length > 0 && (
                    <TopFiveRow 
                        allArtists={data} 
                        totalHrs={totalHrs} 
                    />
                )}
            </div>
            
            <hr className="hidden md:flex ml-6 h-[300px] w-px bg-white" />

            <div className="flex flex-col justify-center w-full h-full items-center p-2">
                <h1 className="font-thin text-3xl">Top Tracks</h1>
                
                <div className="flex flex-col gap-2">
                    {topTracks.map((artist) => {
                        return(
                            <div>
                                <h1 className="text-xl font-thin">{artist.track_name}</h1>
                                <span className="text-sm">{artist.artist}</span>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}