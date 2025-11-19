// Gemini API Configuration

export const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";
// The apiKey is left empty; the environment automatically handles insertion for the fetch call.
// NOTE: In a real deployment, you would need to securely handle the API key.
export const apiKey = "";
export const API_URL_BASE = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=`;

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

