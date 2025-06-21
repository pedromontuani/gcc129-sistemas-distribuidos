export interface DiaryEntry {
  id: string;
  date: Date;
  description: string;
}

export interface DiaryImage {
  id: string;
  uri: string; // Image URI
  diaryId: string; // Reference to the diary entry
}
