// CSV Parser for Findmind survey data
import type {
  SurveyData,
  Question,
  QuestionResponse,
} from "../../config/survey-schemas";

interface CSVRow {
  participant_id: string;
  question_position: string;
  question_type: string;
  question_title: string;
  question_row: string;
  answer: string;
}

export function parseCSV(csvContent: string): CSVRow[] {
  const lines = csvContent.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.replace(/"/g, ""));

  const rows: CSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      rows.push(row as CSVRow);
    }
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current);
  return result;
}

export function aggregateSurveyData(rows: CSVRow[]): SurveyData {
  const uniqueParticipants = new Set(rows.map(r => r.participant_id));
  const totalParticipants = uniqueParticipants.size;

  // Group by question
  const questionMap = new Map<string, CSVRow[]>();
  rows.forEach(row => {
    const key = `${row.question_position}-${row.question_title}`;
    if (!questionMap.has(key)) {
      questionMap.set(key, []);
    }
    questionMap.get(key)!.push(row);
  });

  const questions: Question[] = [];

  questionMap.forEach((questionRows, key) => {
    const firstRow = questionRows[0];
    const questionType =
      firstRow.question_type === "form"
        ? "text"
        : firstRow.question_title.includes("current role")
          ? "single_choice"
          : "multiple_choice";

    if (questionType === "text") {
      // Text responses
      questions.push({
        id: `q${firstRow.question_position}`,
        questionText: firstRow.question_title,
        questionType,
        totalResponses: questionRows.length,
        responses: [],
        textResponses: questionRows.map(r => r.answer),
      });
    } else {
      // Aggregate responses
      const answerCounts = new Map<string, number>();
      questionRows.forEach(row => {
        const answer = row.answer || row.question_row;
        answerCounts.set(answer, (answerCounts.get(answer) || 0) + 1);
      });

      const totalAnswers = Array.from(answerCounts.values()).reduce(
        (a, b) => a + b,
        0
      );
      const responses: QuestionResponse[] = Array.from(answerCounts.entries())
        .map(([answer, count]) => ({
          answer,
          count,
          percentage: Math.round((count / totalAnswers) * 1000) / 10,
        }))
        .sort((a, b) => b.count - a.count);

      questions.push({
        id: `q${firstRow.question_position}`,
        questionText: firstRow.question_title,
        questionType,
        totalResponses: totalAnswers,
        responses,
      });
    }
  });

  // Sort questions by position
  questions.sort((a, b) => {
    const aPos = parseInt(a.id.replace("q", ""));
    const bPos = parseInt(b.id.replace("q", ""));
    return aPos - bPos;
  });

  return {
    metadata: {
      id: "guild42-survey-2026",
      title: "Guild42 Member Survey 2026",
      description: "Topics, Speakers, and Formats for 2026",
      totalParticipants,
      completedParticipants: totalParticipants,
      createdAt: "2025-12-01",
    },
    questions,
  };
}
