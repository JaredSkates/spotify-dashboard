"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline"; // Arrow Icon

type Prop = {
  artists: string[];
  currentArtist: string;
  onSelect: (artist: string) => void;
}

export default function ArtistSwitcher({ artists, currentArtist, onSelect }: Prop) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (artist: string) => {
    onSelect(artist);
    setIsOpen(false);
  };

  return (
    <div className="relative mb-6 z-50"> {/* High z-index so menu floats over everything */}
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="cursor-pointer group select-none flex items-center gap-4"
      >

        <h1 className="text-xl md:text-2xl font-bold text-[#EAD7C1] group-hover:text-white transition-colors">
          {currentArtist}
        </h1>
        
        <div className="flex items-center gap-2 text-[#A68F7B] mt-2 group-hover:text-[#EAD7C1] transition-colors">
          <span className="text-sm font-light tracking-widest uppercase hidden md:block">
            Top Songs By Artist
          </span>
          <ChevronDownIcon 
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} 
          />
        </div>

      </div>

      {/* 2. THE DROPDOWN MENU */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-64 bg-[#2A1F1D] border border-[#5C4D44] rounded-lg shadow-2xl max-h-80 overflow-y-auto custom-scrollbar">
          {artists.map((artistName) => (
            <button
              key={artistName}
              onClick={() => handleSelect(artistName)}
              className={`w-full text-left px-6 py-3 text-lg transition-colors border-b border-[#3E2E2A] last:border-0
                ${artistName === currentArtist 
                  ? "bg-[#3E2E2A] text-[#EAD7C1]" 
                  : "text-[#A68F7B] hover:bg-[#3E2E2A]"
                }`}
            >
              {artistName}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}