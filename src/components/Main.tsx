"use client";
import { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';


export default function Main() {
    const [hours, setHours] = useState()

    // Use to run a function once
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

    return(
        <main className='w-full h-[50%] flex flex-col items-center'>
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
        </main>
    )
}