export interface User {
  id: number;
  email: string;
}

export interface Weight {
  id: number;
  weight: number;
  recordedAt: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Food {
  id: number;
  name: string;
  calories: number;
  eatenAt: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CalorieEstimate {
  foodName: string;
  estimatedCalories: number;
  unit: string;
  note: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}
