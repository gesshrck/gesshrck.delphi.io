
export interface Derivative {
  word: string;
  parts: string;
  meaning: string;
}

export interface FlashcardData {
  root: string;
  origin: string;
  meaning: string;
  derivatives: Derivative[];
  emoji: string;
  category: string;
}
