// Gemini API Configuration

export const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

// Get API key from environment variable
// For client-side components, use NEXT_PUBLIC_ prefix
export const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=`;

// Helper to check if API key is configured
export const isApiKeyConfigured = () => {
  return apiKey.length > 0;
};

// Structure for the LLM response (Sentence Generator)
export const SENTENCE_SCHEMA = {
  type: "OBJECT",
  properties: {
    sentence: { type: "STRING", description: "The complete, simple Mongolian sentence." },
    phonetic: { type: "STRING", description: "The Romanized, easy-to-read phonetic pronunciation of the entire sentence." },
    english: { type: "STRING", description: "The English translation of the sentence." },
  },
  required: ["sentence", "phonetic", "english"]
};

export interface SentenceResponse {
  sentence: string;
  phonetic: string;
  english: string;
}

export interface MultiSentenceResponse {
  sentences: SentenceResponse[];
}

export interface StoryResponse {
  story: string;
  phonetic: string;
  english: string;
}

