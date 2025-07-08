export interface DiaryEntry {
  id: number;
  date: Date;
  description: string;
}

export interface DiaryImage {
  id: number;
  uri: string; // Image URI
  diaryId: string; // Reference to the diary entry
}
