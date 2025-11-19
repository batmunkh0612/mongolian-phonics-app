// Text to Speech utility

export const speak = (text: string, rate: number = 0.8): void => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1.1;
  
  const voices = window.speechSynthesis.getVoices();
  // Find a Mongolian voice if possible, otherwise use default
  const mongolianVoice = voices.find(v => v.lang.includes('mn'));
  if (mongolianVoice) utterance.voice = mongolianVoice;

  window.speechSynthesis.speak(utterance);
};

