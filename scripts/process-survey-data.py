#!/usr/bin/env python3
"""
Process Guild42 Survey CSV data and generate JSON for dashboard
"""
import csv
import json
from collections import Counter
from datetime import datetime
from pathlib import Path

def find_column_indices(header):
    """Find column indices dynamically from header"""
    indices = {}

    for i, col in enumerate(header):
        col_clean = col.strip().replace('\n', ' ')

        # Question columns
        if "1 - Which topics" in col_clean:
            indices['topics_start'] = i
        elif "Something else?" in col_clean:
            indices['something_else'] = i
        elif "2 - Whom would you like" in col_clean:
            indices['speaker'] = i
        elif "3 - Which event formats" in col_clean:
            indices['formats_start'] = i
        elif "4 - About You" in col_clean:
            indices['roles_start'] = i
        elif "What else?" in col_clean and 'role_else' not in indices:
            indices['role_else'] = i
        elif "5 - How many Guild42" in col_clean:
            indices['attendance_start'] = i
        elif col_clean == "Fertig":
            indices['completed'] = i

        # Topic options (between topics_start and speaker)
        if "Applied AI" in col_clean:
            indices['Applied AI & Machine Learning'] = i
        elif "AI Agents" in col_clean:
            indices['AI Agents & LLM Engineering'] = i
        elif "Cloud Native" in col_clean:
            indices['Cloud Native, Kubernetes & Platform Engineering'] = i
        elif "DevOps" in col_clean:
            indices['DevOps / SRE Best Practices'] = i
        elif "Green IT" in col_clean:
            indices['Green IT'] = i
        elif "Requirements Engineering" in col_clean:
            indices['Requirements Engineering with https://req42.de'] = i
        elif "Ethical Clouds" in col_clean:
            indices['Ethical Clouds'] = i
        elif "Software documentation" in col_clean:
            indices['Software documentation with https://arc42.org and more'] = i
        elif "Security" in col_clean and "Zero Trust" in col_clean:
            indices['Security, Zero Trust & Software Supply Chain'] = i
        elif "Software Architecture" in col_clean:
            indices['Software Architecture & Design (DDD, Microservices, Event-driven)'] = i
        elif "Modern Web" in col_clean:
            indices['Modern Web & Mobile Technologies'] = i
        elif "Quantum Computing" in col_clean:
            indices['Quantum Computing'] = i
        elif "Robotics" in col_clean:
            indices['Robotics'] = i
        elif "Rocket Science" in col_clean:
            indices['Rocket Science'] = i
        elif "Programming Languages" in col_clean:
            indices['Programming Languages (Rust, Go, TypeScript, Java etc.)'] = i
        elif "future of Software Engineering" in col_clean:
            indices['The future of Software Engineering in Bern'] = i
        elif "Testing & Quality" in col_clean:
            indices['Testing & Quality Engineering'] = i
        elif "Data Engineering" in col_clean:
            indices['Data Engineering / Observability'] = i
        elif "IoT / Edge" in col_clean:
            indices['IoT / Edge Computing / Hardware'] = i
        elif "FinTech" in col_clean:
            indices['FinTech, GovTech, RailTech or Industry Case Studies'] = i
        elif "field report" in col_clean:
            indices['A field report to organization and workflow patterns'] = i

        # Format options
        elif "Talks / Keynotes" in col_clean:
            indices['Talks / Keynotes'] = i
        elif "Hands-on Workshops" in col_clean:
            indices['Hands-on Workshops'] = i
        elif "Live Coding" in col_clean:
            indices['Live Coding Sessions'] = i
        elif "Panel Discussions" in col_clean:
            indices['Panel Discussions'] = i
        elif "Lightning Talks" in col_clean:
            indices['Lightning Talks (5–10 min)'] = i
        elif "Networking-focused" in col_clean:
            indices['Networking-focused Events'] = i
        elif "Hybrid / Remote" in col_clean:
            indices['Hybrid / Remote-friendly Content'] = i

        # Role options
        elif col_clean == "Software Engineer":
            indices['Software Engineer'] = i
        elif "Senior/Lead" in col_clean:
            indices['Senior/Lead Engineer'] = i
        elif col_clean == "Architect":
            indices['Architect'] = i
        elif "DevOps / SRE" in col_clean and 'DevOps / SRE' not in indices:
            indices['DevOps / SRE'] = i
        elif "Security Engineer" in col_clean:
            indices['Security Engineer'] = i
        elif "Data/AI Engineer" in col_clean:
            indices['Data/AI Engineer'] = i
        elif "Product / Other" in col_clean:
            indices['Product / Other'] = i

        # Attendance options
        elif col_clean == "0" and 'attendance_start' in indices:
            indices['attendance_0'] = i
        elif col_clean == "1–2":
            indices['attendance_1-2'] = i
        elif col_clean == "3+":
            indices['attendance_3+'] = i

    return indices

