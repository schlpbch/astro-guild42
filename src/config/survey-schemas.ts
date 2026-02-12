// TypeScript schemas for survey data

export interface SurveyMetadata {
  id: string;
  title: string;
  description?: string;
  totalParticipants: number;
  completedParticipants: number;
  createdAt: string;
}

export interface QuestionResponse {
  answer: string;
  count: number;
  percentage: number;
}

export interface Question {
  id: string;
  questionText: string;
  questionType: "multiple_choice" | "single_choice" | "text" | "rating";
  totalResponses: number;
  responses: QuestionResponse[];
  textResponses?: string[]; // For open-ended questions
}

export interface SurveyData {
  metadata: SurveyMetadata;
  questions: Question[];
}

// For chart data transformation
export interface ChartDataPoint {
  category: string;
  value: number;
  percentage?: number;
  label?: string;
}

export interface PieChartDataPoint {
  name: string;
  value: number;
  percentage: number;
}
