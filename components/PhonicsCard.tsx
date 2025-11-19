"use client";

import { Volume2 } from "lucide-react";
import { speak } from "@/lib/utils";
import type { Vowel, AlphabetLetter } from "@/lib/constants";

interface PhonicsCardProps {
  item: Vowel | AlphabetLetter;
  isLarge?: boolean;
  onClick?: () => void;
}

export default function PhonicsCard({ item, isLarge = false, onClick }: PhonicsCardProps) {
  return (
    <div 
      onClick={onClick} 
      className={`
        relative flex flex-col items-center justify-center rounded-3xl shadow-sm border border-gray-100
        transition-all duration-300 bg-white
        ${isLarge ? 'w-64 h-80' : 'w-full aspect-square'}
        ${onClick ? 'cursor-pointer active:scale-95 hover:shadow-md' : 'cursor-default'} 
      `}
    >
      <div className={`text-6xl font-black mb-2 ${'color' in item && item.color ? item.color.split(' ')[1] : 'text-gray-800'}`}>
        {item.letter}
      </div>
      {isLarge && 'word' in item && 'translation' in item && (
        <div className="text-center mt-4 opacity-0 animate-fade-in">
          <div className="text-2xl font-medium text-gray-600">{item.word}</div>
          <div className="text-sm text-gray-400 uppercase tracking-widest mt-1">{item.translation}</div>
        </div>
      )}
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          speak(item.sound || item.letter);
        }}
        className="absolute bottom-3 right-3 p-3 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100 hover:scale-110 transition-all cursor-pointer shadow-sm"
        aria-label="Play Letter Sound"
      >
        <Volume2 size={22} />
      </button>
    </div>
  );
}

