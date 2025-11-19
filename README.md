# Mongolian Phonics App (Монгол Хэлний Авиа)

An interactive educational web application for learning Mongolian phonics, designed to help learners master the Mongolian alphabet, pronunciation, and basic reading skills.

## Features

### 📚 Learning Modules

- **The 7 Vowels (Эгшиг 7)** - Learn the basic Mongolian vowels with interactive cards
- **Alphabet Sounds (Үсэг)** - Explore all 35 letters of the Mongolian Cyrillic alphabet
- **Word Cards (Үг)** - Practice vocabulary with flashcards and AI-generated example sentences
- **Long Vowels (Урт эгшиг)** - Compare short vs. long vowel sounds with visual feedback
- **Syllable Train (Үе холбох)** - Learn to blend consonants and vowels to form syllables

### ✨ Key Features

- **Interactive Learning** - Tap letters and words to hear pronunciations
- **Text-to-Speech** - Built-in speech synthesis with Mongolian voice support
- **AI-Powered Sentences** - Generate contextual example sentences using Google Gemini API
- **Visual Feedback** - Color-coded cards and animations for engaging learning
- **Mobile-First Design** - Optimized for mobile devices with responsive layout

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API for sentence generation
- **Speech**: Web Speech API (SpeechSynthesis)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mongolian-phonics-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Environment Variables

For AI sentence generation, you'll need to configure the Gemini API key. The app is designed to work with environment-based API key injection.

## Project Structure

```
mongolian-phonics-app/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main page entry point
│   └── globals.css     # Global styles
├── components/
│   ├── App.tsx         # Main app component with routing
│   ├── PhonicsCard.tsx      # Interactive letter card
│   ├── LetterGrid.tsx       # Alphabet soundboard
│   ├── WordGallery.tsx      # Word flashcards
│   ├── LongVowelTrainer.tsx # Vowel comparison trainer
│   ├── BlendingTrain.tsx    # Syllable blending machine
│   └── MenuButton.tsx       # Navigation menu button
├── lib/
│   ├── constants.ts    # Mongolian alphabet data
│   ├── utils.ts        # Utility functions (text-to-speech)
│   └── api.ts          # Gemini API configuration
└── public/             # Static assets
```

## Usage

1. **Start Learning**: Navigate through the home menu to select a learning module
2. **Listen**: Tap the speaker icon or click on letters/words to hear pronunciations
3. **Practice**: Use the Word Cards module to learn vocabulary with example sentences
4. **Blend**: Try the Syllable Train to practice combining consonants and vowels
5. **Compare**: Use Long Vowels to understand the difference between short and long sounds

## Development

### Building for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Educational Use

This application is designed for educational purposes to help learners:
- Master the Mongolian Cyrillic alphabet
- Understand phonetic pronunciation
- Build vocabulary through interactive flashcards
- Practice syllable formation
- Learn through contextual example sentences

## License

© 2025 Mongol Phonics. Educational Use.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Powered by [Google Gemini API](https://ai.google.dev) for AI features
- Uses [Lucide Icons](https://lucide.dev) for beautiful icons
