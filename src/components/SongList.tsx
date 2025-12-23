'use client';

type Prop = {
    songs: string[]
}

export function SongList({ songs }: Prop) {
    return(
        <div>
            {songs.map((songTitle, index) => (
                <div
                    key={index}
                    className="group flex items-center gap-4 p-3 rounded-lg hover:bg-[#2A1F1D] transition-colors cursor-default border-b border-white/5"
                >
                    <span className="text-[#5C4D44] font-mono text-xl group-hover:text-[#A68F7B] transition-colors">
                        {String(index + 1).padStart(2, '0')}
                    </span> 

                    <span className="text-xl md:text-2xl font-light text-[#EAD7C1] group-hover:translate-x-2 transition-transform duration-300">
                        {songTitle}
                    </span>
                    
                </div>
            ))}
        </div>
    )
}