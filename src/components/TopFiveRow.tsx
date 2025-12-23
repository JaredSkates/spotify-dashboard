"use client";
import ArtistGauge from './ArtistGauge';

type ArtistData = {
  artist: any;
  time: number;
}

type Props = {
  allArtists: ArtistData[];
  totalHrs: number;          
}

export default function TopFiveRow({ allArtists, totalHrs }: Props) {
  const top5 = allArtists.slice(0, 5);

  console.log(top5)


  return (
    <div className="w-[45vw] h-[40vh] flex flex-wrap justify-center items-center gap-8 p-2">
        {top5.map((artist) => {   
            return (
              <ArtistGauge
                  key={artist.artist}
                  artistName={artist.artist}
                  artistHours={artist.time}
                  totalHours={totalHrs}
              />
            );
        })}
    </div>
  );
}