def process_csv(csv_path):
    """Process the CSV file and extract survey data"""
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.reader(f)
        header = next(reader)
        rows = list(reader)

    # Find column indices
    idx = find_column_indices(header)
    print(f"Found {len(idx)} column indices")

    # Filter completed responses
    completed_rows = [row for row in rows if len(row) > idx['completed'] and row[idx['completed']] == "1"]
    total_participants = len(completed_rows)

    print(f"Total participants: {total_participants}")
    print(f"Total rows: {len(rows)}")
    print(f"Completed rows: {len(completed_rows)}")

    # Define topic names
    topic_names = [
        'Applied AI & Machine Learning',
        'AI Agents & LLM Engineering',
        'Cloud Native, Kubernetes & Platform Engineering',
        'DevOps / SRE Best Practices',
        'Green IT',
        'Requirements Engineering with https://req42.de',
        'Ethical Clouds',
        'Software documentation with https://arc42.org and more',
        'Security, Zero Trust & Software Supply Chain',
        'Software Architecture & Design (DDD, Microservices, Event-driven)',
        'Modern Web & Mobile Technologies',
        'Quantum Computing',
        'Robotics',
        'Rocket Science',
        'Programming Languages (Rust, Go, TypeScript, Java etc.)',
        'The future of Software Engineering in Bern',
        'Testing & Quality Engineering',
        'Data Engineering / Observability',
        'IoT / Edge Computing / Hardware',
        'FinTech, GovTech, RailTech or Industry Case Studies',
        'A field report to organization and workflow patterns'
    ]

    # Process Topics (Question 1)
    topic_counts = Counter()
    something_else_responses = []

    for row in completed_rows:
        for topic in topic_names:
            if topic in idx and len(row) > idx[topic] and row[idx[topic]] == "1":
                topic_counts[topic] += 1

        # Check for "Something else?" responses
        if 'something_else' in idx and len(row) > idx['something_else'] and row[idx['something_else']].strip():
            something_else_text = row[idx['something_else']].strip()
            if something_else_text:
                something_else_responses.append(something_else_text)
                topic_counts["Something else"] = topic_counts.get("Something else", 0) + 1

    total_topic_responses = sum(topic_counts.values())
    topics_data = [
        {
            "answer": topic,
            "count": count,
            "percentage": round((count / total_topic_responses) * 100, 2)
        }
        for topic, count in topic_counts.most_common()
    ]

    # Process Speakers (Question 2)
    # The speaker column is right after the question column (index + 1)
    speakers = []
    if 'speaker' in idx:
        speaker_col = idx['speaker'] + 1  # Answers are in the next column
        for row in completed_rows:
            if len(row) > speaker_col and row[speaker_col].strip():
                speaker = row[speaker_col].strip()
                if speaker and speaker not in speakers:
                    speakers.append(speaker)

    # Process Event Formats (Question 3)
    format_names = [
        'Talks / Keynotes',
        'Hands-on Workshops',
        'Live Coding Sessions',
        'Panel Discussions',
        'Lightning Talks (5–10 min)',
        'Networking-focused Events',
        'Hybrid / Remote-friendly Content'
    ]

    format_counts = Counter()
    for row in completed_rows:
        for format_name in format_names:
            if format_name in idx and len(row) > idx[format_name] and row[idx[format_name]] == "1":
                format_counts[format_name] += 1

    total_format_responses = sum(format_counts.values())
    formats_data = [
        {
            "answer": format_name,
            "count": count,
            "percentage": round((count / total_format_responses) * 100, 2)
        }
        for format_name, count in format_counts.most_common()
    ]

    # Process Roles (Question 4)
    role_names = [
        'Software Engineer',
        'Senior/Lead Engineer',
        'Architect',
        'DevOps / SRE',
        'Security Engineer',
        'Data/AI Engineer',
        'Product / Other',
        'What else?'
    ]

    role_counts = Counter()
    for row in completed_rows:
        for role_name in role_names:
            if role_name in idx and len(row) > idx[role_name] and row[idx[role_name]] == "1":
                role_counts[role_name] += 1

    total_role_responses = sum(role_counts.values())
    roles_data = [
        {
            "answer": role,
            "count": count,
            "percentage": round((count / total_role_responses) * 100, 2)
        }
        for role, count in role_counts.most_common()
    ]

    # Process Attendance (Question 5)
    attendance_data = []
    attendance_map = {
        'attendance_0': '0',
        'attendance_1-2': '1–2',
        'attendance_3+': '3+'
    }

    attendance_counts = Counter()
    for row in completed_rows:
        for key, label in attendance_map.items():
            if key in idx and len(row) > idx[key] and row[idx[key]] == "1":
                attendance_counts[label] += 1

    total_attendance_responses = sum(attendance_counts.values())
    attendance_data = [
        {
            "answer": attendance,
            "count": count,
            "percentage": round((count / total_attendance_responses) * 100, 2)
        }
        for attendance, count in attendance_counts.most_common()
    ]

    # Build JSON structure
    survey_json = {
        "metadata": {
            "id": "guild42-survey-2026",
            "title": "Guild42 Member Survey 2026",
            "description": "Member feedback on topics, speakers, and event formats for 2026",
            "totalParticipants": total_participants,
            "completedParticipants": total_participants,
            "createdAt": datetime.now().strftime("%Y-%m-%d")
        },
        "questions": [
            {
                "id": "q1",
                "questionText": "Which topics would you most like to see at Guild42 in 2026?",
                "questionType": "multiple_choice",
                "totalResponses": total_topic_responses,
                "responses": topics_data
            },
            {
                "id": "q2",
                "questionText": "Whom would you like to see as a speaker?",
                "questionType": "text",
                "totalResponses": len(speakers),
                "responses": [],
                "textResponses": speakers
            },
            {
                "id": "q3",
                "questionText": "Which event formats do you prefer?",
                "questionType": "multiple_choice",
                "totalResponses": total_format_responses,
                "responses": formats_data
            },
            {
                "id": "q4",
                "questionText": "About You - What is your current role?",
                "questionType": "single_choice",
                "totalResponses": total_role_responses,
                "responses": roles_data
            },
            {
                "id": "q5",
                "questionText": "How many Guild42 events did you attend in the past year?",
                "questionType": "single_choice",
                "totalResponses": total_attendance_responses,
                "responses": attendance_data
            }
        ]
    }

    return survey_json

def main():
    csv_path = Path("/Users/mad/Desktop/Guild42.ch in 2026 - Topics etc..csv")
    output_path = Path("/Users/mad/code/astro-guild42/src/data/surveys/guild42-survey-2026.json")

    print(f"Processing CSV: {csv_path}")
    survey_data = process_csv(csv_path)

    print(f"\nWriting JSON to: {output_path}")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(survey_data, f, indent=2, ensure_ascii=False)

    print("✓ Survey data updated successfully!")
    print(f"\nSummary:")
    print(f"- Total participants: {survey_data['metadata']['totalParticipants']}")
    print(f"- Topic responses: {survey_data['questions'][0]['totalResponses']}")
    print(f"- Speaker suggestions: {survey_data['questions'][1]['totalResponses']}")
    print(f"- Format preferences: {survey_data['questions'][2]['totalResponses']}")

if __name__ == "__main__":
    main()
