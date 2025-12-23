"use client";
import { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import ArtistSwitcher from './ArtistSwitcher';
import { SongList } from './SongList';


export default function Footer() {
    const [hours, setHours] = useState()

    const [rawArtistData, setRawArtistData] = useState(null);
    const [artistNames, setArtistNames] = useState<string[]>([]);
    const [selectedArtist, setSelectedArtist] = useState('');
    const [currentSongs, setCurrentSongs] = useState<string[]>([]);


    useEffect(() => {
        async function load() {
            const result = await fetch("http://localhost:8000/listening-hours")
            let data = await result.json()
            // Convert to an array
            data = Object.keys(data.weekday).map((key) => ({
                weekday: data.weekday[key],
                ms_played: data.ms_played[key],
            }))
            setHours(data)
            console.log(data)
        }

        load()
    }, [])

    useEffect(() => {
        async function loadArtists() {
            const result = await fetch("http://localhost:8000/top-song-artist")
            const data = await result.json()

            setRawArtistData(data)

            const names = Object.keys(data);
            console.log(names)
            setArtistNames(names)
            
            if(names.length > 0) {
                const firstArtist = names[0];
                setSelectedArtist(firstArtist);

                const songList = Object.values(data[firstArtist]) as string[]
                console.log(songList)
                setCurrentSongs(songList);
            }
        }

        loadArtists();
    }, [])

    async function handleArtistSelect(artist: string) {
        setSelectedArtist(artist);

        if(rawArtistData && rawArtistData[artist]) {
            const songList = Object.values(rawArtistData[artist]) as string[];
            setCurrentSongs(songList);
        }

    }

    return(
        <main className='w-full h-[45vh] flex-col md:flex-row flex justify-evenly p-5'>
            <div className='flex flex-col items-center w-full p-4'>
                {selectedArtist && (
                    <>
                        <ArtistSwitcher 
                            artists={artistNames}
                            currentArtist={selectedArtist}
                            onSelect={handleArtistSelect}
                        />

                        <SongList
                            songs={currentSongs}
                        />
                    </>
                )}
            </div>

            <div className='flex flex-col items-center w-full h-full'>
                <h2 className='text-2xl'>Listening Hours By Day</h2>
                <BarChart
                    style={{ width: '90%', maxWidth: '700px', maxHeight: '40vh', aspectRatio: 1.5 }}
                    responsive
                    
                    data={hours}
                >
                    <XAxis dataKey="weekday" />
                    <YAxis width={50} />
                    <Tooltip />
                    <Bar dataKey="ms_played" fill="#A37A7A" />
                </BarChart>
            </div>
        </main>
    )
}