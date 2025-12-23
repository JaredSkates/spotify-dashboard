"use client";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type Props = {
    artistName: string;
    artistHours: number;
    totalHours: number;
}

export default function ArtistGauge({artistName, artistHours, totalHours} : Props) {
    const remainder = Math.max(0, totalHours - artistHours)
    const data = [
        {artist: artistName, time: artistHours},
        {artist: 'Other', time: remainder},
    ]

    return(
        <div className="flex flex-col items-center w-40"> 
            
            <div className="w-40 h-30 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="time"     
                            outerRadius={60}   
                            startAngle={90}    
                            endAngle={-270}    
                            stroke="none"      
                        >
                            <Cell fill='#D6D6D6' />
                            <Cell fill='#9A7373' />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                

                <div className="absolute inset-0 flex flex-col top-8 items-center justify-center pointer-events-none">
                    <span className="text-2xl text-[#EAD7C1]">{Math.round(artistHours)}</span>
                    <span className="text-xs text-[#EAD7C1]">HOURS</span>
                </div>
            </div>

            <h3 className="mt-2 text-[#EAD7C1] text-center font-light">{artistName}</h3>
        </div>
    )
}