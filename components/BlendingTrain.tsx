"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2 } from "lucide-react";
import { CONSONANTS, VOWELS } from "@/lib/constants";
import { speak } from "@/lib/utils";
import type { Consonant, Vowel } from "@/lib/constants";

export default function BlendingTrain() {
  const [selectedConsonant, setSelectedConsonant] = useState<Consonant | null>(null);
  const [selectedVowel, setSelectedVowel] = useState<Vowel | null>(null);
  const [blended, setBlended] = useState<string | null>(null);
  const [blendedSound, setBlendedSound] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timeout when dependencies change
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Only set up the timeout when both consonant and vowel are selected
    // The click handlers already reset blended state when selections change
    if (selectedConsonant && selectedVowel) {
      timeoutRef.current = setTimeout(() => {
        const result = selectedConsonant.letter + selectedVowel.letter.toLowerCase();
        const sound = (selectedConsonant.sound || selectedConsonant.letter) + (selectedVowel.sound || selectedVowel.letter);
        setBlended(result);
        setBlendedSound(sound);
        console.log(sound);
        speak(sound);
        timeoutRef.current = null;
      }, 600);
    }

    // Cleanup function to clear timeout on unmount or dependency change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [selectedConsonant, selectedVowel]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 flex flex-col items-center justify-center min-h-[200px] bg-gray-50 rounded-3xl mb-6 relative overflow-hidden border border-gray-100">
        {blended ? (
          <div className="animate-bounce-in flex flex-col items-center">
            <span className="text-8xl font-black text-purple-600 tracking-tighter mb-6">{blended}</span>
            <button 
              onClick={() => blendedSound && speak(blendedSound)} 
              className="flex items-center gap-2 text-purple-600 font-bold bg-purple-50 px-6 py-3 rounded-full hover:bg-purple-100 active:scale-95 transition-all shadow-sm"
            >
              <Volume2 size={20} /> Replay
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4 opacity-30">
            <div className={`w-20 h-24 border-4 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-4xl font-bold ${selectedConsonant ? 'text-black border-solid bg-white border-purple-200' : ''}`}>
              {selectedConsonant ? selectedConsonant.letter : '?'}
            </div>
            <span className="text-4xl text-gray-300">+</span>
            <div className={`w-20 h-24 border-4 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-4xl font-bold ${selectedVowel ? 'text-black border-solid bg-white border-pink-200' : ''}`}>
              {selectedVowel ? selectedVowel.letter : '?'}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">1. Choose Consonant</label>
          <div className="flex gap-3 overflow-x-auto pb-4 mt-2 no-scrollbar">
            {CONSONANTS.map(c => (
              <button
                key={c.letter}
                onClick={() => { 
                  setSelectedConsonant(c); 
                  setBlended(null); 
                  speak((c.sound)); 
                }} 
                className={`shrink-0 w-16 h-16 rounded-2xl font-bold text-2xl border-b-4 transition-all
                  ${selectedConsonant === c 
                    ? 'bg-purple-500 text-white border-purple-700 translate-y-1' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:-translate-y-1'}`}
              >
                {c.letter}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">2. Choose Vowel</label>
          <div className="flex gap-3 overflow-x-auto pb-4 mt-2 no-scrollbar">
            {VOWELS.map(v => (
              <button
                key={v.letter}
                onClick={() => { 
                  setSelectedVowel(v); 
                  setBlended(null); 
                  speak(v.sound); 
                }}
                className={`shrink-0 w-16 h-16 rounded-2xl font-bold text-2xl border-b-4 transition-all
                  ${selectedVowel === v 
                    ? 'bg-pink-500 text-white border-pink-700 translate-y-1' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-pink-300 hover:-translate-y-1'}`}
              >
                {v.letter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

