"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { LONG_VOWELS } from "@/lib/constants";
import { speak } from "@/lib/utils";

export default function LongVowelTrainer() {
  const [activePair, setActivePair] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const current = LONG_VOWELS[activePair];

  const playSound = (text: string, duration: 'short' | 'long') => {
    setIsPlaying(true);
    speak(text, duration === 'long' ? 0.5 : 1); 
    setTimeout(() => setIsPlaying(false), duration === 'long' ? 1500 : 800);
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Short vs. Long</h2>
        <p className="text-gray-500">Tap the speaker buttons to listen</p>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-64 relative">
          <span className="text-6xl font-black text-blue-500 mb-6">{current.short}</span>
          <div className="w-8 h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
            <div className={`h-full bg-blue-400 transition-all duration-500 ${isPlaying ? 'w-full' : 'w-0'}`} />
          </div>
          <button 
            onClick={() => playSound(current.shortSound || current.short, 'short')}
            className="flex items-center gap-2 text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 active:scale-95 transition-all"
          >
            <Volume2 size={18} /> Play
          </button>
          <span className="absolute top-4 text-xs text-gray-300 uppercase font-bold tracking-wider">Short</span>
        </div>

        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-64 relative">
          <span className="text-6xl font-black text-red-500 mb-6">{current.long}</span>
          <div className="w-24 h-2 bg-gray-200 rounded-full mb-8 overflow-hidden">
            <div className={`h-full bg-red-400 transition-all duration-1500 ease-linear ${isPlaying ? 'w-full' : 'w-0'}`} />
          </div>
          <button 
            onClick={() => playSound(current.longSound || current.long, 'long')}
            className="flex items-center gap-2 text-red-600 font-bold bg-red-50 px-4 py-2 rounded-full hover:bg-red-100 active:scale-95 transition-all"
          >
            <Volume2 size={18} /> Play
          </button>
          <span className="absolute top-4 text-xs text-gray-300 uppercase font-bold tracking-wider">Long</span>
        </div>
      </div>

      <div className="flex gap-2 bg-gray-100 p-2 rounded-full">
        {LONG_VOWELS.map((_, idx) => (
          <div 
            key={idx} 
            onClick={() => setActivePair(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${idx === activePair ? 'bg-gray-800 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}

