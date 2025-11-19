// Mongolian Phonics Curriculum Data

export interface Vowel {
  letter: string;
  ipa: string;
  sound: string;
  word: string;
  translation: string;
  color: string;
}

export interface LongVowel {
  short: string;
  long: string;
  shortSound: string;
  longSound: string;
  example: string;
}

export interface Consonant {
  letter: string;
  name: string;
  sound: string;
}

export interface AlphabetLetter {
  letter: string;
  sound: string;
  word: string;
  wordSound: string;
  translation: string;
}

export const VOWELS: Vowel[] = [
  { letter: "А", ipa: "a", sound: "ah", word: "Алим", translation: "Apple", color: "bg-red-100 text-red-600" },
  { letter: "Э", ipa: "e", sound: "eh", word: "Ээж", translation: "Mother", color: "bg-blue-100 text-blue-600" },
  { letter: "И", ipa: "i", sound: "ee", word: "Инээд", translation: "Smile", color: "bg-yellow-100 text-yellow-600" },
  { letter: "О", ipa: "ɔ", sound: "oh", word: "Од", translation: "Star", color: "bg-purple-100 text-purple-600" },
  { letter: "У", ipa: "ʊ", sound: "ooh", word: "Уул", translation: "Mountain", color: "bg-green-100 text-green-600" },
  { letter: "Ө", ipa: "ө", sound: "uh", word: "Өвөө", translation: "Grandfather", color: "bg-orange-100 text-orange-600" },
  { letter: "Ү", ipa: "u", sound: "ew", word: "Үүл", translation: "Cloud", color: "bg-teal-100 text-teal-600" }
];

export const LONG_VOWELS: LongVowel[] = [
  { short: "А", long: "АА", shortSound: "ah", longSound: "aaah", example: "Аав" },
  { short: "Э", long: "ЭЭ", shortSound: "eh", longSound: "eeeh", example: "Ээж" },
  { short: "О", long: "ОО", shortSound: "oh", longSound: "oooh", example: "Оосор" },
  { short: "У", long: "УУ", shortSound: "ooh", longSound: "oooooh", example: "Уух" }
];

export const CONSONANTS: Consonant[] = [
  { letter: "М", name: "M", sound: "m" },
  { letter: "С", name: "S", sound: "s" },
  { letter: "Х", name: "Kh", sound: "h" },
  { letter: "Б", name: "B", sound: "b" }
];

export const FULL_ALPHABET: AlphabetLetter[] = [
  { letter: "А", sound: "ah", word: "Алим", wordSound: "ah-lim", translation: "Apple" },
  { letter: "Б", sound: "buh", word: "Бөмбөг", wordSound: "bum-bug", translation: "Ball" },
  { letter: "В", sound: "vuh", word: "Ваар", wordSound: "vaar", translation: "Vase" },
  { letter: "Г", sound: "guh", word: "Гар", wordSound: "gar", translation: "Hand" },
  { letter: "Д", sound: "duh", word: "Дээл", wordSound: "dail", translation: "Deel (Dress)" },
  { letter: "Е", sound: "yeh", word: "Ес", wordSound: "yes", translation: "Nine" },
  { letter: "Ё", sound: "yoh", word: "Ёотон", wordSound: "yo-ton", translation: "Sugar Cube" },
  { letter: "Ж", sound: "juh", word: "Жимс", wordSound: "jims", translation: "Fruit" },
  { letter: "З", sound: "zuh", word: "Зөгий", wordSound: "zuh-gii", translation: "Bee" },
  { letter: "И", sound: "ee", word: "Ирвэс", wordSound: "ir-ves", translation: "Leopard" },
  { letter: "Й", sound: "ee", word: "Йог", wordSound: "yog", translation: "Yoga" },
  { letter: "К", sound: "kuh", word: "Кино", wordSound: "ki-no", translation: "Movie" },
  { letter: "Л", sound: "luh", word: "Луу", wordSound: "loo", translation: "Dragon" },
  { letter: "М", sound: "muh", word: "Муур", wordSound: "moor", translation: "Cat" },
  { letter: "Н", sound: "nuh", word: "Нар", wordSound: "nar", translation: "Sun" },
  { letter: "О", sound: "oh", word: "Од", wordSound: "od", translation: "Star" },
  { letter: "Ө", sound: "uh", word: "Өглөө", wordSound: "uh-gluh", translation: "Morning" },
  { letter: "П", sound: "puh", word: "Пицца", wordSound: "pizza", translation: "Pizza" },
  { letter: "Р", sound: "ruh", word: "Радио", wordSound: "radio", translation: "Radio" },
  { letter: "С", sound: "suh", word: "Сар", wordSound: "sar", translation: "Moon" },
  { letter: "Т", sound: "tuh", word: "Тэмээ", wordSound: "tem-eh", translation: "Camel" },
  { letter: "У", sound: "ooh", word: "Уул", wordSound: "ool", translation: "Mountain" },
  { letter: "Ү", sound: "ew", word: "Үүл", wordSound: "ew-ul", translation: "Cloud" },
  { letter: "Ф", sound: "fuh", word: "Фото", wordSound: "photo", translation: "Photo" },
  { letter: "Х", sound: "huh", word: "Хонь", wordSound: "hon", translation: "Sheep" },
  { letter: "Ц", sound: "tsuh", word: "Цэцэг", wordSound: "tse-tseg", translation: "Flower" },
  { letter: "Ч", sound: "chuh", word: "Чих", wordSound: "chih", translation: "Ear" },
  { letter: "Ш", sound: "shuh", word: "Шүд", wordSound: "shud", translation: "Tooth" },
  { letter: "Щ", sound: "shch", word: "Щетка", wordSound: "shchet-ka", translation: "Brush (Loan)" },
  { letter: "Ъ", sound: "Hard Sign", word: "Гавъяа", wordSound: "gav-iya", translation: "Merit (In word)" },
  { letter: "Ы", sound: "ee", word: "Ахын", wordSound: "a-hin", translation: "Brother's (Suffix)" },
  { letter: "Ь", sound: "Soft Sign", word: "Морь", wordSound: "mor", translation: "Horse (Softener)" },
  { letter: "Э", sound: "eh", word: "Ээж", wordSound: "eh-j", translation: "Mother" },
  { letter: "Ю", sound: "you", word: "Юбка", wordSound: "yub-ka", translation: "Skirt" },
  { letter: "Я", sound: "yah", word: "Ямаа", wordSound: "yama", translation: "Goat" }
];

