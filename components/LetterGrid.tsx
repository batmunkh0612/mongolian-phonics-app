"use client";

import { FULL_ALPHABET } from "@/lib/constants";
import { speak } from "@/lib/utils";

export default function LetterGrid() {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Alphabet Sounds</h2>
        <p className="text-gray-500 text-sm">Tap to hear the sound</p>
      </div>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 pb-4">
        {FULL_ALPHABET.map((item, idx) => (
          <button
            key={idx}
            onClick={() => speak(item.sound)}
            className="aspect-square bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-center text-2xl font-bold text-gray-700 hover:border-blue-400 hover:text-blue-600 hover:shadow-md active:scale-95 transition-all"
          >
            {item.letter}
          </button>
        ))}
      </div>
    </div>
  );
}

