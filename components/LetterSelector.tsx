"use client";

import { useState } from "react";
import { Volume2, Sparkles, CheckCircle2, Circle } from "lucide-react";
import { FULL_ALPHABET } from "@/lib/constants";
import { speak } from "@/lib/utils";
import { API_URL_BASE, apiKey, isApiKeyConfigured, type StoryResponse } from "@/lib/api";

export default function LetterSelector() {
  const [selectedLetters, setSelectedLetters] = useState<Set<string>>(new Set());
  const [generatedStory, setGeneratedStory] = useState<StoryResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleLetter = (letter: string) => {
    const newSelected = new Set(selectedLetters);
    if (newSelected.has(letter)) {
      newSelected.delete(letter);
    } else {
      newSelected.add(letter);
    }
    setSelectedLetters(newSelected);
    setGeneratedStory(null);
    setError(null);
  };

  const selectAll = () => {
    setSelectedLetters(new Set(FULL_ALPHABET.map(item => item.letter)));
    setGeneratedStory(null);
    setError(null);
  };

  const clearAll = () => {
    setSelectedLetters(new Set());
    setGeneratedStory(null);
    setError(null);
  };

  const generateText = async () => {
    if (selectedLetters.size === 0) {
      setError("Please select at least one letter.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedStory(null);

    // Check if API key is configured
    if (!isApiKeyConfigured()) {
      setError("API key not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY in your environment variables.");
      setIsGenerating(false);
      return;
    }

    const selectedLettersArray = Array.from(selectedLetters);
    const selectedLettersString = selectedLettersArray.join(", ");

    const systemPrompt = `You are an expert Mongolian language tutor and storyteller. Generate a short, simple mini story (5-6 sentences) in Mongolian Cyrillic script using ONLY the following Cyrillic letters: ${selectedLettersString}. The story must be written in actual Mongolian Cyrillic characters (А, Б, В, Г, Д, Е, Ё, Ж, З, И, Й, К, Л, М, Н, О, Ө, П, Р, С, Т, У, Ү, Ф, Х, Ц, Ч, Ш, Щ, Ъ, Ы, Ь, Э, Ю, Я), NOT in romanized/transliterated form. The story should be engaging, easy to understand, and suitable for language learning. The story must be grammatically correct and use only the specified Cyrillic letters. Include a Romanized phonetic pronunciation of the entire story and an accurate English translation. Respond only in JSON format with fields: story (the complete story in Mongolian Cyrillic), phonetic (phonetic pronunciation), and english (English translation).`;

    const userQuery = `Create a short mini story (5-6 sentences) in Mongolian Cyrillic script using only these Cyrillic letters: ${selectedLettersString}. IMPORTANT: Write the story in actual Mongolian Cyrillic characters, NOT in romanized/transliterated form. Make it a simple, engaging story suitable for language learning.`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            story: { type: "STRING", description: "The complete Mongolian mini story (5-6 sentences) written in Mongolian Cyrillic script using only the specified Cyrillic letters. MUST be in Cyrillic characters, NOT romanized." },
            phonetic: { type: "STRING", description: "The Romanized phonetic pronunciation of the entire story." },
            english: { type: "STRING", description: "The English translation of the entire story." },
          },
          required: ["story", "phonetic", "english"]
        },
      },
    };

    const apiUrl = `${API_URL_BASE}${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("API key is invalid or missing. Please check your NEXT_PUBLIC_GEMINI_API_KEY environment variable.");
        } else if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again later.");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const result = await response.json();
      const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text;

      if (jsonText) {
        const parsedJson = JSON.parse(jsonText) as StoryResponse;
        if (parsedJson.story && parsedJson.phonetic && parsedJson.english) {
          setGeneratedStory(parsedJson);
        } else {
          throw new Error("Invalid response format: expected story with phonetic and english.");
        }
      } else {
        throw new Error("Invalid response format from API.");
      }
    } catch (e) {
      console.error("Gemini API call failed:", e);
      setError(e instanceof Error ? e.message : "Could not generate text. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col py-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Custom Story Generator</h2>
        <p className="text-gray-500 text-sm">Select letters to generate a mini story using only those letters</p>
        <p className="text-xs text-gray-400 mt-1">
          Selected: {selectedLetters.size} / {FULL_ALPHABET.length} letters
        </p>
      </div>

      {/* Selection Controls */}
      <div className="flex gap-2 mb-4 justify-center">
        <button
          onClick={selectAll}
          className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 active:scale-95 transition-all"
        >
          Select All
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 text-sm font-medium bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 active:scale-95 transition-all"
        >
          Clear All
        </button>
      </div>

      {/* Letter Grid */}
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
          {FULL_ALPHABET.map((item, idx) => {
            const isSelected = selectedLetters.has(item.letter);
            return (
              <button
                key={idx}
                onClick={() => toggleLetter(item.letter)}
                className={`
                  aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center
                  ${isSelected
                    ? 'bg-blue-500 text-white border-blue-600 shadow-md scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }
                  active:scale-95
                `}
              >
                <div className="text-2xl font-bold mb-1">{item.letter}</div>
                {isSelected ? (
                  <CheckCircle2 size={16} className="text-blue-100" fill="currentColor" />
                ) : (
                  <Circle size={16} className="text-gray-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Generate Button */}
      <div className="mt-4">
        <button
          onClick={generateText}
          disabled={isGenerating || selectedLetters.size === 0}
          className={`
            w-full flex items-center justify-center gap-2 p-4 rounded-xl font-bold transition-colors shadow-lg active:shadow-md active:scale-[0.99]
            ${isGenerating || selectedLetters.size === 0
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-linear-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
            }
          `}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <Sparkles size={20} /> Generate Mini Story with Selected Letters
            </>
          )}
        </button>

        {error && (
          <p className="mt-4 text-center text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-200">
            {error}
          </p>
        )}

        {generatedStory && (
          <div className="mt-6 p-6 bg-linear-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl shadow-inner animate-fade-in">
            <h4 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Sparkles size={16} /> Generated Mini Story:
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-indigo-700 leading-relaxed whitespace-pre-line">
                      {generatedStory.story}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const selectedLettersText = Array.from(selectedLetters).join(", ");
                      const prefix = `${selectedLettersText}. `;
                      speak(prefix + generatedStory.story);
                    }}
                    className="p-3 rounded-full bg-indigo-100 text-indigo-700 hover:bg-indigo-200 active:scale-95 transition-all shrink-0"
                    title="Play Story"
                  >
                    <Volume2 size={20} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-4 bg-white/80 rounded-lg">
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Phonetic:</p>
                  <p className="text-sm text-gray-700 font-medium leading-relaxed whitespace-pre-line">
                    {generatedStory.phonetic}
                  </p>
                </div>
                <div className="p-4 bg-white/80 rounded-lg">
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">English:</p>
                  <p className="text-sm text-gray-700 font-medium leading-relaxed whitespace-pre-line">
                    {generatedStory.english}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

