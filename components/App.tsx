"use client";

import { useState, type ReactElement } from "react";
import { ChevronLeft, Volume2, Sparkles, BookOpen, Grid, Image as ImageIcon, CheckSquare } from "lucide-react";
import { VOWELS } from "@/lib/constants";
import PhonicsCard from "./PhonicsCard";
import LetterGrid from "./LetterGrid";
import WordGallery from "./WordGallery";
import LongVowelTrainer from "./LongVowelTrainer";
import BlendingTrain from "./BlendingTrain";
import LetterSelector from "./LetterSelector";
import MenuButton from "./MenuButton";

type Screen = 'home' | 'vowels' | 'longVowels' | 'blending' | 'letters' | 'words' | 'letterSelector';

type ScreenConfig = {
  title: string;
  color?: string;
  subtitle?: string;
  render: () => ReactElement;
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  const screens: Record<Screen, ScreenConfig> = {
    home: {
      title: "Mongol Phonics",
      subtitle: "Монгол Хэлний Авиа",
      render: () => (
        <div className="space-y-6">
          <div className="p-6 bg-linear-to-br from-blue-500 to-cyan-400 rounded-3xl text-white shadow-lg mb-8">
            <h1 className="text-4xl font-black mb-2">Сайн байна уу!</h1>
            <p className="opacity-90">Let&apos;s learn to read Mongolian.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <MenuButton 
              icon={<BookOpen className="text-orange-500" />} 
              title="The 7 Vowels" 
              sub="Эгшиг 7" 
              color="bg-orange-50"
              onClick={() => setScreen('vowels')} 
            />
            <MenuButton 
              icon={<Grid className="text-teal-500" />} 
              title="Alphabet" 
              sub="Үсэг (Letters)" 
              color="bg-teal-50"
              onClick={() => setScreen('letters')} 
            />
            <MenuButton 
              icon={<ImageIcon className="text-green-500" />} 
              title="Word Cards" 
              sub="Үг (Words) - ✨ Context" 
              color="bg-green-50"
              onClick={() => setScreen('words')} 
            />
            <MenuButton 
              icon={<Volume2 className="text-blue-500" />} 
              title="Long Vowels" 
              sub="Урт эгшиг" 
              color="bg-blue-50"
              onClick={() => setScreen('longVowels')} 
            />
            <MenuButton 
              icon={<Sparkles className="text-purple-500" />} 
              title="Syllable Train" 
              sub="Үе холбох" 
              color="bg-purple-50"
              onClick={() => setScreen('blending')} 
            />
            <MenuButton 
              icon={<CheckSquare className="text-pink-500" />} 
              title="Custom Text Generator" 
              sub="Сонгосон үсгээр текст үүсгэх" 
              color="bg-pink-50"
              onClick={() => setScreen('letterSelector')} 
            />
          </div>
        </div>
      )
    },
    vowels: {
      title: "Basic Vowels",
      color: "text-orange-600",
      render: () => (
        <div className="grid grid-cols-2 gap-4">
          {VOWELS.map((v, i) => (
            <PhonicsCard key={i} item={v} />
          ))}
        </div>
      )
    },
    longVowels: {
      title: "Long Vowels",
      color: "text-blue-600",
      render: () => <LongVowelTrainer />
    },
    blending: {
      title: "Make Syllables",
      color: "text-purple-600",
      render: () => <BlendingTrain />
    },
    letters: {
      title: "Alphabet Sounds",
      color: "text-teal-600",
      render: () => <LetterGrid />
    },
    words: {
      title: "Word Cards",
      color: "text-green-600",
      render: () => <WordGallery />
    },
    letterSelector: {
      title: "Custom Text Generator",
      color: "text-pink-600",
      render: () => <LetterSelector />
    }
  };

  const currentScreen = screens[screen];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800 selection:bg-blue-100 flex justify-center">
      <div className="w-full max-w-lg bg-white min-h-screen flex flex-col shadow-2xl">
        
        {/* Header */}
        <header className="px-6 py-6 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-sm z-10 border-b border-gray-100">
          {screen !== 'home' ? (
            <button onClick={() => setScreen('home')} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft size={28} className="text-gray-600" />
            </button>
          ) : <div className="w-8" />}
          
          <h1 className={`text-xl font-bold ${currentScreen.color || 'text-gray-800'}`}>
            {currentScreen.title}
          </h1>
          
          <div className="w-8" /> 
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 pb-8 overflow-y-auto">
          {currentScreen.render()}
        </main>

        {/* Footer */}
        {screen === 'home' && (
          <footer className="p-6 text-center text-gray-400 text-sm border-t border-gray-50">
            <p>© 2025 Mongol Phonics. Educational Use.</p>
          </footer>
        )}
      </div>
    </div>
  );
}

