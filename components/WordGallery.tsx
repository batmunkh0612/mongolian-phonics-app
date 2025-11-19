"use client";

import { useState, useEffect } from "react";
import { Volume2, ChevronLeft, ArrowRight, Sparkles, Play } from "lucide-react";
import { FULL_ALPHABET } from "@/lib/constants";
import { speak } from "@/lib/utils";
import { API_URL_BASE, apiKey, SENTENCE_SCHEMA, isApiKeyConfigured, type SentenceResponse } from "@/lib/api";

export default function WordGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exampleSentence, setExampleSentence] = useState<SentenceResponse | null>(null);
  const [isLoadingSentence, setIsLoadingSentence] = useState(false);
  const [sentenceError, setSentenceError] = useState<string | null>(null);

  const item = FULL_ALPHABET[currentIndex];

  // Clear sentence when card changes
  useEffect(() => {
    setExampleSentence(null);
    setSentenceError(null);
  }, [currentIndex]);

  const generateSentence = async (word: string) => {
    setIsLoadingSentence(true);
    setSentenceError(null);
    setExampleSentence(null);

    // Check if API key is configured
    if (!isApiKeyConfigured()) {
      setSentenceError("API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.");
      setIsLoadingSentence(false);
      return;
    }

    const systemPrompt = "You are an expert Mongolian language tutor specializing in phonics. Your task is to generate one very short, simple, and grammatically correct Mongolian sentence using the provided word. Include a Romanized phonetic pronunciation and an accurate English translation. Respond only in the requested JSON format.";
    const userQuery = `Create a simple sentence using the Mongolian word: ${word}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: SENTENCE_SCHEMA,
      },
    };

    const apiUrl = `${API_URL_BASE}${apiKey}`;
    
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          // Provide more helpful error messages
          if (response.status === 403) {
            throw new Error("API key is invalid or missing. Please check your NEXT_PUBLIC_GEMINI_API_KEY environment variable.");
          } else if (response.status === 429) {
            throw new Error("Rate limit exceeded. Please try again later.");
          } else if (response.status === 400) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Invalid request: ${errorData.error?.message || 'Please check your API configuration'}`);
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }

        const result = await response.json();
        const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (jsonText) {
          const parsedJson = JSON.parse(jsonText) as SentenceResponse;
          setExampleSentence(parsedJson);
          break; // Success, break the loop
        } else {
          throw new Error("Invalid response format from API.");
        }
      } catch (e) {
        console.error("Gemini API call failed:", e);
        setSentenceError("Could not generate sentence. Please try again.");
        attempts++;
        if (attempts < maxAttempts) {
          const delay = Math.pow(2, attempts) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay)); // Exponential backoff
        }
      }
    }
    
    setIsLoadingSentence(false);
  };

  const next = () => setCurrentIndex((prev) => (prev + 1) % FULL_ALPHABET.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + FULL_ALPHABET.length) % FULL_ALPHABET.length);

  return (
    <div className="h-full flex flex-col items-center justify-center py-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Word Practice</h2>
        <p className="text-gray-500 text-sm">Learn words for each letter</p>
      </div>

      {/* Card Container */}
      <div className="relative w-full max-w-xs">
        
        {/* Main Card */}
        <div className="bg-white rounded-4xl shadow-xl p-8 w-full flex flex-col items-center border border-gray-100 relative animate-fade-in">
          
          {/* Letter Sound Button */}
          <button 
            onClick={() => speak(item.sound || item.letter)}
            className="absolute top-4 left-4 p-3 rounded-full bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-500 transition-colors"
            title="Play Letter Sound"
          >
            <Volume2 size={20} />
          </button>

          {/* Letter Count */}
          <div className="absolute top-6 right-6 text-xs font-bold text-gray-300">
            {currentIndex + 1} / {FULL_ALPHABET.length}
          </div>

          <div className="text-8xl font-black text-gray-800 mb-8 mt-6">
            {item.letter}
          </div>
          
          {/* Word Section - Uses wordSound to avoid "Cyrillic Letter..." reading */}
          <div className="w-full bg-blue-50 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden group cursor-pointer transition-transform active:scale-95"
                onClick={() => speak(item.wordSound || item.word)}>
            <div className="text-3xl font-bold text-blue-600 mb-1">{item.word}</div>
            <div className="text-sm font-medium text-blue-300 uppercase tracking-widest">{item.translation}</div>
            
            {/* Play Icon Hint */}
            <div className="absolute right-3 bottom-3 text-blue-200">
              <Play size={16} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-8 px-4">
          <button 
            onClick={prev}
            className="p-4 rounded-full bg-white shadow-md text-gray-600 hover:text-blue-600 hover:shadow-lg active:scale-90 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          
          <span className="text-sm font-bold text-gray-300 tracking-widest uppercase">
            Navigate
          </span>

          <button 
            onClick={next}
            className="p-4 rounded-full bg-white shadow-md text-gray-600 hover:text-blue-600 hover:shadow-lg active:scale-90 transition-all"
          >
            <ArrowRight size={24} />
          </button>
        </div>

        {/* LLM Feature Button and Output */}
        <div className="mt-8">
          <button 
            onClick={() => generateSentence(item.word)}
            disabled={isLoadingSentence}
            className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl font-bold transition-colors shadow-lg active:shadow-md active:scale-[0.99]
              ${isLoadingSentence 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-yellow-400 text-gray-800 hover:bg-yellow-500'}`
            }
          >
            {isLoadingSentence ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Context...
              </>
            ) : (
              <><Sparkles size={20} /> Get Example Sentence</>
            )}
          </button>
          
          {sentenceError && (
            <p className="mt-4 text-center text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">{sentenceError}</p>
          )}

          {exampleSentence && (
            <div className="mt-6 p-4 bg-white border border-gray-200 rounded-xl shadow-inner animate-fade-in">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Sentence Example:</h4>
              <div className="space-y-3">
                <div className="p-3 bg-indigo-50 rounded-lg flex items-center justify-between">
                  <span className="text-xl font-semibold text-indigo-700">{exampleSentence.sentence}</span>
                  <button 
                    onClick={() => speak(exampleSentence.sentence)}
                    className="p-2 ml-3 rounded-full bg-indigo-200 text-indigo-700 hover:bg-indigo-300 active:scale-95"
                    title="Play Sentence"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-indigo-500 mr-2">Phonetic:</span>
                  {exampleSentence.phonetic}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-indigo-500 mr-2">English:</span>
                  {exampleSentence.english}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

